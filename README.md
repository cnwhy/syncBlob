# sync-blob

利用 `XHR` 同方模式获取`blob`的内容，适合不能用异步方法的地方，比如`getter`,`setter`;

## 兼容性

- 利用 `XHR` 请求，所以 `CSP` 需要容许 `blob:` 请求
- 只适用于浏览器环境

## Install

```sh
npm install sync-blob;
```

## Demo

```js
import syncBlob from "sync-blob";
const u8 = new Uint8Array([
  0, 1, 2, 3, 0x80, 0x90, 0xa0, 0xb0, 0xc0, 0xd0, 0xe0, 0xf0, 0xff,
]);
const blob = new Blob([u8], { type: "text/ini" });

console.log("blob2buffer:", syncBlob.blob2buffer(blob));
console.log("blob2String:", syncBlob.blob2String(blob, "Latin1")); // charset
console.log("blob2Base64:", syncBlob.blob2Base64(blob));

console.log(
  'btoa(blob2String(blob, "Latin1")):',
  btoa(syncBlob.blob2String(blob, "Latin1"))
);
```

## API(Types)

```js
/**
 * Blob对像转为字符串
 * @param blob
 * @param charset 字符编码，默认取blob.type中的字符编码信息或utf-8
 * @returns
 */
export declare const blob2String: (blob: Blob, charset?: string) => string;
export declare const blob2buffer: (blob: Blob) => ArrayBuffer;
export declare const blob2Base64: (blob: Blob) => string;
declare const _default: {
    blob2String: (blob: Blob, charset?: string) => string;
    blob2buffer: (blob: Blob) => ArrayBuffer;
    blob2Base64: (blob: Blob) => string;
};
export default _default;

```
