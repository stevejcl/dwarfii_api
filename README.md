# Dwarf II

Wrapper functions and protocol definitions for the shared DWARF V3 API used by
DWARF 2, DWARF 3, and DWARF mini, while retaining the historical V2 helpers.
See [the API reference](docs/API_REFERENCE.md) and
[the V3 investigation notes](tools/v3-probe/PCAP_FINDINGS.md). V3 entries are
marked when their schema or hardware behavior is still provisional.

The APK 3.4.1 audit is published in
[`docs/apk-3.4.1-websocket-code-registry.md`](docs/apk-3.4.1-websocket-code-registry.md)
and its machine-readable
[`docs/apk-3.4.1-api-inventory.json`](docs/apk-3.4.1-api-inventory.json). It
catalogues all 356 registered WebSocket commands, 123 response/error codes, 50
Retrofit HTTP operations, request/notification protobuf evidence, and the BLE
registry. [`docs/device-openapi.json`](docs/device-openapi.json) is the OpenAPI
3.1 representation of the device-local HTTP surface. Registry presence proves
app awareness, not support on every model or firmware.

All three models share the V3 command family; model-specific client IDs, filters,
sensor limits, and other hardware capabilities remain distinct. Mount calibration
uses state notification `15210` and successful result notification `15256`
(`CalibrationResult.azi`, `CalibrationResult.alt`).

For reliable V3 mount calibration, run astronomical autofocus first with focus
command `15004` (`ReqAstroAutoFocus { mode: 1 }`) and wait for autofocus state
`3` on notification `15278` or `15280`. Then start calibration with `11000`,
allow repeated `15210` plate-solving attempts, and treat `15256` as the
successful terminal result. This workflow applies to DWARF 2, DWARF 3, and
DWARF mini.

APK 3.4.1 additionally requires `ReqStartCalibration.lon` (field 1) and
`ReqStartCalibration.lat` (field 2), in decimal degrees. The app obtains them
from the current phone location and blocks calibration when location is absent
or `(0,0)`; an empty `11000` request was hardware-observed to end with `-11504`.

Dwarf Lab's [API V2 documentation](https://tinyphoton.feishu.cn/docx/GBkcdldTIo3SrdxFJDscYVYDnvf?fbclid=IwAR0_Vypm8DPk1PPtwllptpWDZmxbCgi3NKVQKV8khDXIvnNay_o67AUgtq4).

[Documentation](https://stevejcl.github.io/dwarfii_api/) for this package.

## Tools

- **[v3-probe](tools/v3-probe/)** — Diagnostic toolkit for reverse-engineering the DWARF V3 WebSocket protocol (pcap decoder, blind protobuf decoder, MitM proxy, port scanner, etc.)

## Install

```
npm install dwarfii_api
```

## Install for Javascript
Using this library in pure javascript is possible.
Use the dist_js repertory and follow the instructions in the file index.html

## Usage

The Dwarf API uses websockets with binary protobuf format. 

The URL of the websockets depends on if you use Dwarf wifi or if you use the Dwarf in STA mode.

Example of sending a Goto command.

```js
import { messageAstroStartGotoDso, WebSocketHandler } from "dwarfii_api";

// Create WebSocketHandler if need
const webSocketHandler = new WebSocketHandler(IPDwarf);

// define a customMessageHandler to handle the message in return send by the API
let goto_end_status = false;

const customMessageHandler = (txt_info, result_data) => {
  if ( result_data.cmd == Dwarfii_Api.DwarfCMD.CMD_ASTRO_START_GOTO_DSO ) {
    if (result_data.data.code != Dwarfii_Api.DwarfErrorCode.OK) {
      console.error("Error GOTO : " + result_data.data.errorTxt);
      if (
        result_data.data.code ==
          Dwarfii_Api.DwarfErrorCode.CODE_ASTRO_GOTO_FAILED ||
        result_data.data.code ==
          Dwarfii_Api.DwarfErrorCode.CODE_ASTRO_FUNCTION_BUSY
      )
        goto_end_status = true;
    }
  } else if (
    !goto_end_status &&
    result_data.cmd == Dwarfii_Api.DwarfCMD.CMD_NOTIFY_STATE_ASTRO_GOTO
  ) {
      console.log(result_data.data.stateText);
    }
  } else if (
    !goto_end_status &&
    result_data.cmd == Dwarfii_Api.DwarfCMD.CMD_NOTIFY_STATE_ASTRO_TRACKING
  ) {
    if (
      result_data.data.state ==
        Dwarfii_Api.OperationState.OPERATION_STATE_RUNNING &&
      result_data.data.targetName == targetName
    ) {
        goto_end_status = true;
        console.info("Start Tracking");
      }
  } else {
    // other frame result
    console.log(txt_info + ": " + result_data);
    return;
  }
  // log frame result
  console.log(txt_info + ": " + result_data);
};


let txtInfoCommand = "Start Goto";

// create a packet message for the command, you can send a tabs of Packets also
let WS_Packet = messageAstroStartGotoDso(
  RA_number,
  declination_number,
  targetName
);

// prepre the messages to send
webSocketHandler.prepare(
  WS_Packet,
  txtInfoCommand,
  // Tab of commands to listen to, can be "*" for getting All received Data
  // the others are not sending back to customMessageHandler
  [
    Dwarfii_Api.DwarfCMD.CMD_ASTRO_START_GOTO_DSO,
    Dwarfii_Api.DwarfCMD.CMD_NOTIFY_STATE_ASTRO_GOTO,
    Dwarfii_Api.DwarfCMD.CMD_NOTIFY_STATE_ASTRO_TRACKING,
  ],
  customMessageHandler
);
// start sending and receiving
if (!webSocketHandler.run()) {
  console.error(" Can't launch Web Socket Run Action!");
}


