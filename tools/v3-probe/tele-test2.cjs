// Test: send V3 camera open with full data decode
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
    ws.send(WsPacket.encode(WsPacket.create(packet)).finish());
    console.log(`>>> mod:${moduleId} cmd:${cmd} devId:${deviceId}${innerHex ? ' data:' + innerHex : ''}`);
  }

  ws.on('message', (data) => {
    try {
      const decoded = WsPacket.decode(Buffer.from(data));
      const hex = decoded.data && decoded.data.length > 0
        ? Buffer.from(decoded.data).toString('hex')
        : '';
      console.log(`<<< mod:${decoded.moduleId} cmd:${decoded.cmd} type:${decoded.type} data:${hex}`);
    } catch(e) {
      console.log(`<<< raw: ${Buffer.from(data).toString('hex').slice(0, 80)}`);
    }
  });

  ws.on('open', async () => {
    console.log('WS connected\n');

    // Full init: ModeSwitch first
    console.log('1. ModeSwitch (CMD 16404, devId=4)');
    sendPacket(14, 16404, 4, '1a020801');
    await sleep(1000);

    // Open tele (CMD 10050) — action=1 = open
    console.log('\n2. Open tele (CMD 10050, devId=4, action=1)');
    sendPacket(1, 10050, 4, '0801');
    await sleep(2000);

    // Open wide (CMD 12036) — no args = open
    console.log('\n3. Open wide (CMD 12036, devId=4)');
    sendPacket(2, 12036, 4);
    await sleep(2000);

    // Check for stream notifications
    console.log('\n4. Waiting 8s for stream init...');
    await sleep(8000);

    // Probe
    console.log('\n5. RTSP probe tele:');
    try {
      execSync(`ffprobe -rtsp_transport tcp -i rtsp://${IP}:554/ch0/stream0 -timeout 3000000 2>&1`, { timeout: 8000, stdio: 'inherit' });
    } catch(e) {}

    console.log('\n6. RTSP probe wide:');
    try {
      execSync(`ffprobe -rtsp_transport tcp -i rtsp://${IP}:554/ch1/stream0 -timeout 3000000 2>&1`, { timeout: 8000, stdio: 'inherit' });
    } catch(e) {}

    ws.close();
    process.exit(0);
  });

  ws.on('error', (err) => console.error('WS Error:', err.message));
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
main().catch(console.error);
