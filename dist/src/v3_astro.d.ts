/*** --------------------------------------------------------- ***/
/*** ------------- V3 MODULE ASTRO (11xxx) ------------------- ***/
/*** --------------------------------------------------------- ***/
/**
 * V3: Start stacking with the model-appropriate payload.
 * Create Encoded Packet for the command CMD_ASTRO_START_CAPTURE_RAW_LIVE_STACKING
 * DWARF 3 and DWARF mini send the capture filter (1=Astro, 2=Duo-Band).
 * Filterless DWARF 2 uses irIndex=-1, which serializes as the observed sentinel.
 * @param {number} irIndex - Capture filter, or -1 for the filterless sentinel path
 * @param {boolean} forceStart - Continue despite recoverable preflight warnings such as a missing or temperature-mismatched dark frame
 * @returns {Uint8Array}
 */
export function messageV3AstroStartStacking(irIndex?: number, forceStart?: boolean): Uint8Array;
/**
 * V3 protocol >=2.5: continue after firmware reports a recoverable dark-frame
 * warning such as `CODE_ASTRO_DARK_NOT_FOUND` (-11503) or
 * `CODE_ASTRO_DARK_TEMP_MISMATCH` (-11530).
 *
 * DWARF 2 and older protocol versions repeat the start request with
 * `forceStart=true` instead.
 *
 * @returns {Uint8Array}
 */
export function messageV3AstroContinueShooting(): Uint8Array;
/**
 * V3: Stop stacking
 * Create Encoded Packet for the command CMD_ASTRO_STOP_CAPTURE_RAW_LIVE_STACKING
 * @returns {Uint8Array}
 */
export function messageV3AstroStopStacking(): Uint8Array;
/**
 * V3: Start tracking (after stacking)
 * Create Encoded Packet for the command CMD_ASTRO_GO_LIVE
 * @returns {Uint8Array}
 */
export function messageV3AstroStartTracking(): Uint8Array;
/**
 * V3: One-click GOTO DSO with lon/lat/mode
 * Create Encoded Packet for the command CMD_ASTRO_START_ONE_CLICK_GOTO_DSO
 * @param {number} ra - Right Ascension (degrees)
 * @param {number} dec - Declination (degrees)
 * @param {string} targetName - Target name
 * @param {number} lon - Longitude
 * @param {number} lat - Latitude
 * @param {number} mode - Mode (default 2)
 * @returns {Uint8Array}
 */
export function messageV3AstroGotoDSO(ra: number, dec: number, targetName: string, lon: number, lat: number, mode?: number): Uint8Array;
/**
 * V3: One-click GOTO Solar System target with mode
 * Create Encoded Packet for the command CMD_ASTRO_START_ONE_CLICK_GOTO_SOLAR_SYSTEM
 * @param {number} index - Solar system target ID (9=Sun, 8=Moon, etc.)
 * @param {number} lon - Longitude
 * @param {number} lat - Latitude
 * @param {string} targetName - Target name
 * @param {number} mode - Mode (default 8)
 * @returns {Uint8Array}
 */
export function messageV3AstroGotoSolar(index: number, lon: number, lat: number, targetName: string, mode?: number): Uint8Array;
/**
 * V3: GOTO done / acknowledge
 * Create Encoded Packet for the command CMD_ASTRO_STOP_ONE_CLICK_GOTO
 * @returns {Uint8Array}
 */
export function messageV3AstroGotoDone(): Uint8Array;
/**
 * V3: Save stacked image
 * Create Encoded Packet for the command CMD_V3_ASTRO_SAVE_STACKED_IMAGE
 * @param {string} path - Save path on device
 * @returns {Uint8Array}
 */
export function messageV3AstroSaveImage(path: string): Uint8Array;
/**
 * V3: List saved images
 * Create Encoded Packet for the command CMD_V3_ASTRO_LIST_SAVED_IMAGES
 * @returns {Uint8Array}
 */
export function messageV3AstroListImages(): Uint8Array;
/**
 * V3: Status polling
 * Create Encoded Packet for the command CMD_V3_ASTRO_STATUS_POLLING
 * @param {number} f1 - Field 1 (default -1)
 * @param {number} f2 - Field 2 (default 100)
 * @param {number} f3 - Field 3 (default 100)
 * @param {number} f4 - Field 4 (default -1)
 * @returns {Uint8Array}
 */
