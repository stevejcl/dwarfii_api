// Test: keep WS alive, send V3 camera open, probe both RTSP and MJPEG
const WebSocket = require('ws');
const protobuf = require('protobufjs');
const { exec } = require('child_process');
const http = require('http');

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
      const hex = decoded.data?.length > 0 ? Buffer.from(decoded.data).toString('hex') : '';
      console.log(`<<< mod:${decoded.moduleId} cmd:${decoded.cmd} type:${decoded.type} data:${hex}`);
    } catch(e) {}
  });

  ws.on('open', async () => {
    console.log('WS connected (keeping alive)\n');

    // Full init similar to DwarfLab app
    console.log('1. System init');
    sendPacket(4, 13000, 1, '089a888acd06110000000000002240');
    sendPacket(4, 13001, 1, '0a0a417369612f546f6b796f');
    sendPacket(8, 15011, 1);
    sendPacket(14, 16405, 1);
    await sleep(500);

    console.log('\n2. ModeSwitch (devId=4)');
    sendPacket(14, 16404, 4, '1a020801');
    await sleep(1000);

    console.log('\n3. Open tele (CMD 10050, devId=4)');
    sendPacket(1, 10050, 4, '0801');
    await sleep(2000);

    console.log('\n4. Open wide (CMD 12036, devId=4)');
    sendPacket(2, 12036, 4);

    console.log('\n5. Waiting 8s for streams to init...');
    await sleep(8000);

    // Probe RTSP (WS still alive)
    console.log('\n6. Probing RTSP tele (ch0/stream0) with WS alive:');
    await probeRtsp(`rtsp://${IP}:554/ch0/stream0`);

    console.log('\n7. Probing RTSP wide (ch1/stream0) with WS alive:');
    await probeRtsp(`rtsp://${IP}:554/ch1/stream0`);

    // Probe MJPEG
    console.log('\n8. Probing MJPEG 8092/mainstream (3s):');
    await probeMjpeg(8092, '/mainstream');

    console.log('\n9. Probing MJPEG 8092/secondstream (3s):');
    await probeMjpeg(8092, '/secondstream');

    console.log('\nDone. Closing WS.');
    ws.close();
    process.exit(0);
  });

  ws.on('error', (err) => console.error('WS Error:', err.message));
  ws.on('close', (code) => console.log(`WS closed: ${code}`));

  // Safety timeout
  setTimeout(() => { ws.close(); process.exit(0); }, 40000);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function probeRtsp(url) {
  return new Promise(resolve => {
    exec(`ffprobe -rtsp_transport tcp -i "${url}" -timeout 3000000 2>&1 | grep -E "Stream #|Session Not Found|Error opening"`, { timeout: 8000 }, (err, stdout) => {
      console.log(stdout.trim() || '(no output)');
      resolve();
    });
  });
}

function probeMjpeg(port, path) {
  return new Promise(resolve => {
    let bytes = 0;
    let contentType = '';
    const req = http.get(`http://${IP}:${port}${path}`, { timeout: 4000 }, (res) => {
      contentType = res.headers['content-type'] || '';
      res.on('data', (chunk) => { bytes += chunk.length; });
    });
    req.on('error', (e) => console.log(`  error: ${e.message}`));
    setTimeout(() => {
      req.destroy();
      console.log(`  ${port}${path}: ${bytes} bytes, type: ${contentType}`);
      resolve();
    }, 3000);
  });
}

main().catch(console.error);
