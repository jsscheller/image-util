import { Format } from "./shared.ts";
import * as util from "./util.ts";

/**
 * Convert a vector image (SVG) to a raster image.
 *
 * # Examples
 *
 * ```handle
 * image-util/rasterize(
 *     image = @file("hotdog.svg"),
 *     width = 1000,
 *     height = 0,
 *     format = /Png,
 * )
 * ```
 */
export async function rasterize(
  image: File,
  /** Set to `0` to maintain the aspect ratio */
  width: number,
  /** Set to `0` to maintain the aspect ratio */
  height: number,
  format: Format,
): Promise<File> {
  const el = await svgToEl(image);

  if (width === 0) width = Math.round((el.width / el.height) * height);
  if (height === 0) height = Math.round((el.height / el.width) * width);

  const data = drawableToImageData(el, { width, height });
  const raw = new File([data.data], "raw.rgba");

  const args = [
    "-size",
    `${width}x${height}`,
    "-depth",
    "8",
    util.inputPath(raw.name),
  ];
  const { ext, mimeType } = util.pushFormatArgs(format, args);
  const outputPath = util.outputPath(image.name, { ext });
  args.push(outputPath);

  const worker = await util.getWorker();
  return worker.callMagick(raw, args, outputPath, mimeType);
}

async function svgToEl(blob: Blob): Promise<HTMLImageElement> {
  // Firefox throws if you try to draw an SVG to canvas that doesn't have width/height.
  // In Chrome it loads, but drawImage behaves weirdly.
  // This function sets width/height if it isn't already set.
  const parser = new DOMParser();
  const text = await blob.text();
  const document = parser.parseFromString(text, "image/svg+xml");
  const svg = document.documentElement!;

  if (svg.hasAttribute("width") && svg.hasAttribute("height")) {
    return blobToImg(blob);
  }

  const viewBox = svg.getAttribute("viewBox");
  if (viewBox === null) throw Error("SVG must have width/height or viewBox");

  const viewboxParts = viewBox.split(/\s+/);
  svg.setAttribute("width", viewboxParts[2]);
  svg.setAttribute("height", viewboxParts[3]);

  const serializer = new XMLSerializer();
  const newSource = serializer.serializeToString(document);
  return blobToImg(new Blob([newSource], { type: "image/svg+xml" }));
}

async function blobToImg(blob: Blob): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(blob);

  try {
    return await decodeImage(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function decodeImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.decoding = "async";
  img.src = url;
  const loaded = new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(Error("Image loading error"));
  });

  if (img.decode) {
    // Nice off-thread way supported in Safari/Chrome.
    // Safari throws on decode if the source is SVG.
    // https://bugs.webkit.org/show_bug.cgi?id=188347
    await img.decode().catch(() => null);
  }

  // Always await loaded, as we may have bailed due to the Safari bug above.
  await loaded;
  return img;
}

interface DrawableToImageDataOptions {
  width?: number;
  height?: number;
  sx?: number;
  sy?: number;
  sw?: number;
  sh?: number;
}

function drawableToImageData(
  drawable: ImageBitmap | HTMLImageElement,
  opts: DrawableToImageDataOptions = {},
): ImageData {
  const {
    width = drawable.width,
    height = drawable.height,
    sx = 0,
    sy = 0,
    sw = drawable.width,
    sh = drawable.height,
  } = opts;

  // Make canvas same size as image
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  // Draw image onto canvas
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context");
  ctx.drawImage(drawable, sx, sy, sw, sh, 0, 0, width, height);
  return ctx.getImageData(0, 0, width, height);
}
