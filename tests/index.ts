import { test } from "uvu";
import * as imageUtil from "../src/index.ts";

test("convert to avif", async function () {
  const image = await download("broccoli.jpg");
  await imageUtil.convert(image, {
    type: imageUtil.FormatType.Avif,
    quality: 50,
    speed: 9,
  });
});

test("convert to jxl", async function () {
  const image = await download("broccoli.jpg");
  await imageUtil.convert(image, {
    type: imageUtil.FormatType.JpegXl,
    quality: 75,
    effort: 3,
  });
});

test("convert to jpeg", async function () {
  const image = await download("broccoli.jpg");
  await imageUtil.convert(image, {
    type: imageUtil.FormatType.Jpeg,
    quality: 75,
  });
});

test("convert to png", async function () {
  const image = await download("broccoli.jpg");
  await imageUtil.convert(image, {
    type: imageUtil.FormatType.Png,
  });
});

test("convert to qoi", async function () {
  const image = await download("broccoli.jpg");
  await imageUtil.convert(image, {
    type: imageUtil.FormatType.Qoi,
  });
});

test("convert to webp", async function () {
  const image = await download("broccoli.jpg");
  await imageUtil.convert(image, {
    type: imageUtil.FormatType.WebP,
  });
});

test("resize", async function () {
  const image = await download("broccoli.jpg");
  await imageUtil.resize(image, {
    type: imageUtil.ResizeType.Width,
    value: 100,
  });
});

test("quantize", async function () {
  const image = await download("broccoli.jpg");
  await imageUtil.quantize(image, 100, 100);
});

test("rotate", async function () {
  const image = await download("broccoli.jpg");
  await imageUtil.rotate(image, 90);
});

test("optimize", async function () {
  const image = await download("broccoli.jpg");
  await imageUtil.optimize(
    image,
    {
      type: imageUtil.FormatType.Avif,
      quality: 60,
      speed: 6,
    },
    {
      type: imageUtil.ResizeType.Width,
      value: 100,
    },
    {
      colors: 100,
      dither: 100,
    },
    true,
  );
});

test("crop", async function () {
  const image = await download("broccoli.jpg");
  await imageUtil.crop(image, { top: 100, left: 100, width: 200, height: 200 });
});

test("vectorize", async function () {
  const image = await download("hotdog.png");
  await imageUtil.vectorize(
    image,
    {
      type: imageUtil.ClusteringType.Color,
      filterSpeckle: 4,
    },
    {
      type: imageUtil.CurveFittingType.Pixel,
    },
  );
});

test("rasterize", async function () {
  const image = await download("hotdog.svg");
  await imageUtil.rasterize(image, 1000, 0, {
    type: imageUtil.FormatType.Avif,
    quality: 50,
    speed: 9,
  });
});

async function download(asset: string): Promise<File> {
  const blob = await fetch(`/assets/${asset}`).then((x) => x.blob());
  return new File([blob], asset, { type: blob.type });
}

// async function debug(image: File) {
//   const img = document.createElement("img");
//   img.src = URL.createObjectURL(image);
//   document.body.append(img);
// }

test.run();
