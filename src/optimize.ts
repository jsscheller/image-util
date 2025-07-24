import { Format, Resize } from "./shared.ts";
import * as util from "./util.ts";

export type Quantize = {
  /**
   * Fewer colors means smaller file size but worse quality.
   *
   * @default 256
   * @picker range {"min": 2, "max": 256}
   */
  colors: number;
  /**
   * @default 100
   * @picker range {"min": 0, "min_label": "Smooth", "max": 100, "max_label": "Grainy"}
   */
  dither: number;
};

/**
 * Reduce the file size of an image.
 *
 * # Examples
 *
 * ```handle
 * image-util/optimize(
 *     image = @file("broccoli.jpg"),
 *     format = /Avif(quality = 50, speed = 6),
 *     quantize = Quantize(colors = 256, dither = 100),
 *     strip = true,
 * )
 * ```
 *
 * @preview image-preview/ImagePreview {"image": self.image, "compare": output}
 */
export async function optimize(
  image: File,
  format: Format,
  resize?: Resize,
  /** Reduce the color palette. */
  quantize?: Quantize,
  /** Remove metadata from the image (profiles, comments, etc). */
  strip?: boolean,
): Promise<File> {
  const args = [util.inputPath(image.name)];
  const { ext, mimeType } = util.pushFormatArgs(format, args);
  if (resize) util.pushResizeArgs(resize, args);
  if (quantize) util.pushQuantizeArgs(quantize.colors, quantize.dither, args);
  if (strip) args.push("-strip");
  const outputPath = util.outputPath(image.name, { ext });
  args.push(outputPath);

  const worker = await util.getWorker();
  return worker.callMagick(image, args, outputPath, mimeType);
}
