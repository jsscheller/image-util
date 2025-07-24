import * as util from "./util.ts";

/**
 * Rotate an image.
 *
 * # Examples
 *
 * ```handle
 * image-util/rotate(
 *     image = @file("broccoli.jpg"),
 *     angle = 90,
 * )
 * ```
 */
export async function rotate(
  image: File,
  /** Rotation angle in degrees. */
  angle: number,
): Promise<File> {
  const outputPath = util.outputPath(image.name);
  const args = [
    util.inputPath(image.name),
    "-rotate",
    angle.toString(),
    outputPath,
  ];

  const worker = await util.getWorker();
  return worker.callMagick(image, args, outputPath, image.type);
}