export function messageV3AstroStatusPolling(f1?: number, f2?: number, f3?: number, f4?: number): Uint8Array;
/**
 * V3: Get astro parameters
 * Create Encoded Packet for the command CMD_V3_ASTRO_GET_PARAMS (11040)
 *
 * Response contains repeated V3AstroParamsData. Its six-component pipeParams
 * string has confirmed positions 3=exposure seconds, 4=gain and 5=frame count.
 * Components 1, 2 and 6 remain unresolved; component 1 is not a filter.
 * Example: "0|0|60|60|1|null".
 *
 * @param {number} mode - Mode (0 or 1)
 * @returns {Uint8Array}
 */
export function messageV3AstroGetParams(mode?: number): Uint8Array;
/**
 * V3: Set astro parameters
 * Create Encoded Packet for the command CMD_V3_ASTRO_SET_PARAMS (11041)
 *
 * The six-component params string has confirmed positions 3=exposure seconds,
 * 4=gain and 5=frame count. Components 1, 2 and 6 remain unresolved.
 * Example: "0|0|60|60|1|null".
 *
 * Response is V3ResSetAstroParams with code and pipeParams echo.
 *
 * @param {string} params - Pipe-delimited parameter string e.g. "0|0|60|60|1|null"
 * @returns {Uint8Array}
 */
export function messageV3AstroSetParams(params: string): Uint8Array;
/**
 * V3: Provisional command 11043 decoder.
 * Existing captures resemble exposure-preset data, while DWARFLAB 3.4.1 names
 * this command GET_CALI_FRAME_LIST. Validate the raw response before relying on
 * this function's response schema.
 * Create Encoded Packet for the command CMD_V3_ASTRO_GET_PRESETS
 * @returns {Uint8Array}
 */
export function messageV3AstroGetPresets(): Uint8Array;
/**
 * V3: Start a calibration-frame capture (CMD 11045).
 *
 * The request schema is confirmed from DWARFLAB 3.4.1. Hardware result delivery
 * and completion notifications are not yet verified.
 *
 * @param {number} expIndex - Exposure index
 * @param {number} gain - Gain value
 * @param {number} resolution - 0=4K, 1=1080P, 2=720P
 * @param {number} capSize - Number of calibration frames
 * @param {number} cameraType - 0=tele camera
 * @param {number} caliFrameType - 0=dark frame
 * @param {number} filterType - 3=DWARF mini Dark filter
 * @param {number} sceneType - 0=setting, 1=shooting
 * @returns {Uint8Array}
 */
export function messageV3AstroStartCalibrationFrame(expIndex: number, gain: number, resolution?: number, capSize?: number, cameraType?: number, caliFrameType?: number, filterType?: number, sceneType?: number): Uint8Array;
/**
 * V3: Start a DWARF mini dark-frame calibration capture.
 * Dark is a calibration workflow, not a normal Deep Sky filter-wheel position.
 *
 * @param {number} expIndex - Exposure index
 * @param {number} gain - Gain value
 * @param {number} resolution - 0=4K, 1=1080P, 2=720P
 * @param {number} capSize - Number of dark frames
 * @param {number} sceneType - 0=setting, 1=shooting
 * @returns {Uint8Array}
 */
export function messageV3AstroStartDarkCalibration(expIndex: number, gain: number, resolution?: number, capSize?: number, sceneType?: number): Uint8Array;
/**
 * V3: Stop a calibration-frame capture (CMD 11046).
 * @param {number} cameraType - 0=tele camera
 * @returns {Uint8Array}
 */
export function messageV3AstroStopCalibrationFrame(cameraType?: number): Uint8Array;
/**
 * V3: Set observation location
 * Create Encoded Packet for the command CMD_V3_ASTRO_SET_LOCATION
 * @param {number} lon - Longitude
 * @param {number} lat - Latitude
 * @returns {Uint8Array}
 */
export function messageV3AstroSetLocation(lon: number, lat: number): Uint8Array;
/**
 * V3: Confirm observation
 * Create Encoded Packet for the command CMD_V3_ASTRO_CONFIRM
 * @returns {Uint8Array}
 */
export function messageV3AstroConfirm(): Uint8Array;
//# sourceMappingURL=v3_astro.d.ts.map