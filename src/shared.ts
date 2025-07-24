export type Resize =
  | WidthResize
  | HeightResize
  | AreaResize
  | PercentageResize
  | BestFitResize
  | ExactResize
  | FillResize
  | PadResize
  | CropResize;

export enum ResizeType {
  Width = "width",
  Height = "height",
  Area = "area",
  Percentage = "percentage",
  BestFit = "best_fit",
  Exact = "exact",
  Fill = "fill",
  Pad = "pad",
  Crop = "crop",
}

/** Resize an image by width while preserving the aspect ratio. */
export type WidthResize = {
  type: ResizeType.Width;
  value: number;
};

/** Resize an image by height while preserving the aspect ratio. */
export type HeightResize = {
  type: ResizeType.Height;
  value: number;
};

/**
 * Resize by enlarging or reducing - just enough to best fit the given size
 * while preserving the aspect ratio.
 */
export type BestFitResize = {
  type: ResizeType.BestFit;
  width: number;
  height: number;
};

/** Resize by to the exact dimensions provided, ignoring the aspect ratio */
export type ExactResize = {
  type: ResizeType.Exact;
  width: number;
  height: number;
};

/**
 * Resize based on the smallest fitting dimension. The resized image will
 * completely fill (and even overflow) the given size.
 */
export type FillResize = {
  type: ResizeType.Fill;
  width: number;
  height: number;
};

/**
 * Resize to fit within the given size and then add a border around the image to
 * exactly match the given size.
 */
export type PadResize = {
  type: ResizeType.Pad;
  width: number;
  height: number;
  /**
   * Padding/border color in hexadecimal format (eg. `#ff9933`).
   *
   * @picker color
   */
  color: string;
};

/** Crop (cut out parts of the image) to exactly match the given size. */
export type CropResize = {
  type: ResizeType.Crop;
  width: number;
  height: number;
};

/**
 * Resize the image so that its area is less than or equal to the specified
 * area.
 */
export type AreaResize = {
  type: ResizeType.Area;
  area: number;
  exactMatch?: boolean;
  /**
   * Padding/border color in hexadecimal format (eg. `#ff9933`).
   *
   * @picker color
   */
  color?: string;
  width?: number;
  height?: number;
};

/** Scale the image by a percentage (a number between 0 and 100). */
export type PercentageResize = {
  type: ResizeType.Percentage;
  value: number;
};

// https://imagemagick.org/script/defines.php
// https://imagemagick.org/script/formats.php
// https://imagemagick.org/script/command-line-options.php
export type Format =
  | AvifFormat
  | JpegXlFormat
  | JpegFormat
  | PngFormat
  | QoiFormat
  | WebPFormat
  | TiffFormat;
export enum FormatType {
  Avif = "avif",
  JpegXl = "jpegxl",
  Jpeg = "jpeg",
  Png = "png",
  Qoi = "qoi",
  WebP = "webp",
  Tiff = "tiff",
}

export type AvifFormat = {
  type: FormatType.Avif;
  /**
   * Set to `100` for lossless compression.
   *
   * @default 50
   * @picker range {"min": 0, "min_label": "Worst quality\nBest compression", "max": 100, "max_label": "Best quality\nWorst compression"}
   */
  quality?: number;
  /**
   * @default 6
   * @picker range {"min": 0, "min_label": "Slowest encoding\nBest compression", "max": 9, "max_label": "Fastest encoding\nWorst compression"}
   */
  speed?: number;
  chromaSubsample?: AvifChromaSubsample;
};

export enum AvifChromaSubsample {
  Sample4x2x0 = "420",
  /** @default */
  Sample4x2x2 = "422",
  Sample4x4x4 = "444",
}

export type JpegXlFormat = {
  type: FormatType.JpegXl;
  /**
   * Set to `100` for lossless compression.
   *
   * @default 75
   * @picker range {"min": 0, "max": 100}
   */
  quality?: number;
  /**
   * - `3`: fastest encoding but worst compression
   * - `9`: slowest encoding but best compression
   *
   * @default 7
   * @picker range {"min": 0, "max": 10}
   */
  effort?: number;
};

export type JpegFormat = {
  type: FormatType.Jpeg;
  /**
   * @default 92
   * @picker range {"min": 0, "max": 100}
   */
  quality?: number;
};

export type PngFormat = {
  type: FormatType.Png;
  /**
   * @default 92
   * @picker range {"min": 0, "max": 100}
   */
  quality?: number;
};

export type QoiFormat = {
  type: FormatType.Qoi;
};

export type WebPFormat = {
  type: FormatType.WebP;
  /**
   * @default 92
   * @picker range {"min": 0, "max": 100}
   */
  quality?: number;
};

export type TiffFormat = {
  type: FormatType.Tiff;
  /**
   * @default 92
   * @picker range {"min": 0, "max": 100}
   */
  quality?: number;
};
