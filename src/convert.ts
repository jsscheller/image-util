import * as util from "./util.ts";
import { Format } from "./shared.ts";

/**
 * Convert an image from one format to another.
 *
 * # Examples
 *
 * ```handle
 * image-util/convert(
 *     image = @file("broccoli.jpg"),
 *     format = /Avif(quality = 50, speed = 6)
 * )
 * ```
 */
export async function convert(image: File, format: Format): Promise<File> {
  const args = [util.inputPath(image.name)];
  const { ext, mimeType } = util.pushFormatArgs(format, args);
  const outputPath = util.outputPath(image.name, { ext });
  args.push(outputPath);

  const worker = await util.getWorker();
  return worker.callMagick(image, args, outputPath, mimeType);
}
