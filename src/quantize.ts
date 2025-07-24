import * as util from "./util.ts";

/**
 * Reduce the color palette of an image.
 *
 * # Examples
 *
 * ```handle
 * image-util/quantize(
 *     image = @file("hotdog.png"),
 *     colors = 20,
 *     dither = 100,
 * )
 * ```
 *
 * @preview image-preview/ImagePreview {"image": self.image, "compare": output}
 */
export async function quantize(
  image: File,
  /**
   * Fewer colors means smaller file size but worse quality.
   *
   * @default 256
   * @picker range {"min": 2, "max": 256}
   */
  colors: number,
  /**
   * @default 100
   * @picker range {"min": 0, "min_label": "Smooth", "max": 100, "max_label": "Grainy"}
   */
  dither: number,
): Promise<File> {
  const args = [util.inputPath(image.name)];
  util.pushQuantizeArgs(colors, dither, args);
  const outputPath = util.outputPath(image.name, { suffix: "-quant" });
  args.push(outputPath);

  const worker = await util.getWorker();
  return worker.callMagick(image, args, outputPath, image.type);
}
