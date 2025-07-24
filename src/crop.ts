import * as util from "./util.ts";

export type Rect = {
  top: number;
  left: number;
  width: number;
  height: number;
};

/**
 * Crop an image.
 *
 * # Examples
 *
 * ```handle
 * image-util/crop(
 *     image = @file("broccoli.jpg"),
 *     rect = Rect(top = 208, left = 73, width = 1710, height = 1014),
 * )
 * ```
 */
export async function crop(
  image: File,
  /** @picker image-preview/CropPicker {"image": super.image} */
  rect: Rect,
): Promise<File> {
  const outputPath = util.outputPath(image.name);
  const args = [
    util.inputPath(image.name),
    "-crop",
    `${rect.width}x${rect.height}+${rect.left}+${rect.top}`,
    outputPath,
  ];

  const worker = await util.getWorker();
  return worker.callMagick(image, args, outputPath, image.type);
}
