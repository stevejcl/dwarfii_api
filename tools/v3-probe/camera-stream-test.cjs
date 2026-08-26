// Test script: replicate DwarfLab app init sequence to open camera and start MJPEG stream
const WebSocket = require('ws');
const protobuf = require('protobufjs');
const http = require('http');

const IP = '192.168.11.31';

async function main() {
  const root = await protobuf.load('src/proto/base.proto');
  const WsPacket = root.lookupType('WsPacket');

  const ws = new WebSocket(`ws://${IP}:9900`);
  ws.binaryType = 'arraybuffer';

  // Replicate exact packets from pcap init sequence
  // clientId from pcap (iOS app UUID)
  const clientId = '0000DAF2-0000-1000-8000-00805F9B34FB';

  function sendRaw(hex) {
    ws.send(Buffer.from(hex, 'hex'));
  }

  function sendPacket(moduleId, cmd, deviceId, innerHex) {
    const packet = {
      majorVersion: 1,
      minorVersion: 20,
      deviceId: deviceId,
      moduleId: moduleId,
      cmd: cmd,
      data: innerHex ? Buffer.from(innerHex, 'hex') : undefined,
      clientId: clientId,
    };
    const encoded = WsPacket.encode(WsPacket.create(packet)).finish();
    ws.send(encoded);
    console.log(`  >>> mod:${moduleId} cmd:${cmd} devId:${deviceId}${innerHex ? ' data:' + innerHex : ''}`);
  }

  let msgCount = 0;
  ws.on('open', async () => {
    console.log('WS connected\n');

    // Replicate pcap init sequence exactly
    console.log('Phase 1: System init (deviceId=1)');
    // f11: System set time (CMD 13000)
    sendPacket(4, 13000, 1, '089a888acd06110000000000002240');
    // f14: System set timezone (CMD 13001) - "Asia/Tokyo"
    sendPacket(4, 13001, 1, '0a0a417369612f546f6b796f');
    // f15: CMD 15011 (module 8)
    sendPacket(8, 15011, 1);
    // f16: CMD 16405 (module 14)
    sendPacket(14, 16405, 1);
    // f19: CMD 16102 (module 13)
    sendPacket(13, 16102, 1);

    await sleep(500);

    console.log('\nPhase 2: Get presets (deviceId=1)');
    // f20: Get exposure presets (CMD 11043)
    sendPacket(3, 11043, 1);
    sendPacket(3, 11043, 1, '1001');
    sendPacket(3, 11043, 1, '1002');
    // f24: Get astro params (CMD 11040)
    sendPacket(3, 11040, 1);

    await sleep(500);

    console.log('\nPhase 3: GPS location (deviceId=1)');
    // f38: Set GPS location (CMD 13010)
    sendPacket(4, 13010, 1, '0988a05bb562ea414011cbcf60dd357c614019ff10277faf8710402206e697a5e69cac2a09e59fbce78e89e79c8c3209e4b889e983b7e5b8823a06e4b8ade5a4ae4001');

    await sleep(500);

    console.log('\nPhase 4: Switch to deviceId=4');
    // f112-117: Repeat presets with deviceId=4
    sendPacket(3, 11043, 4, '0801');
    sendPacket(3, 11043, 4, '08011001');
    sendPacket(3, 11043, 4, '08011002');
    sendPacket(3, 11040, 4, '0801');

    await sleep(500);

    console.log('\nPhase 5: Device config (deviceId=4)');
    // f154: CMD 16404 (device config)
    sendPacket(14, 16404, 4, '1a020801');

    await sleep(500);

    console.log('\nPhase 6: Camera wide open + Camera tele open');
    // f171: Camera wide open (CMD 12036, module 2)
    sendPacket(2, 12036, 4);

    await sleep(300);

    // f172: Camera tele open (CMD 10050, module 1)
    sendPacket(1, 10050, 4, '0801');

    await sleep(2000);

    // Check streams
    console.log('\nPhase 7: Checking MJPEG streams...');
    for (const port of [8092, 8082]) {
      for (const path of ['/mainstream', '/secondstream']) {
        checkStream(port, path);
      }
    }
  });

  ws.on('message', (data) => {
    msgCount++;
    try {
      const decoded = WsPacket.decode(Buffer.from(data));
      const obj = decoded.toJSON();
      let extra = '';
      if (decoded.data && decoded.data.length > 0) {
        extra = ' data:' + Buffer.from(decoded.data).toString('hex').slice(0, 60);
      }
      console.log(`  <<< #${msgCount} mod:${obj.moduleId} cmd:${obj.cmd} type:${obj.type}${extra}`);
    } catch(e) {
      console.log(`  <<< #${msgCount} raw len:${data.byteLength}`);
    }
  });

  ws.on('error', (err) => console.error('WS Error:', err.message));
  ws.on('close', (code, reason) => console.log('WS closed:', code, reason?.toString()));

  // Keep alive for 90 seconds
  setTimeout(() => {
    console.log('\nTime up (90s), closing.');
    ws.close();
    process.exit(0);
  }, 90000);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function checkStream(port, path) {
  const req = http.get(`http://${IP}:${port}${path}`, { timeout: 5000 }, (res) => {
    let received = 0;
    res.on('data', (chunk) => { received += chunk.length; });
    setTimeout(() => {
      console.log(`  HTTP ${port}${path}: status=${res.statusCode} received=${received}bytes type=${res.headers['content-type'] || ''}`);
      res.destroy();
    }, 3000);
  });
  req.on('error', (e) => console.log(`  HTTP ${port}${path}: ${e.message}`));
}

main().catch(console.error);
