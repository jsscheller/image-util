import * as comlink from "comlink";
import type { WorkerThread } from "./worker.worker.ts";
import workerUrl from "out/worker.worker.js";
import { Format, FormatType, Resize, ResizeType } from "./shared.ts";

let WORKER: comlink.Remote<WorkerThread> | undefined;

export async function getWorker(): Promise<comlink.Remote<WorkerThread>> {
  if (!WORKER) {
    const Wrapped = comlink.wrap(
      new Worker(new URL(workerUrl, import.meta.url).href, { type: "module" }),
    ) as any;
    WORKER = await new Wrapped();
  }
  return WORKER!;
}

export function inputPath(path: string): string {
  const name = path.split("/").at(-1)!;
  return `/input/${name}`;
}

export function outputPath(
  path: string,
  opts: { ext?: string; suffix?: string } = {},
): string {
  let name = path.split("/").at(-1)!;
  if (opts.ext) {
    name = replaceExt(name, opts.ext);
  }
  if (opts.suffix) {
    name = addSuffix(name, opts.suffix);
  }
  return `/output/${name}`;
}

export function replaceExt(name: string, ext: string): string {
  let lastDot = name.lastIndexOf(".");
  if (lastDot === -1) {
    lastDot = name.length - 1;
    ext = "." + ext;
  }
  return name.slice(0, lastDot + 1) + ext;
}

export function addSuffix(name: string, suffix: string): string {
  let stem = name;
  let ext = "";
  const lastDot = name.lastIndexOf(".");
  if (lastDot > -1) {
    stem = name.slice(0, lastDot);
    ext = name.slice(lastDot);
  }
  return `${stem}${suffix}${ext}`;
}

export function pushQuantizeArgs(
  colors: number,
  dither: number,
  args: string[],
) {
  args.push(
    "-colors",
    colors.toString(),
    "-dither",
    "FloydSteinberg",
    "-define",
    `dither:diffusion-amount=${dither}%`,
  );
}

export function pushFormatArgs(
  format: Format,
  args: string[],
): { ext: string; mimeType: string } {
  const formatAny = format as any;
  if (formatAny.quality != null) {
    args.push("-quality", formatAny.quality.toString());
  }

  let ext, mimeType;
  switch (format.type) {
    case FormatType.Avif:
      if (format.speed != null) {
        args.push("-define", `heic:speed=${format.speed}`);
      }
      if (format.chromaSubsample) {
        args.push("-define", `heic:chroma=${format.chromaSubsample}`);
      }
      ext = "avif";
      mimeType = "image/avif";
      break;
    case FormatType.JpegXl:
      if (format.effort != null) {
        args.push("-define", `jxl:effort=${format.effort}`);
      }
      ext = "jxl";
      mimeType = "image/jxl";
      break;
    case FormatType.Jpeg:
      ext = "jpg";
      mimeType = "image/jpeg";
      break;
    case FormatType.Png:
      ext = "png";
      mimeType = "image/png";
      break;
    case FormatType.Qoi:
      ext = "qoi";
      mimeType = "image/qoi";
      break;
    case FormatType.WebP:
      ext = "webp";
      mimeType = "image/webp";
      break;
    case FormatType.Tiff:
      ext = "tif";
      mimeType = "image/tiff";
      break;
  }
  return { ext, mimeType };
}

export function pushResizeArgs(resize: Resize, args: string[]) {
  args.push("-resize");
  switch (resize.type) {
    case ResizeType.Width:
      args.push(`${resize.value}x`);
      break;
    case ResizeType.Height:
      args.push(`x${resize.value}`);
      break;
    case ResizeType.BestFit:
      args.push(`${resize.width}x${resize.height}`);
      break;
    case ResizeType.Exact:
      args.push(`${resize.width}x${resize.height}`);
      args[args.length - 1] += "!";
      break;
    case ResizeType.Fill:
      args.push(`${resize.width}x${resize.height}`);
      args[args.length - 1] += "^";
      break;
    case ResizeType.Pad:
      args.push(`${resize.width}x${resize.height}`);
      // Don't stretch the image
      args[args.length - 1] += ">";
      args.push(
        "-background",
        resize.color,
        "-gravity",
        "center",
        "-extent",
        `${resize.width}x${resize.height}`,
      );
      break;
    case ResizeType.Crop:
      args.push(`${resize.width}x${resize.height}`);
      args[args.length - 1] += "^";
      args.push(
        "-gravity",
        "center",
        "-extent",
        `${resize.width}x${resize.height}`,
      );
      break;
    case ResizeType.Area: {
      args.push(`${resize.area}@`);
      if (resize.exactMatch) {
        let size;
        if (resize.width) {
          const width = resize.width;
          size = `${width}x${Math.round(resize.area / width)}`;
        } else if (resize.height) {
          const height = resize.height;
          size = `${Math.round(resize.area / height)}x${height}`;
        } else {
          throw new Error(
            "width or height must be specified when using exact match",
          );
        }
        args.push(
          "-gravity",
          "center",
          "-background",
          resize.color!,
          "-extent",
          size,
        );
      }
      break;
    }
    case ResizeType.Percentage:
      args.push(`${resize.value}%`);
      break;
  }
}
