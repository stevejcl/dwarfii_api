/** @module http_api */
// HTTP API wrapper for DWARF mini / II / 3 file download and album management.
//
// This module is NOT exported from the package main entry point (dist/index.js),
// which exclusively exports WebSocket/protobuf protocol functions.
// Import directly:
//   import { fileDownloadUrl, downloadFile } from "dwarfii_api/src/http_api.js";
//
// The device runs multiple servers:
//   - Port 8082: JSON API (deviceInfo, album management, shooting modes)
//   - Port 80:   Static file server (FITS, JPG, PNG, TIFF, thumbnails)
//   - Port 554:  RTSP streaming (actual working camera streams)
//   - Port 8092: MJPEG streaming (endpoint exists but returns 0 bytes)
//
// Runtime requirement: global `fetch` (Node.js 18+ or browser).
// For older Node.js runtimes, polyfill with `undici` or `node-fetch`.
const DEFAULT_API_PORT = 8082;
const DEFAULT_FILE_PORT = 80;
export const DEFAULT_RTSP_PORT = 554;
export const DEFAULT_MJPEG_PORT = 8092;
/*** --------------------------------------------------------- ***/
/*** ------------- URL BUILDERS ------------------------------ ***/
/*** --------------------------------------------------------- ***/
/**
 * Build the base URL for the JSON API (port 8082).
 * @param {string} IP - Device IP address
 * @param {number} [port=8082] - API port
 * @returns {string}
 */
function apiBaseUrl(IP, port = DEFAULT_API_PORT) {
    return `http://${IP}:${port}`;
}
/**
 * Build the base URL for static file downloads (port 80).
 * @param {string} IP - Device IP address
 * @param {number} [port=80] - File server port
 * @returns {string}
 */
function fileBaseUrl(IP, port = DEFAULT_FILE_PORT) {
    return `http://${IP}:${port}`;
}
/*** --------------------------------------------------------- ***/
/*** ------------- STREAMING URLs ---------------------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * Get the RTSP URL for the telephoto (main) camera stream.
 * This is the actual working stream protocol used by DWARF mini / 3.
 * @param {string} IP - Device IP address
 * @param {number} [port=554] - RTSP port
 * @returns {string} e.g. "rtsp://192.168.88.1:554/ch0/stream0"
 */
export function rtspTeleUrl(IP, port = DEFAULT_RTSP_PORT) {
    return `rtsp://${IP}:${port}/ch0/stream0`;
}
/**
 * Get the RTSP URL for the wide-angle camera stream.
 * This is the actual working stream protocol used by DWARF mini / 3.
 * @param {string} IP - Device IP address
 * @param {number} [port=554] - RTSP port
 * @returns {string} e.g. "rtsp://192.168.88.1:554/ch1/stream0"
 */
export function rtspWideUrl(IP, port = DEFAULT_RTSP_PORT) {
    return `rtsp://${IP}:${port}/ch1/stream0`;
}
/**
 * Get the mainstream (telephoto) MJPEG stream URL (port 8092).
 * NOTE: This endpoint exists on the device but returns 0 bytes in practice.
 * Use {@link rtspTeleUrl} for actual camera streaming.
 * @param {string} IP - Device IP address
 * @returns {string}
 */
export function mainstreamUrl(IP) {
    return `http://${IP}:${DEFAULT_MJPEG_PORT}/mainstream`;
}
/**
 * Get the second stream (wide-angle) MJPEG stream URL (port 8092).
 * NOTE: This endpoint exists on the device but returns 0 bytes in practice.
 * Use {@link rtspWideUrl} for actual camera streaming.
 * @param {string} IP - Device IP address
 * @returns {string}
 */
export function secondstreamUrl(IP) {
    return `http://${IP}:${DEFAULT_MJPEG_PORT}/secondstream`;
}
/*** --------------------------------------------------------- ***/
/*** ------------- FILE DOWNLOAD ----------------------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * Build the full download URL for a file on the device.
 * Files are served on port 80 as static assets — just GET the returned URL.
 * @param {string} IP - Device IP address
 * @param {string} filePath - Absolute file path on device (e.g. "/DWARF_mini/Astronomy/.../xxx.fits")
 * @returns {string}
 */
export function fileDownloadUrl(IP, filePath) {
    return `${fileBaseUrl(IP)}${filePath}`;
}
/**
 * Download a file from the device.
 * @param {string} IP - Device IP address
 * @param {string} filePath - Absolute file path on device
 * @returns {Promise<Response>}
 */
export async function downloadFile(IP, filePath) {
    const url = fileDownloadUrl(IP, filePath);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`downloadFile failed: ${response.status} ${response.statusText} for ${url}`);
    }
    return response;
}
/*** --------------------------------------------------------- ***/
/*** ------------- DEVICE INFO ------------------------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * Get device information.
 * POST /deviceInfo with empty body.
 * Returns { code, data: { deviceID, deviceName, ... } }
 * @param {string} IP - Device IP address
 * @returns {Promise<Object>}
 */
