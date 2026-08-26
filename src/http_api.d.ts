/** @module http_api */

// ---- Enum-like constants ----

/**
 * Known media type IDs returned by the album APIs.
 * Discovered via pcap; not all values are confirmed.
 */
export declare const MediaType: {
  /** Photo (standard camera shot) */
  readonly PHOTO: 0;
  /** Video */
  readonly VIDEO: 1;
  /** Panorama */
  readonly PANORAMA: 2;
  /** Time-lapse */
  readonly TIMELAPSE: 3;
  /** Astro (deep-sky stacked image) */
  readonly ASTRO: 4;
  /** Burst */
  readonly BURST: 5;
  /** Continuous shooting */
  readonly CONTINUOUS: 6;
  /** Dark frame */
  readonly DARK_FRAME: 7;
  /** Unknown / reserved */
  readonly TYPE_8: 8;
  /** Unknown / reserved */
  readonly TYPE_9: 9;
};

// ---- Response types ----

/** Single media-count entry returned by /album/list/mediaCounts */
export interface MediaCount {
  /** Number of items for this media type */
  count: number;
  /** Media type ID (see MediaType) */
  mediaType: number;
}

/** Astro shooting parameters embedded in AstroImageDetails */
export interface AstroParams {
  /** Binning mode (0 = 1x1, 1 = 2x2) */
  binning: number;
  /** Exposure time in seconds */
  exp: number;
  /** Filter index */
  filter: number;
  /** File format (0 = FITS, 1 = TIFF) */
  format: number;
  /** Gain value */
  gain: number;
  /** Image width in pixels */
  width: number;
  /** Image height in pixels */
  height: number;
}

/** Detailed astro image session information */
export interface AstroImageDetails {
  /** Target name (e.g. "M31", "Orion Nebula") */
  target: string;
  /** Right Ascension in decimal hours */
  floatHourRa: number;
  /** Declination in decimal degrees */
  floatDegreeDec: number;
  /** Shooting parameters */
  params: AstroParams;
  /** Number of frames successfully stacked */
  shotsStacked: number;
  /** Number of frames captured so far */
  shotsTaken: number;
  /** Requested number of frames (-1 = infinite) */
  shotsToTake: number;
  /** Session source directory on device */
  srcDir: string;
  /** Total exposure time in seconds */
  totalExp: number;
  /** Observation latitude */
  latitude: number;
  /** Observation longitude */
  longitude: number;
  /** Maximum sensor temperature during session (Celsius) */
  maxTemp: number;
  /** Minimum sensor temperature during session (Celsius) */
  minTemp: number;
  /** Total folder size in bytes */
  folderSize: number;
  /** Annotation / plate-solve info (may be null) */
  annoInfo: unknown;
}

/** Single media item returned by /album/list/mediaInfos */
export interface MediaInfo {
  /** Media type ID */
  mediaType: number;
  /** File name */
  fileName: string;
  /** File path on device */
  filePath: string;
  /** File size in bytes */
  fileSize: number;
  /** File state (0 = normal) */
  fileState: number;
  /** Thumbnail image path on device */
  thumbnailPath: string;
  /** Last modification timestamp (epoch seconds) */
  modificationTime: number;
  /** Camera ID (1 = tele, 2 = wide) */
  camId: number;
  /** Astro target name (empty string for non-astro) */
  astroTargetName: string;
  /** Astro sub-type (0 for non-astro) */
  astroSubType: number;
  /** Detailed astro session info (null for non-astro media) */
  astroImageDetails: AstroImageDetails | null;
}

/** Single FITS file entry returned by /album/astro/fitsList */
export interface FitsFileInfo {
  /** File path on device */
  filePath: string;
  /** Whether stacking of this frame failed */
  isFailed: boolean;
  /** Download URL path (relative to device base URL) */
  url: string;
}

/** File descriptor for album deletion */
export interface AlbumDeleteItem {
  /** Media type ID */
  mediaType: number;
  /** File name */
  fileName: string;
  /** Sub-type */
  subType: number;
  /** File path on device */
  filePath: string;
}

/** Generic API response wrapper */
export interface ApiResponse<T = unknown> {
  /** Response code (0 = success) */
  code: number;
  /** Response data */
  data: T;
}

/** Response from /album/list/mediaCounts */
export type MediaCountsResponse = ApiResponse<MediaCount[]>;

/** Response from /album/list/mediaInfos */
export type MediaInfosResponse = ApiResponse<MediaInfo[]>;

/** Response from /album/astro/fitsList */
export type FitsListResponse = ApiResponse<{ fitsInfo: FitsFileInfo[] }>;

// ---- Constants ----

export declare const DEFAULT_RTSP_PORT: 554;
export declare const DEFAULT_MJPEG_PORT: 8092;

// ---- Function signatures ----

// RTSP streaming (actual working protocol)

/**
 * Get the RTSP URL for the telephoto (main) camera stream.
 * This is the actual working stream protocol used by DWARF mini / 3.
 */
export declare function rtspTeleUrl(IP: string, port?: number): string;

/**
 * Get the RTSP URL for the wide-angle camera stream.
 * This is the actual working stream protocol used by DWARF mini / 3.
 */
export declare function rtspWideUrl(IP: string, port?: number): string;

// MJPEG streaming (endpoint exists but returns 0 bytes)

/**
 * Get the mainstream (telephoto) MJPEG stream URL (port 8092).
 * NOTE: This endpoint exists on the device but returns 0 bytes in practice.
 * Use rtspTeleUrl() for actual camera streaming.
 */
export declare function mainstreamUrl(IP: string): string;

/**
 * Get the second stream (wide-angle) MJPEG stream URL (port 8092).
 * NOTE: This endpoint exists on the device but returns 0 bytes in practice.
 * Use rtspWideUrl() for actual camera streaming.
 */
export declare function secondstreamUrl(IP: string): string;

// File download (port 80 — static file server)
export declare function fileDownloadUrl(IP: string, filePath: string): string;
export declare function downloadFile(
  IP: string,
  filePath: string
): Promise<Response>;

// Device info
export declare function getDeviceInfo(IP: string): Promise<ApiResponse>;
export declare function getDeviceActivateInfo(IP: string): Promise<ApiResponse>;
export declare function fetchDefaultParamsConfig(
  IP: string
): Promise<ApiResponse>;
export declare function getFirmwareVersion(IP: string): Promise<ApiResponse>;

// Shooting mode
export declare function getSupportedShootingModes(
  IP: string
): Promise<ApiResponse>;
export declare function getParamAndSetting(
  IP: string,
  modeId?: number
): Promise<ApiResponse>;

// Album management
export declare function albumListMediaCounts(
  IP: string
): Promise<MediaCountsResponse>;
export declare function albumListMediaInfos(
  IP: string,
  mediaTypeList?: number[]
): Promise<MediaInfosResponse>;
export declare function albumAstroFitsList(
  IP: string,
  srcDir: string
): Promise<FitsListResponse>;
export declare function albumDelete(
  IP: string,
  datas: AlbumDeleteItem[]
): Promise<ApiResponse>;
