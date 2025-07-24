import * as comlink from "comlink";
import magickJsUrl from "out/magick.wasm.js";
import magickWasmUrl from "magick-web/magick.wasm";
import vtracerWasmUrl from "vtracer-web/vtracer.wasm";
import * as vtracer from "vtracer-web";

export class WorkerThread {
  public async callMagick(
    input: File | File[] | { name: string; data: Blob }[],
    args: string[],
    outputPath: string,
    mimeType: string,
  ): Promise<File> {
    if (!Array.isArray(input)) input = [input];
    const magick = await initMagick(input);
    magick.callMain(args);
    return readFile(magick, outputPath, mimeType);
  }

  public async callIdentify(input: File, args: string[]): Promise<string> {
    let stdout = "";
    const dec = new TextDecoder();
    const magick = await initMagick([input], (buf) => {
      stdout += dec.decode(buf);
    });
    magick.callMain(args);
    return stdout;
  }

  public async callVTracer(
    data: ImageData,
    config: any,
    outputName: string,
  ): Promise<File> {
    await vtracer.default({
      module_or_path: new URL(vtracerWasmUrl, import.meta.url).href,
    });
    const svg = vtracer.to_svg(
      data.data as unknown as Uint8Array,
      data.width,
      data.height,
      config,
    );
    return new File([svg], outputName, { type: "image/svg+xml" });
  }
}

function readFile(mod: any, path: string, mimeType?: string): File {
  const buf = mod.FS.readFile(path);
  const name = path.split("/").at(-1)!;
  return new File([buf], name, { type: mimeType || "" });
}

async function initMagick(
  input: File[] | { name: string; data: Blob }[],
  stdoutCallback?: (buf: Uint8Array) => void,
): Promise<any> {
  const jsUrl = new URL(magickJsUrl, import.meta.url).href;
  const wasmUrl = new URL(magickWasmUrl, import.meta.url).href;
  const { default: init } = await import(jsUrl);
  const magick = await init({
    noFSInit: !!stdoutCallback,
    locateFile: (filename: string) => {
      return filename.endsWith(".js") ? jsUrl : wasmUrl;
    },
  });
  if (stdoutCallback) {
    const stdout = new LineOut(stdoutCallback);
    magick.FS.init(undefined, (x: number) => stdout.push(x), undefined);
  }
  magick.FS.mkdir("/input");
  const mount = (input[0] as any)?.data ? { blobs: input } : { files: input };
  magick.FS.mount(magick.WORKERFS, mount, "/input");
  magick.FS.mkdir("/output");
  return magick;
}

class LineOut {
  len: number;
  buf: Uint8Array;

  constructor(public callback: (buf: Uint8Array) => void) {
    this.len = 0;
    this.buf = new Uint8Array(256);
  }

  push(charCode: number) {
    if (this.buf.length === this.len) {
      this.buf = resizeBuffer(this.buf, this.len * 2);
    }
    this.buf[this.len] = charCode;

    if (charCode === 10) {
      this.callback(this.buf.subarray(0, this.len));
      this.len = 0;
    } else {
      this.len += 1;
    }
  }
}

// Allocates a new backing store for the given node so that it can fit at least newSize amount of bytes.
// May allocate more, to provide automatic geometric increase and amortized linear performance appending writes.
// Never shrinks the storage.
function resizeBuffer(
  buf: Uint8Array,
  newCapacity: number,
  prevLen: number = buf.length,
): Uint8Array {
  const prevCapacity = buf ? buf.length : 0;
  if (prevCapacity >= newCapacity) {
    // No need to expand, the storage was already large enough.
    return buf;
  }
  // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
  // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
  // avoid overshooting the allocation cap by a very large margin.
  const CAPACITY_DOUBLING_MAX = 1024 * 1024;
  newCapacity = Math.max(
    newCapacity,
    (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0,
  );
  if (prevCapacity !== 0) {
    // At minimum allocate 256b for each file when expanding.
    newCapacity = Math.max(newCapacity, 256);
  }
  const prevBuf = buf;
  buf = new Uint8Array(newCapacity);
  if (prevLen > 0) {
    // Copy old data over to the new storage.
    buf!.set(prevBuf!.subarray(0, prevLen));
  }
  return buf;
}

comlink.expose(WorkerThread);
