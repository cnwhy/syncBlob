(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.syncBlob = {}));
})(this, function(exports2) {
  "use strict";
  const fixLatin1 = (() => {
    const offset = 128;
    const u8 = new Uint8Array(256 - offset);
    u8.forEach((v, i) => u8[i] = i + offset);
    const decode = new TextDecoder("ISO-8859-1");
    const str = decode.decode(u8);
    const map = /* @__PURE__ */ new Map();
    u8.forEach((v, i) => {
      const code = str.charCodeAt(i);
      const s = str.charAt(i);
      if (v !== code) {
        map.set(code, v);
        map.set(s, String.fromCharCode(v));
      }
    });
    if (!map.size) return (v) => v;
    return (v) => map.has(v) ? map.get(v) : v;
  })();
  const syncReadBlob = (blob, charset = "ISO-8859-1") => {
    const url = globalThis.URL.createObjectURL(blob);
    const req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.overrideMimeType(`text/plain;charset=${charset}`);
    req.send(null);
    globalThis.URL.revokeObjectURL(url);
    return req.response;
  };
  const blob2String = (blob, charset) => {
    var _a, _b;
    if (!charset) {
      const match = (_a = blob.type) == null ? void 0 : _a.match(/;[\W]*charset=(.+)$/);
      charset = (_b = match == null ? void 0 : match[1]) != null ? _b : "ISO-8859-1";
    }
    const str = syncReadBlob(blob, charset);
    const lint1Names = ["ISO-8859-1", "LATIN-1", "LATIN1"];
    if (lint1Names.includes(charset.toLocaleUpperCase())) {
      return Array.from(str, (s) => fixLatin1(s)).join("");
    }
    return str;
  };
  const blob2buffer = (blob) => {
    const str = syncReadBlob(blob);
    const u8 = Uint8Array.from(str, (v) => fixLatin1(v.charCodeAt(0)));
    return u8.buffer;
  };
  const blob2Base64 = (blob) => {
    const str = syncReadBlob(blob);
    const max = str.length;
    const block = 1024 * 500;
    let offset = 0;
    let base64 = [];
    do {
      base64.push(
        btoa(Array.from(str.substring(offset, offset + block), (v) => fixLatin1(v)).join(""))
      );
      offset += block;
    } while (offset < max);
    return base64.join("");
  };
  const index = {
    blob2String,
    blob2buffer,
    blob2Base64
  };
  exports2.blob2Base64 = blob2Base64;
  exports2.blob2String = blob2String;
  exports2.blob2buffer = blob2buffer;
  exports2.default = index;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
});
//# sourceMappingURL=sync-blob.umd.js.map
