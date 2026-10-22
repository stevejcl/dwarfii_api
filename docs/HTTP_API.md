# HTTP API リファレンス

DWARF mini / II / 3 が提供する HTTP / RTSP API のリファレンスです。
pcap 解析および実機テストにより発見されたエンドポイントを網羅しています。

## 目次

- [概要](#概要)
- [MediaType 一覧](#mediatype-一覧)
- [デバイス情報](#デバイス情報)
- [撮影モード](#撮影モード)
- [アルバム管理](#アルバム管理)
- [ファイルダウンロード](#ファイルダウンロード)
- [カメラストリーミング](#カメラストリーミング)

---

## 概要

デバイスは複数のサーバーを稼働しています:

| ポート | 用途 | 例 |
|--------|------|-----|
| **8082** | JSON API (deviceInfo, album管理, 撮影モード) | `POST http://<IP>:8082/deviceInfo` |
| **80** | 静的ファイル配信 (FITS, JPG, PNG, TIFF, サムネイル) | `GET http://<IP>:80/DWARF_mini/.../*.fits` |
| **554** | RTSP ストリーミング (実際に動作するカメラストリーム) | `rtsp://<IP>:554/ch0/stream0` |
| **8092** | MJPEG エンドポイント (存在するが 0 バイトを返す) | `http://<IP>:8092/mainstream` |

- JSON API ベース URL: `http://<DEVICE_IP>:8082`
- ファイルダウンロード URL: `http://<DEVICE_IP>:80`
- RTSP ストリーミング: `rtsp://<DEVICE_IP>:554` (実際に動作するカメラストリーム)
- MJPEG エンドポイント: `http://<DEVICE_IP>:8092` (存在するが 0 バイトを返す)
- POST リクエストは `Content-Type: application/json`
- レスポンスは JSON 形式、成功時 `code: 0`

> **インポートについて:** HTTP API ヘルパーはメインエントリポイント (`dwarfii_api`) からはエクスポートされていません。
> メインエントリは WebSocket/Protobuf プロトコル関数のみをエクスポートしています。
> HTTP API ヘルパーは `dwarfii_api/src/http_api.js` から直接インポートしてください。

```javascript
import {
  getDeviceInfo,
  albumListMediaInfos,
  fileDownloadUrl,
} from "dwarfii_api/src/http_api.js";

const IP = "192.168.88.1";

// デバイス情報を取得
const info = await getDeviceInfo(IP);
console.log(info);

// アルバム一覧を取得してFITSファイルをダウンロード
const mediaInfos = await albumListMediaInfos(IP, [4]); // astro のみ
const url = fileDownloadUrl(IP, mediaInfos.data[0].filePath);
```

---

## MediaType 一覧

| 値 | 種別 | 説明 |
|----|------|------|
| 0 | PHOTO | 通常写真 |
| 1 | VIDEO | 動画 |
| 2 | PANORAMA | パノラマ |
| 3 | TIMELAPSE | タイムラプス |
| 4 | ASTRO | 天体 (ディープスカイ スタック画像) |
| 5 | BURST | 連写 |
| 6 | CONTINUOUS | 連続撮影 |
| 7 | DARK_FRAME | ダークフレーム |
| 8 | (不明) | 予約 |
| 9 | (不明) | 予約 |

---

## デバイス情報

### POST /deviceInfo

デバイスの基本情報を取得します。

**リクエスト:**
```bash
curl -X POST http://192.168.88.1:8082/deviceInfo \
  -H "Content-Type: application/json" \
  -d '{}'
```

**レスポンス例:**
```json
{
  "code": 0,
  "data": {
    "deviceID": 4,
    "deviceName": "DWARF_mini_XXXXXX"
  }
}
```

**JavaScript:**
```javascript
const result = await getDeviceInfo("192.168.88.1");
```

---

### POST /getDeviceActivateInfo

デバイスのアクティベーション情報を取得します。

**リクエスト:**
```bash
curl -X POST http://192.168.88.1:8082/getDeviceActivateInfo \
  -H "Content-Type: application/json" \
  -d '{}'
```

**JavaScript:**
```javascript
const result = await getDeviceActivateInfo("192.168.88.1");
```

---

### GET /getDefaultParamsConfig

デフォルトのパラメータ設定を取得します。

**リクエスト:**
```bash
curl http://192.168.88.1:8082/getDefaultParamsConfig
```

**JavaScript:**
```javascript
const result = await fetchDefaultParamsConfig("192.168.88.1");
```

---

### GET /firmwareVersion

ファームウェアバージョンを取得します。

**リクエスト:**
```bash
curl http://192.168.88.1:8082/firmwareVersion
```

**JavaScript:**
```javascript
const result = await getFirmwareVersion("192.168.88.1");
```

---

## 撮影モード

### GET /shootingMode/getSupportedShootingModes

対応している撮影モードの一覧を取得します。

**リクエスト:**
```bash
curl http://192.168.88.1:8082/shootingMode/getSupportedShootingModes
```

**JavaScript:**
```javascript
const result = await getSupportedShootingModes("192.168.88.1");
```

---

### POST /shootingMode/getParamAndSetting

現在の撮影パラメータと設定を取得します。

**リクエスト:**
```bash
curl -X POST http://192.168.88.1:8082/shootingMode/getParamAndSetting \
  -H "Content-Type: application/json" \
  -d '{"modeId":2}'
```

**JavaScript:**
```javascript
const result = await getParamAndSetting("192.168.88.1", 2);
```

APK 3.4.1 uses `modeId=2` before Deep Sky capture. The response is the
authoritative, firmware/model-specific source for exposure name-to-index
mapping, supported gain values, and their compound parameter IDs. On a Mini
firmware 1.1.3 build 2, 1 second maps to index 120 and 5 seconds to index 141.

---

## アルバム管理

### POST /album/list/mediaCounts

メディアタイプ別のファイル数を取得します。

**リクエスト:**
```bash
curl -X POST http://192.168.88.1:8082/album/list/mediaCounts \
  -H "Content-Type: application/json" \
  -d '{}'
```

**レスポンス例:**
```json
{
  "code": 0,
  "data": [
    { "count": 5, "mediaType": 0 },
    { "count": 12, "mediaType": 4 }
  ]
}
```

**JavaScript:**
```javascript
const result = await albumListMediaCounts("192.168.88.1");
for (const item of result.data) {
  console.log(`mediaType=${item.mediaType}: ${item.count} 件`);
}
```

---

### POST /album/list/mediaInfos

指定したメディアタイプの詳細情報を取得します。
天体撮影の場合、`astroImageDetails` にRA/DEC、ターゲット名、撮影パラメータ等が含まれます。

**リクエスト:**
```bash
curl -X POST http://192.168.88.1:8082/album/list/mediaInfos \
  -H "Content-Type: application/json" \
  -d '{"mediaTypeList": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}'
```

**レスポンス例 (天体画像):**
```json
{
  "code": 0,
  "data": [
    {
      "mediaType": 4,
      "fileName": "stacked_M31.jpg",
      "filePath": "/DWARF_mini/Astronomy/2026-03-01_M31/stacked_M31.jpg",
      "fileSize": 2048000,
      "fileState": 0,
      "thumbnailPath": "/DWARF_mini/Astronomy/2026-03-01_M31/thumb.jpg",
      "modificationTime": 1740000000,
      "camId": 1,
      "astroTargetName": "M31",
      "astroSubType": 0,
      "astroImageDetails": {
        "target": "M31",
        "floatHourRa": 0.7123,
        "floatDegreeDec": 41.2689,
        "params": {
          "binning": 0,
          "exp": 15,
          "filter": 0,
          "format": 0,
          "gain": 80,
          "width": 1920,
          "height": 1080
        },
        "shotsStacked": 120,
        "shotsTaken": 130,
        "shotsToTake": -1,
        "srcDir": "/DWARF_mini/Astronomy/2026-03-01_M31/",
        "totalExp": 1800,
        "latitude": 35.6762,
        "longitude": 139.6503,
        "maxTemp": 25.3,
        "minTemp": 22.1,
        "folderSize": 5120000,
        "annoInfo": null
      }
    }
  ]
}
```

**JavaScript:**
```javascript
// 天体画像のみ取得
const result = await albumListMediaInfos("192.168.88.1", [4]);

for (const media of result.data) {
  const details = media.astroImageDetails;
  if (details) {
    console.log(`${details.target}: ${details.shotsStacked} フレーム積算`);
    console.log(`  RA=${details.floatHourRa}h, DEC=${details.floatDegreeDec}°`);
    console.log(`  露出=${details.params.exp}s, Gain=${details.params.gain}`);
  }
}
```

---

### POST /album/astro/fitsList

天体撮影セッションの FITS ファイル一覧を取得します。

**リクエスト:**
```bash
curl -X POST http://192.168.88.1:8082/album/astro/fitsList \
  -H "Content-Type: application/json" \
  -d '{"srcDir": "/DWARF_mini/Astronomy/2026-03-01_M31/"}'
```

**レスポンス例:**
```json
{
  "code": 0,
  "data": {
    "fitsInfo": [
      {
        "filePath": "/DWARF_mini/Astronomy/2026-03-01_M31/frame_001.fits",
        "isFailed": false,
        "url": "/DWARF_mini/Astronomy/2026-03-01_M31/frame_001.fits"
      },
      {
        "filePath": "/DWARF_mini/Astronomy/2026-03-01_M31/frame_002.fits",
        "isFailed": true,
        "url": "/DWARF_mini/Astronomy/2026-03-01_M31/frame_002.fits"
      }
    ]
  }
}
```

**JavaScript:**
```javascript
const result = await albumAstroFitsList(
  "192.168.88.1",
  "/DWARF_mini/Astronomy/2026-03-01_M31/"
);

for (const fits of result.data.fitsInfo) {
  const status = fits.isFailed ? "失敗" : "成功";
  console.log(`${fits.filePath} [${status}]`);
}
```

---

### POST /album/delete

メディアファイルを削除します。

**リクエスト:**
```bash
curl -X POST http://192.168.88.1:8082/album/delete \
  -H "Content-Type: application/json" \
  -d '{
    "datas": [
      {
        "mediaType": 4,
        "fileName": "stacked_M31.jpg",
        "subType": 0,
        "filePath": "/DWARF_mini/Astronomy/2026-03-01_M31/stacked_M31.jpg"
      }
    ]
  }'
```

**JavaScript:**
```javascript
await albumDelete("192.168.88.1", [
  {
    mediaType: 4,
    fileName: "stacked_M31.jpg",
    subType: 0,
    filePath: "/DWARF_mini/Astronomy/2026-03-01_M31/stacked_M31.jpg",
  },
]);
```

---

## ファイルダウンロード

デバイス上のファイルは**ポート 80** の静的ファイルサーバーから配信されます。
ファイルパスを直接 GET するだけでダウンロードできます。

> **注意:** JSON API (ポート 8082) ではファイルダウンロードできません (404 になります)。

### URL の組み立て

```javascript
import { fileDownloadUrl, downloadFile } from "dwarfii_api/src/http_api.js";

// URL を取得 (ブラウザで開く場合など)
const url = fileDownloadUrl("192.168.88.1", "/DWARF_mini/Astronomy/2026-03-01_M31/frame_001.fits");
// => "http://192.168.88.1:80/DWARF_mini/Astronomy/2026-03-01_M31/frame_001.fits"
```

### curl でダウンロード

```bash
# FITS ファイルをダウンロード (ポート 80)
curl -o frame_001.fits \
  http://192.168.88.1:80/DWARF_mini/Astronomy/2026-03-01_M31/frame_001.fits

# サムネイルをダウンロード (ポート 80)
curl -o thumb.jpg \
  http://192.168.88.1:80/DWARF_mini/Astronomy/2026-03-01_M31/thumb.jpg
```

### JavaScript でダウンロード

```javascript
// Response オブジェクトを取得
const response = await downloadFile(
  "192.168.88.1",
  "/DWARF_mini/Astronomy/2026-03-01_M31/frame_001.fits"
);

// Node.js: ファイルに保存
import { writeFile } from "node:fs/promises";
const buffer = Buffer.from(await response.arrayBuffer());
await writeFile("frame_001.fits", buffer);
```

### 全 FITS ファイルの一括ダウンロード

```javascript
import {
  albumListMediaInfos,
  albumAstroFitsList,
  downloadFile,
} from "dwarfii_api/src/http_api.js";
import { writeFile } from "node:fs/promises";
import { basename } from "node:path";

const IP = "192.168.88.1";

// 1. 天体セッション一覧を取得
const mediaInfos = await albumListMediaInfos(IP, [4]);

for (const media of mediaInfos.data) {
  const details = media.astroImageDetails;
  if (!details) continue;

  console.log(`セッション: ${details.target} (${details.srcDir})`);

  // 2. FITS ファイル一覧を取得
  const fitsResult = await albumAstroFitsList(IP, details.srcDir);

  // 3. 成功フレームのみダウンロード
  for (const fits of fitsResult.data.fitsInfo) {
    if (fits.isFailed) continue;

    const response = await downloadFile(IP, fits.filePath);
    const buffer = Buffer.from(await response.arrayBuffer());
    await writeFile(basename(fits.filePath), buffer);
    console.log(`  ダウンロード完了: ${basename(fits.filePath)}`);
  }
}
```

---

## カメラストリーミング

### RTSP ストリーミング (ポート 554) -- 推奨

実機テストにより、DWARF mini / 3 のカメラストリームは **RTSP (ポート 554)** で提供されることが確認されています。
DWARF mini と DWARF 3 は同じ RTSP アプローチを使用しています。

| カメラ | RTSP URL | チャンネル |
|--------|----------|-----------|
| 望遠 (Tele) | `rtsp://<IP>:554/ch0/stream0` | ch0 |
| 広角 (Wide) | `rtsp://<IP>:554/ch1/stream0` | ch1 |

```javascript
import { rtspTeleUrl, rtspWideUrl } from "dwarfii_api/src/http_api.js";

const teleUrl = rtspTeleUrl("192.168.88.1");
// => "rtsp://192.168.88.1:554/ch0/stream0"

const wideUrl = rtspWideUrl("192.168.88.1");
// => "rtsp://192.168.88.1:554/ch1/stream0"
```

```bash
# VLC で望遠カメラストリームを表示
vlc rtsp://192.168.88.1:554/ch0/stream0

# ffmpeg で広角カメラストリームを録画
ffmpeg -rtsp_transport tcp -i rtsp://192.168.88.1:554/ch1/stream0 -c copy output.mp4

# ffplay でリアルタイム表示
ffplay -rtsp_transport tcp rtsp://192.168.88.1:554/ch0/stream0
```

### MJPEG エンドポイント (ポート 8092) -- 非推奨

MJPEG エンドポイントはポート 8092 に存在しますが、実機テストでは **0 バイト** を返すことが確認されています。
実用的なストリーミングには上記の RTSP を使用してください。

> **注意:** 以前のドキュメントではポート 8082 に MJPEG ストリームがあると記載されていましたが、
> これは誤りでした。MJPEG エンドポイントはポート 8092 に存在し (ただしデータなし)、
> ポート 8082 は JSON API 専用です。

```javascript
import { mainstreamUrl, secondstreamUrl } from "dwarfii_api/src/http_api.js";

// これらの URL は存在するが、実際にはデータを返さない
const mjpegTele = mainstreamUrl("192.168.88.1");
// => "http://192.168.88.1:8092/mainstream"

const mjpegWide = secondstreamUrl("192.168.88.1");
// => "http://192.168.88.1:8092/secondstream"
```
