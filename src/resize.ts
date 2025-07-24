import * as util from "./util.ts";
import { Resize } from "./shared.ts";

/**
 * Resize an image.
 *
 * # Examples
 *
 * ```handle
 * image-util/resize(
 *     image = @file("broccoli.jpg"),
 *     resize = /Width(100)
 * )
 * ```
 */
export async function resize(image: File, resize: Resize): Promise<File> {
  const args = [util.inputPath(image.name)];
  util.pushResizeArgs(resize, args);
  const outputPath = util.outputPath(image.name, { suffix: "-resized" });
  args.push(outputPath);

  const worker = await util.getWorker();
  return worker.callMagick(image, args, outputPath, image.type);
}
