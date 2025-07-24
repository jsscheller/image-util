import * as util from "./util.ts";

export type Clustering = ColorClustering | BlackAndWhiteClustering;
export enum ClusteringType {
  Color = "color",
  BlackAndWhite = "black_and_white",
}

export type ColorClustering = {
  type: ClusteringType.Color;
  hierarchical?: HierarchicalClustering;
  /**
   * Discard patches smaller than the specified number of pixels.
   *
   * @default 4
   * @picker range {"min": 0, "max": 128}
   */
  filterSpeckle?: number;
  /**
   * @default 8
   * @picker range {"min": 1, "max": 8}
   */
  colorPrecision?: number;
  /**
   * Color difference between gradient layers.
   *
   * @default 28
   * @picker range {"min": 0, "max": 128}
   */
  gradientStep?: number;
};

export enum HierarchicalClustering {
  /** Stack shapes on top of another. */
  Stacked = "stacked",
  /** Shapes disjoint with others. */
  Cutout = "cutout",
}

export type BlackAndWhiteClustering = {
  type: ClusteringType.BlackAndWhite;
  /**
   * Discard patches smaller than the specified number of pixels.
   *
   * @default 4
   * @picker range {"min": 0, "max": 128}
   */
  filterSpeckle?: number;
};

export type CurveFitting =
  | PixelCurveFitting
  | PolygonCurveFitting
  | SplineCurveFitting;
export enum CurveFittingType {
  /** @default */
  Pixel = "pixel",
  Polygon = "polygon",
  Spline = "spline",
}

export type PixelCurveFitting = {
  type: CurveFittingType.Pixel;
};

export type PolygonCurveFitting = {
  type: CurveFittingType.Polygon;
};

export type SplineCurveFitting = {
  type: CurveFittingType.Spline;
  /**
   * Minimum momentary angle (degree) to be considered a corner.
   *
   * @default 60
   * @picker range {"min": 0, "max": 180}
   */
  cornerThreshold?: number;
  /**
   * Perform iterative subdivide smooth until all segments are shorter than this
   * length.
   *
   * @default 4
   * @picker range {"min": 3.5, "max": 10, "step": 0.5}
   */
  segmentLength?: number;
  /**
   * Minimum angle displacement (degree) to splice a spline.
   *
   * @default 45
   * @picker range {"min": 0, "max": 180}
   */
  spliceThreshold?: number;
};

/**
 * Convert a raster image into a vector image (SVG).
 *
 * # Examples
 *
 * ```handle
 * image-util/vectorize(
 *     image = @file("hotdog.png"),
 *     clustering = /Color(filter_speckle = 16),
 *     curve_fitting = /Spline,
 * )
 * ```
 *
 * @preview image-preview/ImagePreview {"image": self.image, "compare": output}
 */
export async function vectorize(
  image: File,
  clustering: Clustering,
  curveFitting: CurveFitting,
): Promise<File> {
  const config: any = {
    binary: clustering.type === ClusteringType.BlackAndWhite,
    mode: curveFitting.type,
    hierarchical: "stacked",
    cornerThreshold: degToRad(60),
    lengthThreshold: 4,
    maxIterations: 10,
    spliceThreshold: degToRad(45),
    filterSpeckle: 4 * 4,
    colorPrecision: 0,
    layerDifference: 28,
    pathPrecision: 8,
  };
  if (clustering.type === ClusteringType.Color) {
    if (clustering.hierarchical) {
      config.hierarchical = clustering.hierarchical;
    }
    if (clustering.colorPrecision != null) {
      config.colorPrecision = 8 - clustering.colorPrecision;
    }
    if (clustering.gradientStep != null) {
      config.layerDifference = clustering.gradientStep;
    }
  }
  if (clustering.filterSpeckle != null) {
    config.filterSpeckle = clustering.filterSpeckle * clustering.filterSpeckle;
  }
  if (curveFitting.type === CurveFittingType.Spline) {
    if (curveFitting.cornerThreshold) {
      config.cornerThreshold = degToRad(curveFitting.cornerThreshold);
    }
    if (curveFitting.segmentLength != null) {
      config.lengthThreshold = curveFitting.segmentLength;
    }
    if (curveFitting.spliceThreshold != null) {
      config.spliceThreshold = degToRad(curveFitting.spliceThreshold);
    }
  }

  const worker = await util.getWorker();

  const inputPath = util.inputPath(image.name);
  const stdout = await worker.callIdentify(image, [
    "identify",
    "-format",
    "%wx%h\n",
    inputPath,
  ]);
  const [width, height] = stdout
    .split("\n")
    .at(-1)!
    .split("x")
    .map((x) => parseInt(x));

  const outPath = util.outputPath("raw.rgba");
  const raw = await worker.callMagick(
    image,
    [inputPath, "-depth", "8", outPath],
    outPath,
    "",
  );

  const buf = await raw.arrayBuffer();
  const data = new ImageData(new Uint8ClampedArray(buf), width, height);

  return worker.callVTracer(data, config, util.replaceExt(image.name, "svg"));
}

function degToRad(deg: number) {
  return (deg / 180) * Math.PI;
}
