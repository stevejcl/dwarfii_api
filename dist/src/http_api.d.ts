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
export function rtspTeleUrl(IP: string, port?: number): string;
/**
 * Get the RTSP URL for the wide-angle camera stream.
 * This is the actual working stream protocol used by DWARF mini / 3.
 * @param {string} IP - Device IP address
 * @param {number} [port=554] - RTSP port
 * @returns {string} e.g. "rtsp://192.168.88.1:554/ch1/stream0"
 */
export function rtspWideUrl(IP: string, port?: number): string;
/**
 * Get the mainstream (telephoto) MJPEG stream URL (port 8092).
 * NOTE: This endpoint exists on the device but returns 0 bytes in practice.
 * Use {@link rtspTeleUrl} for actual camera streaming.
 * @param {string} IP - Device IP address
 * @returns {string}
 */
export function mainstreamUrl(IP: string): string;
/**
 * Get the second stream (wide-angle) MJPEG stream URL (port 8092).
 * NOTE: This endpoint exists on the device but returns 0 bytes in practice.
 * Use {@link rtspWideUrl} for actual camera streaming.
 * @param {string} IP - Device IP address
 * @returns {string}
 */
export function secondstreamUrl(IP: string): string;
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
export function fileDownloadUrl(IP: string, filePath: string): string;
/**
 * Download a file from the device.
 * @param {string} IP - Device IP address
 * @param {string} filePath - Absolute file path on device
 * @returns {Promise<Response>}
 */
export function downloadFile(IP: string, filePath: string): Promise<Response>;
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
export function getDeviceInfo(IP: string): Promise<any>;
/**
 * Get device activation information.
 * POST /getDeviceActivateInfo with empty body.
 * @param {string} IP - Device IP address
 * @returns {Promise<Object>}
 */
export function getDeviceActivateInfo(IP: string): Promise<any>;
/**
 * Fetch default parameter configuration.
 * GET /getDefaultParamsConfig
 * Note: Named fetchDefaultParamsConfig to avoid conflict with the URL builder
 * in api_codes.js which exports getDefaultParamsConfig.
 * @param {string} IP - Device IP address
 * @returns {Promise<Object>}
 */
export function fetchDefaultParamsConfig(IP: string): Promise<any>;
/**
 * Get firmware version.
 * GET /firmwareVersion
 * @param {string} IP - Device IP address
 * @returns {Promise<Object>}
 */
export function getFirmwareVersion(IP: string): Promise<any>;
/*** --------------------------------------------------------- ***/
/*** ------------- SHOOTING MODE ----------------------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * Get supported shooting modes.
 * GET /shootingMode/getSupportedShootingModes
 * @param {string} IP - Device IP address
 * @returns {Promise<Object>}
 */
export function getSupportedShootingModes(IP: string): Promise<any>;
/**
 * Get current shooting parameters and settings.
 * POST /shootingMode/getParamAndSetting with a shooting mode ID.
 * @param {string} IP - Device IP address
 * @param {number} [modeId=2] - Shooting mode (2 = astronomy)
 * @returns {Promise<Object>}
 */
export function getParamAndSetting(IP: string, modeId?: number): Promise<any>;
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
export function albumListMediaCounts(IP: string): Promise<any>;
/**
 * Get detailed media information for given media types.
 * POST /album/list/mediaInfos with mediaTypeList.
 * Returns array of session objects with astroImageDetails (RA/DEC, target, params, etc.)
 * @param {string} IP - Device IP address
 * @param {number[]} [mediaTypeList=[0,1,2,3,4,5,6,7,8,9]] - Array of media type IDs to query
 * @returns {Promise<Object>}
 */
export function albumListMediaInfos(IP: string, mediaTypeList?: number[]): Promise<any>;
/**
 * Get the list of FITS files for an astro session directory.
 * POST /album/astro/fitsList with srcDir.
 * Returns { code: 0, data: { fitsInfo: [{ filePath, isFailed, url }] } }
 * @param {string} IP - Device IP address
 * @param {string} srcDir - Session directory path (e.g. "/DWARF_mini/Astronomy/{session}/")
 * @returns {Promise<Object>}
 */
export function albumAstroFitsList(IP: string, srcDir: string): Promise<any>;
/**
 * Delete media files from the device.
 * POST /album/delete with array of file descriptors.
 * @param {string} IP - Device IP address
 * @param {Array<{mediaType: number, fileName: string, subType: number, filePath: string}>} datas - Array of file descriptors to delete
 * @returns {Promise<Object>}
 */
export function albumDelete(IP: string, datas: Array<{
    mediaType: number;
    fileName: string;
    subType: number;
    filePath: string;
}>): Promise<any>;
export const DEFAULT_RTSP_PORT: 554;
export const DEFAULT_MJPEG_PORT: 8092;
//# sourceMappingURL=http_api.d.ts.map