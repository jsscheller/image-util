# API

* [Enumerations](#enumerations)
  * [AvifChromaSubsample](#avifchromasubsample)
  * [ClusteringType](#clusteringtype)
  * [CurveFittingType](#curvefittingtype)
  * [FormatType](#formattype)
  * [HierarchicalClustering](#hierarchicalclustering)
  * [ResizeType](#resizetype)
* [Type Aliases](#type-aliases)
  * [AreaResize](#arearesize)
  * [AvifFormat](#avifformat)
  * [BestFitResize](#bestfitresize)
  * [BlackAndWhiteClustering](#blackandwhiteclustering)
  * [Clustering](#clustering)
  * [ColorClustering](#colorclustering)
  * [CropResize](#cropresize)
  * [CurveFitting](#curvefitting)
  * [ExactResize](#exactresize)
  * [FillResize](#fillresize)
  * [Format](#format)
  * [HeightResize](#heightresize)
  * [JpegFormat](#jpegformat)
  * [JpegXlFormat](#jpegxlformat)
  * [PadResize](#padresize)
  * [PercentageResize](#percentageresize)
  * [PixelCurveFitting](#pixelcurvefitting)
  * [PngFormat](#pngformat)
  * [PolygonCurveFitting](#polygoncurvefitting)
  * [QoiFormat](#qoiformat)
  * [Quantize](#quantize)
  * [Rect](#rect)
  * [Resize](#resize)
  * [SplineCurveFitting](#splinecurvefitting)
  * [TiffFormat](#tiffformat)
  * [WebPFormat](#webpformat)
  * [WidthResize](#widthresize)
* [Functions](#functions)
  * [convert()](#convert)
  * [crop()](#crop)
  * [optimize()](#optimize)
  * [quantize()](#quantize-1)
  * [rasterize()](#rasterize)
  * [resize()](#resize-1)
  * [rotate()](#rotate)
  * [tile()](#tile)
  * [vectorize()](#vectorize)

## Enumerations

### AvifChromaSubsample

Defined in: shared.ts:148

#### Enumeration Members

| Enumeration Member | Value | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sample4x2x0"></a> `Sample4x2x0` | `"420"` | - | shared.ts:149 |
| <a id="sample4x2x2"></a> `Sample4x2x2` | `"422"` | **Default** \`\` | shared.ts:151 |
| <a id="sample4x4x4"></a> `Sample4x4x4` | `"444"` | - | shared.ts:152 |

***

### ClusteringType

Defined in: vectorize.ts:4

#### Enumeration Members

| Enumeration Member | Value | Defined in |
| ------ | ------ | ------ |
| <a id="blackandwhite"></a> `BlackAndWhite` | `"black_and_white"` | vectorize.ts:6 |
| <a id="color"></a> `Color` | `"color"` | vectorize.ts:5 |

***

### CurveFittingType

Defined in: vectorize.ts:55

#### Enumeration Members

| Enumeration Member | Value | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="pixel"></a> `Pixel` | `"pixel"` | **Default** \`\` | vectorize.ts:57 |
| <a id="polygon"></a> `Polygon` | `"polygon"` | - | vectorize.ts:58 |
| <a id="spline"></a> `Spline` | `"spline"` | - | vectorize.ts:59 |

***

### FormatType

Defined in: shared.ts:121

#### Enumeration Members

| Enumeration Member | Value | Defined in |
| ------ | ------ | ------ |
| <a id="avif"></a> `Avif` | `"avif"` | shared.ts:122 |
| <a id="jpeg"></a> `Jpeg` | `"jpeg"` | shared.ts:124 |
| <a id="jpegxl"></a> `JpegXl` | `"jpegxl"` | shared.ts:123 |
| <a id="png"></a> `Png` | `"png"` | shared.ts:125 |
| <a id="qoi"></a> `Qoi` | `"qoi"` | shared.ts:126 |
| <a id="tiff"></a> `Tiff` | `"tiff"` | shared.ts:128 |
| <a id="webp"></a> `WebP` | `"webp"` | shared.ts:127 |

***

### HierarchicalClustering

Defined in: vectorize.ts:33

#### Enumeration Members

| Enumeration Member | Value | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="cutout"></a> `Cutout` | `"cutout"` | Shapes disjoint with others. | vectorize.ts:37 |
| <a id="stacked"></a> `Stacked` | `"stacked"` | Stack shapes on top of another. | vectorize.ts:35 |

***

### ResizeType

Defined in: shared.ts:12

#### Enumeration Members

| Enumeration Member | Value | Defined in |
| ------ | ------ | ------ |
| <a id="area"></a> `Area` | `"area"` | shared.ts:15 |
| <a id="bestfit"></a> `BestFit` | `"best_fit"` | shared.ts:17 |
| <a id="crop"></a> `Crop` | `"crop"` | shared.ts:21 |
| <a id="exact"></a> `Exact` | `"exact"` | shared.ts:18 |
| <a id="fill"></a> `Fill` | `"fill"` | shared.ts:19 |
| <a id="height"></a> `Height` | `"height"` | shared.ts:14 |
| <a id="pad"></a> `Pad` | `"pad"` | shared.ts:20 |
| <a id="percentage"></a> `Percentage` | `"percentage"` | shared.ts:16 |
| <a id="width"></a> `Width` | `"width"` | shared.ts:13 |

## Type Aliases

### AreaResize

```ts
type AreaResize = object;
```

Defined in: shared.ts:90

Resize the image so that its area is less than or equal to the specified
area.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="area-1"></a> `area` | `number` | - | shared.ts:92 |
| <a id="color-1"></a> `color?` | `string` | Padding/border color in hexadecimal format (eg. `#ff9933`). **Picker** color | shared.ts:99 |
| <a id="exactmatch"></a> `exactMatch?` | `boolean` | - | shared.ts:93 |
| <a id="height-1"></a> `height?` | `number` | - | shared.ts:101 |
| <a id="type"></a> `type` | [`Area`](#area) | - | shared.ts:91 |
| <a id="width-1"></a> `width?` | `number` | - | shared.ts:100 |

***

### AvifFormat

```ts
type AvifFormat = object;
```

Defined in: shared.ts:131

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chromasubsample"></a> `chromaSubsample?` | [`AvifChromaSubsample`](#avifchromasubsample) | - | shared.ts:145 |
| <a id="quality"></a> `quality?` | `number` | Set to `100` for lossless compression. **Default** `50` **Picker** range {"min": 0, "min\_label": "Worst quality\nBest compression", "max": 100, "max\_label": "Best quality\nWorst compression"} | shared.ts:139 |
| <a id="speed"></a> `speed?` | `number` | **Default** `6` **Picker** range {"min": 0, "min\_label": "Slowest encoding\nBest compression", "max": 9, "max\_label": "Fastest encoding\nWorst compression"} | shared.ts:144 |
| <a id="type-1"></a> `type` | [`Avif`](#avif) | - | shared.ts:132 |

***

### BestFitResize

```ts
type BestFitResize = object;
```

Defined in: shared.ts:40

Resize by enlarging or reducing - just enough to best fit the given size
while preserving the aspect ratio.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height-2"></a> `height` | `number` | shared.ts:43 |
| <a id="type-2"></a> `type` | [`BestFit`](#bestfit) | shared.ts:41 |
| <a id="width-2"></a> `width` | `number` | shared.ts:42 |

***

### BlackAndWhiteClustering

```ts
type BlackAndWhiteClustering = object;
```

Defined in: vectorize.ts:40

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="filterspeckle"></a> `filterSpeckle?` | `number` | Discard patches smaller than the specified number of pixels. **Default** `4` **Picker** range {"min": 0, "max": 128} | vectorize.ts:48 |
| <a id="type-3"></a> `type` | [`BlackAndWhite`](#blackandwhite) | - | vectorize.ts:41 |

***

### Clustering

```ts
type Clustering = 
  | ColorClustering
  | BlackAndWhiteClustering;
```

Defined in: vectorize.ts:3

***

### ColorClustering

```ts
type ColorClustering = object;
```

Defined in: vectorize.ts:9

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="colorprecision"></a> `colorPrecision?` | `number` | **Default** `8` **Picker** range {"min": 1, "max": 8} | vectorize.ts:23 |
| <a id="filterspeckle-1"></a> `filterSpeckle?` | `number` | Discard patches smaller than the specified number of pixels. **Default** `4` **Picker** range {"min": 0, "max": 128} | vectorize.ts:18 |
| <a id="gradientstep"></a> `gradientStep?` | `number` | Color difference between gradient layers. **Default** `28` **Picker** range {"min": 0, "max": 128} | vectorize.ts:30 |
| <a id="hierarchical"></a> `hierarchical?` | [`HierarchicalClustering`](#hierarchicalclustering) | - | vectorize.ts:11 |
| <a id="type-4"></a> `type` | [`Color`](#color) | - | vectorize.ts:10 |

***

### CropResize

```ts
type CropResize = object;
```

Defined in: shared.ts:80

Crop (cut out parts of the image) to exactly match the given size.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height-3"></a> `height` | `number` | shared.ts:83 |
| <a id="type-5"></a> `type` | [`Crop`](#crop) | shared.ts:81 |
| <a id="width-3"></a> `width` | `number` | shared.ts:82 |

***

### CurveFitting

```ts
type CurveFitting = 
  | PixelCurveFitting
  | PolygonCurveFitting
  | SplineCurveFitting;
```

Defined in: vectorize.ts:51

***

### ExactResize

```ts
type ExactResize = object;
```

Defined in: shared.ts:47

Resize by to the exact dimensions provided, ignoring the aspect ratio

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height-4"></a> `height` | `number` | shared.ts:50 |
| <a id="type-6"></a> `type` | [`Exact`](#exact) | shared.ts:48 |
| <a id="width-4"></a> `width` | `number` | shared.ts:49 |

***

### FillResize

```ts
type FillResize = object;
```

Defined in: shared.ts:57

Resize based on the smallest fitting dimension. The resized image will
completely fill (and even overflow) the given size.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height-5"></a> `height` | `number` | shared.ts:60 |
| <a id="type-7"></a> `type` | [`Fill`](#fill) | shared.ts:58 |
| <a id="width-5"></a> `width` | `number` | shared.ts:59 |

***

### Format

```ts
type Format = 
  | AvifFormat
  | JpegXlFormat
  | JpegFormat
  | PngFormat
  | QoiFormat
  | WebPFormat
  | TiffFormat;
```

Defined in: shared.ts:113

***

### HeightResize

```ts
type HeightResize = object;
```

Defined in: shared.ts:31

Resize an image by height while preserving the aspect ratio.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="type-8"></a> `type` | [`Height`](#height) | shared.ts:32 |
| <a id="value"></a> `value` | `number` | shared.ts:33 |

***

### JpegFormat

```ts
type JpegFormat = object;
```

Defined in: shared.ts:174

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="quality-1"></a> `quality?` | `number` | **Default** `92` **Picker** range {"min": 0, "max": 100} | shared.ts:180 |
| <a id="type-9"></a> `type` | [`Jpeg`](#jpeg) | - | shared.ts:175 |

***

### JpegXlFormat

```ts
type JpegXlFormat = object;
```

Defined in: shared.ts:155

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="effort"></a> `effort?` | `number` | - `3`: fastest encoding but worst compression - `9`: slowest encoding but best compression **Default** `7` **Picker** range {"min": 0, "max": 10} | shared.ts:171 |
| <a id="quality-2"></a> `quality?` | `number` | Set to `100` for lossless compression. **Default** `75` **Picker** range {"min": 0, "max": 100} | shared.ts:163 |
| <a id="type-10"></a> `type` | [`JpegXl`](#jpegxl) | - | shared.ts:156 |

***

### PadResize

```ts
type PadResize = object;
```

Defined in: shared.ts:67

Resize to fit within the given size and then add a border around the image to
exactly match the given size.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="color-2"></a> `color` | `string` | Padding/border color in hexadecimal format (eg. `#ff9933`). **Picker** color | shared.ts:76 |
| <a id="height-6"></a> `height` | `number` | - | shared.ts:70 |
| <a id="type-11"></a> `type` | [`Pad`](#pad) | - | shared.ts:68 |
| <a id="width-6"></a> `width` | `number` | - | shared.ts:69 |

***

### PercentageResize

```ts
type PercentageResize = object;
```

Defined in: shared.ts:105

Scale the image by a percentage (a number between 0 and 100).

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="type-12"></a> `type` | [`Percentage`](#percentage) | shared.ts:106 |
| <a id="value-1"></a> `value` | `number` | shared.ts:107 |

***

### PixelCurveFitting

```ts
type PixelCurveFitting = object;
```

Defined in: vectorize.ts:62

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="type-13"></a> `type` | [`Pixel`](#pixel) | vectorize.ts:63 |

***

### PngFormat

```ts
type PngFormat = object;
```

Defined in: shared.ts:183

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="quality-3"></a> `quality?` | `number` | **Default** `92` **Picker** range {"min": 0, "max": 100} | shared.ts:189 |
| <a id="type-14"></a> `type` | [`Png`](#png) | - | shared.ts:184 |

***

### PolygonCurveFitting

```ts
type PolygonCurveFitting = object;
```

Defined in: vectorize.ts:66

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="type-15"></a> `type` | [`Polygon`](#polygon) | vectorize.ts:67 |

***

### QoiFormat

```ts
type QoiFormat = object;
```

Defined in: shared.ts:192

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="type-16"></a> `type` | [`Qoi`](#qoi) | shared.ts:193 |

***

### Quantize

```ts
type Quantize = object;
```

Defined in: optimize.ts:4

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="colors"></a> `colors` | `number` | Fewer colors means smaller file size but worse quality. **Default** `256` **Picker** range {"min": 2, "max": 256} | optimize.ts:11 |
| <a id="dither"></a> `dither` | `number` | **Default** `100` **Picker** range {"min": 0, "min\_label": "Smooth", "max": 100, "max\_label": "Grainy"} | optimize.ts:16 |

***

### Rect

```ts
type Rect = object;
```

Defined in: crop.ts:3

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="height-7"></a> `height` | `number` | crop.ts:7 |
| <a id="left"></a> `left` | `number` | crop.ts:5 |
| <a id="top"></a> `top` | `number` | crop.ts:4 |
| <a id="width-7"></a> `width` | `number` | crop.ts:6 |

***

### Resize

```ts
type Resize = 
  | WidthResize
  | HeightResize
  | AreaResize
  | PercentageResize
  | BestFitResize
  | ExactResize
  | FillResize
  | PadResize
  | CropResize;
```

Defined in: shared.ts:1

***

### SplineCurveFitting

```ts
type SplineCurveFitting = object;
```

Defined in: vectorize.ts:70

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="cornerthreshold"></a> `cornerThreshold?` | `number` | Minimum momentary angle (degree) to be considered a corner. **Default** `60` **Picker** range {"min": 0, "max": 180} | vectorize.ts:78 |
| <a id="segmentlength"></a> `segmentLength?` | `number` | Perform iterative subdivide smooth until all segments are shorter than this length. **Default** `4` **Picker** range {"min": 3.5, "max": 10, "step": 0.5} | vectorize.ts:86 |
| <a id="splicethreshold"></a> `spliceThreshold?` | `number` | Minimum angle displacement (degree) to splice a spline. **Default** `45` **Picker** range {"min": 0, "max": 180} | vectorize.ts:93 |
| <a id="type-17"></a> `type` | [`Spline`](#spline) | - | vectorize.ts:71 |

***

### TiffFormat

```ts
type TiffFormat = object;
```

Defined in: shared.ts:205

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="quality-4"></a> `quality?` | `number` | **Default** `92` **Picker** range {"min": 0, "max": 100} | shared.ts:211 |
| <a id="type-18"></a> `type` | [`Tiff`](#tiff) | - | shared.ts:206 |

***

### WebPFormat

```ts
type WebPFormat = object;
```

Defined in: shared.ts:196

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="quality-5"></a> `quality?` | `number` | **Default** `92` **Picker** range {"min": 0, "max": 100} | shared.ts:202 |
| <a id="type-19"></a> `type` | [`WebP`](#webp) | - | shared.ts:197 |

***

### WidthResize

```ts
type WidthResize = object;
```

Defined in: shared.ts:25

Resize an image by width while preserving the aspect ratio.

#### Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="type-20"></a> `type` | [`Width`](#width) | shared.ts:26 |
| <a id="value-2"></a> `value` | `number` | shared.ts:27 |

## Functions

### convert()

```ts
function convert(image, format): Promise<File>;
```

Defined in: convert.ts:16

Convert an image from one format to another.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `image` | `File` |
| `format` | [`Format`](#format) |

#### Returns

`Promise`<`File`>

***

### crop()

```ts
function crop(image, rect): Promise<File>;
```

Defined in: crop.ts:22

Crop an image.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `image` | `File` | - |
| `rect` | [`Rect`](#rect) | **Picker** image-preview/CropPicker {"image": super.image} |

#### Returns

`Promise`<`File`>

***

### optimize()

```ts
function optimize(
   image, 
   format, 
   resize?, 
   quantize?, 
strip?): Promise<File>;
```

Defined in: optimize.ts:35

Reduce the file size of an image.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `image` | `File` | - |
| `format` | [`Format`](#format) | - |
| `resize?` | [`Resize`](#resize) | - |
| `quantize?` | [`Quantize`](#quantize) | Reduce the color palette. |
| `strip?` | `boolean` | Remove metadata from the image (profiles, comments, etc). |

#### Returns

`Promise`<`File`>

***

### quantize()

```ts
function quantize(
   image, 
   colors, 
dither): Promise<File>;
```

Defined in: quantize.ts:18

Reduce the color palette of an image.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `image` | `File` | - |
| `colors` | `number` | Fewer colors means smaller file size but worse quality. **Default** `256` **Picker** range {"min": 2, "max": 256} |
| `dither` | `number` | **Default** `100` **Picker** range {"min": 0, "min\_label": "Smooth", "max": 100, "max\_label": "Grainy"} |

#### Returns

`Promise`<`File`>

***

### rasterize()

```ts
function rasterize(
   image, 
   width, 
   height, 
format): Promise<File>;
```

Defined in: rasterize.ts:18

Convert a vector image (SVG) to a raster image.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `image` | `File` | - |
| `width` | `number` | Set to `0` to maintain the aspect ratio |
| `height` | `number` | Set to `0` to maintain the aspect ratio |
| `format` | [`Format`](#format) | - |

#### Returns

`Promise`<`File`>

***

### resize()

```ts
function resize(image, resize): Promise<File>;
```

Defined in: resize.ts:16

Resize an image.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `image` | `File` |
| `resize` | [`Resize`](#resize) |

#### Returns

`Promise`<`File`>

***

### rotate()

```ts
function rotate(image, angle): Promise<File>;
```

Defined in: rotate.ts:15

Rotate an image.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `image` | `File` | - |
| `angle` | `number` | Rotation angle in degrees. |

#### Returns

`Promise`<`File`>

***

### tile()

```ts
function tile(
   images, 
   rows?, 
   columns?, 
   spacing?, 
   backgroundColor?, 
format?): Promise<File>;
```

Defined in: tile.ts:20

Layout the provided images as a series of tiles.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `images` | `File`\[] | - |
| `rows?` | `number` | Number of horizontal rows. |
| `columns?` | `number` | Number of vertical columns. |
| `spacing?` | `number` | Spacing between the images in pixels. |
| `backgroundColor?` | `string` | Background color in hexadecimal format (eg. `#ff9933`). **Picker** color |
| `format?` | [`Format`](#format) | Output image format. Defaults to JPG. |

#### Returns

`Promise`<`File`>

***

### vectorize()

```ts
function vectorize(
   image, 
   clustering, 
curveFitting): Promise<File>;
```

Defined in: vectorize.ts:111

Convert a raster image into a vector image (SVG).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `image` | `File` |
| `clustering` | [`Clustering`](#clustering) |
| `curveFitting` | [`CurveFitting`](#curvefitting) |

#### Returns

`Promise`<`File`>
