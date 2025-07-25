const fixLatin1: <T = string | number>(v: T) => T = (() => {
  const offset = 128;
  const u8 = new Uint8Array(256 - offset);
  u8.forEach((v, i) => (u8[i] = i + offset));
  const decode = new TextDecoder("ISO-8859-1");
  const str = decode.decode(u8);
  const map = new Map();
  u8.forEach((v, i) => {
    const code = str.charCodeAt(i);
    const s = str.charAt(i);
    if (v !== code) {
      map.set(code, v); // code 映射
      map.set(s, String.fromCharCode(v)); // 字符映射
    }
  });
  if (!map.size) return (v) => v;
  return (v) => (map.has(v) ? map.get(v) : v);
})();

const syncReadBlob = (blob: Blob, charset = "ISO-8859-1") => {
  const url = globalThis.URL.createObjectURL(blob);
  const req = new XMLHttpRequest();
  req.open("GET", url, false);
  req.overrideMimeType(`text/plain;charset=${charset}`);
  req.send(null);
  globalThis.URL.revokeObjectURL(url)
  return req.response as string;
};

/**
 * Blob对像转为字符串
 * @param blob 
 * @param charset 字符编码，默认取blob.type中的字符编码信息或utf-8
 * @returns 
 */
export const blob2String = (blob: Blob, charset?:string) => {
  if(!charset){
    const match = blob.type?.match(/;[\W]*charset=(.+)$/)
    charset = match?.[1] ?? 'ISO-8859-1';
  }
  const str = syncReadBlob(blob, charset);
  const lint1Names = ["ISO-8859-1", "LATIN-1", "LATIN1"];
  if (lint1Names.includes(charset.toLocaleUpperCase())) {
    return Array.from(str, (s) => fixLatin1(s)).join("");
  }
  return str;
};

export const blob2buffer = (blob: Blob) => {
  const str = syncReadBlob(blob);
  const u8 = Uint8Array.from(str, (v) => fixLatin1(v.charCodeAt(0)));
  return u8.buffer;
};

export const blob2Base64 = (blob: Blob) => {
  const str = syncReadBlob(blob);
  const max = str.length;
  const block = 1024 * 500; // 每次转换的大小
  let offset = 0;
  let base64 = [] as string[];
  do {
    base64.push(
      btoa(Array.from(str.substring(offset, offset + block), (v) => fixLatin1(v)).join(""))
    );
    offset += block;
  } while (offset < max);
  return base64.join("");
};

// TODO 后续添加
// export const blob2dataUrl = (blob: Blob) => {
// };

export default {
  blob2String,
  blob2buffer,
  blob2Base64,
};
