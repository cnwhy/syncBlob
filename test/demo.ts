import syncBlob from "../src";
const u8 = new Uint8Array([
  0, 1, 2, 3, 0x80, 0x90, 0xa0, 0xb0, 0xc0, 0xd0, 0xe0, 0xf0, 0xff,
]);
const blob = new Blob([u8], { type: "text/ini" });

console.log(syncBlob.blob2buffer(blob));
console.log(syncBlob.blob2Base64(blob));
console.log(syncBlob.blob2String(blob, "Latin1"));
// console.log(1);
