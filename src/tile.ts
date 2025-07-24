import * as util from "./util.ts";
import { Format, FormatType } from "./shared.ts";

/**
 * Layout the provided images as a series of tiles.
 *
 * # Examples
 *
 * ```handle
 * image-util/tile(
 *     images = [@file("broccoli.jpg"), @file("hotdog.png"), @file("hotdog.png"), @file("broccoli.jpg")],
 *     rows = 2,
 *     columns = 2,
 *     spacing = 10,
 *     background_color = "#ff9933",
 *     format = /Png,
 * )
 * ```
 */
export async function tile(
  images: File[],
  /** Number of horizontal rows. */
  rows?: number,
  /** Number of vertical columns. */
  columns?: number,
  /** Spacing between the images in pixels. */
  spacing?: number,
  /**
   * Background color in hexadecimal format (eg. `#ff9933`).
   *
   * @picker color
   */
  backgroundColor?: string,
  /** Output image format. Defaults to JPG. */
  format?: Format,
): Promise<File> {
  if (images.length === 0) {
    throw "expected at least one image";
  }

  const args = ["montage"];
  const blobs = images.map((data, index) => {
    const name = `image${index}`;
    args.push(util.inputPath(name));
    return { name, data };
  });

  let tile;
  if (columns && rows) {
    tile = `${columns}x${rows}`;
  } else if (columns) {
    tile = `${columns}x`;
  } else {
    tile = `x${rows || 1}`;
  }

  spacing ||= 0;
  args.push("-tile", tile, "-geometry", `+${spacing}+${spacing}`);

  if (backgroundColor) {
    args.push(
      "-background",
      backgroundColor,
      "-alpha",
      "remove",
      "-alpha",
      "off",
    );
  }

  format ||= { type: FormatType.Jpeg };
  const { mimeType, ext } = util.pushFormatArgs(format!, args);
  const outputPath = util.outputPath(images[0].name, { suffix: "-tile", ext });
  args.push(outputPath);

  const worker = await util.getWorker();
  return worker.callMagick(blobs, args, outputPath, mimeType);
}
