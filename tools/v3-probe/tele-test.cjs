// Quick test: send V3 camera open with deviceId=4, then probe RTSP
const WebSocket = require('ws');
const protobuf = require('protobufjs');
const { execSync } = require('child_process');

const IP = '192.168.11.31';

async function main() {
  const root = await protobuf.load('src/proto/base.proto');
  const WsPacket = root.lookupType('WsPacket');

  const ws = new WebSocket(`ws://${IP}:9900`);
  ws.binaryType = 'arraybuffer';

  function sendPacket(moduleId, cmd, deviceId, innerHex) {
    const packet = {
      majorVersion: 1,
      minorVersion: 20,
      deviceId: deviceId,
      moduleId: moduleId,
      cmd: cmd,
      data: innerHex ? Buffer.from(innerHex, 'hex') : undefined,
    };
    const encoded = WsPacket.encode(WsPacket.create(packet)).finish();
    ws.send(encoded);
    console.log(`>>> mod:${moduleId} cmd:${cmd} devId:${deviceId}${innerHex ? ' data:' + innerHex : ''}`);
  }

  ws.on('message', (data) => {
    try {
      const decoded = WsPacket.decode(Buffer.from(data));
      console.log(`<<< mod:${decoded.moduleId} cmd:${decoded.cmd} type:${decoded.type}`);
    } catch(e) {}
  });

  ws.on('open', async () => {
    console.log('WS connected');

    // ModeSwitch to preview (deviceId=4)
    console.log('\n1. ModeSwitch (CMD 16404, devId=4)');
    sendPacket(14, 16404, 4, '1a020801');
    await sleep(1000);

    // Open tele camera (CMD 10050, devId=4, action=1)
    console.log('\n2. Open tele (CMD 10050, devId=4)');
    sendPacket(1, 10050, 4, '0801');
    await sleep(1000);

    // Open wide camera (CMD 12036, devId=4, no args)
    console.log('\n3. Open wide (CMD 12036, devId=4)');
    sendPacket(2, 12036, 4);

    // Wait for RTSP to start
    console.log('\n4. Waiting 5s for RTSP...');
    await sleep(5000);

    // Probe RTSP
    console.log('\n5. Probing RTSP tele (ch0/stream0)...');
    try {
      const out = execSync(
        `ffprobe -rtsp_transport tcp -i rtsp://${IP}:554/ch0/stream0 -timeout 5000000 2>&1`,
        { timeout: 10000 }
      ).toString();
      console.log(out);
    } catch(e) {
      console.log(e.stdout?.toString() || e.stderr?.toString() || e.message);
    }

    console.log('\n6. Probing RTSP wide (ch1/stream0)...');
    try {
      const out = execSync(
        `ffprobe -rtsp_transport tcp -i rtsp://${IP}:554/ch1/stream0 -timeout 5000000 2>&1`,
        { timeout: 10000 }
      ).toString();
      console.log(out);
    } catch(e) {
      console.log(e.stdout?.toString() || e.stderr?.toString() || e.message);
    }

    ws.close();
    process.exit(0);
  });

  ws.on('error', (err) => console.error('WS Error:', err.message));
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
main().catch(console.error);