export async function getDeviceInfo(IP) {
    const url = `${apiBaseUrl(IP)}/deviceInfo`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
    });
    if (!response.ok) {
        throw new Error(`getDeviceInfo failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
/**
 * Get device activation information.
 * POST /getDeviceActivateInfo with empty body.
 * @param {string} IP - Device IP address
 * @returns {Promise<Object>}
 */
export async function getDeviceActivateInfo(IP) {
    const url = `${apiBaseUrl(IP)}/getDeviceActivateInfo`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
    });
    if (!response.ok) {
        throw new Error(`getDeviceActivateInfo failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
/**
 * Fetch default parameter configuration.
 * GET /getDefaultParamsConfig
 * Note: Named fetchDefaultParamsConfig to avoid conflict with the URL builder
 * in api_codes.js which exports getDefaultParamsConfig.
 * @param {string} IP - Device IP address
 * @returns {Promise<Object>}
 */
export async function fetchDefaultParamsConfig(IP) {
    const url = `${apiBaseUrl(IP)}/getDefaultParamsConfig`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`fetchDefaultParamsConfig failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
/**
 * Get firmware version.
 * GET /firmwareVersion
 * @param {string} IP - Device IP address
 * @returns {Promise<Object>}
 */
export async function getFirmwareVersion(IP) {
    const url = `${apiBaseUrl(IP)}/firmwareVersion`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`getFirmwareVersion failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
/*** --------------------------------------------------------- ***/
/*** ------------- SHOOTING MODE ----------------------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * Get supported shooting modes.
 * GET /shootingMode/getSupportedShootingModes
 * @param {string} IP - Device IP address
 * @returns {Promise<Object>}
 */
export async function getSupportedShootingModes(IP) {
    const url = `${apiBaseUrl(IP)}/shootingMode/getSupportedShootingModes`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`getSupportedShootingModes failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
/**
 * Get current shooting parameters and settings.
 * POST /shootingMode/getParamAndSetting with a shooting mode ID.
 * @param {string} IP - Device IP address
 * @param {number} [modeId=2] - Shooting mode (2 = astronomy)
 * @returns {Promise<Object>}
 */
export async function getParamAndSetting(IP, modeId = 2) {
    const url = `${apiBaseUrl(IP)}/shootingMode/getParamAndSetting`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modeId }),
    });
    if (!response.ok) {
        throw new Error(`getParamAndSetting failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
/*** --------------------------------------------------------- ***/
/*** ------------- ALBUM MANAGEMENT -------------------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * Get media counts per media type.
 * POST /album/list/mediaCounts with empty body.
 * Returns { code: 0, data: [{ count, mediaType }] }
 * @param {string} IP - Device IP address
 * @returns {Promise<Object>}
 */
export async function albumListMediaCounts(IP) {
    const url = `${apiBaseUrl(IP)}/album/list/mediaCounts`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
    });
    if (!response.ok) {
        throw new Error(`albumListMediaCounts failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
/**
 * Get detailed media information for given media types.
 * POST /album/list/mediaInfos with mediaTypeList.
 * Returns array of session objects with astroImageDetails (RA/DEC, target, params, etc.)
 * @param {string} IP - Device IP address
 * @param {number[]} [mediaTypeList=[0,1,2,3,4,5,6,7,8,9]] - Array of media type IDs to query
 * @returns {Promise<Object>}
 */
export async function albumListMediaInfos(IP, mediaTypeList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    const url = `${apiBaseUrl(IP)}/album/list/mediaInfos`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaTypeList }),
    });
    if (!response.ok) {
        throw new Error(`albumListMediaInfos failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
/**
 * Get the list of FITS files for an astro session directory.
 * POST /album/astro/fitsList with srcDir.
 * Returns { code: 0, data: { fitsInfo: [{ filePath, isFailed, url }] } }
 * @param {string} IP - Device IP address
 * @param {string} srcDir - Session directory path (e.g. "/DWARF_mini/Astronomy/{session}/")
 * @returns {Promise<Object>}
 */
export async function albumAstroFitsList(IP, srcDir) {
    const url = `${apiBaseUrl(IP)}/album/astro/fitsList`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ srcDir }),
    });
    if (!response.ok) {
        throw new Error(`albumAstroFitsList failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
/**
 * Delete media files from the device.
 * POST /album/delete with array of file descriptors.
 * @param {string} IP - Device IP address
 * @param {Array<{mediaType: number, fileName: string, subType: number, filePath: string}>} datas - Array of file descriptors to delete
 * @returns {Promise<Object>}
 */
export async function albumDelete(IP, datas) {
    const url = `${apiBaseUrl(IP)}/album/delete`;
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ datas }),
    });
    if (!response.ok) {
        throw new Error(`albumDelete failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
}
