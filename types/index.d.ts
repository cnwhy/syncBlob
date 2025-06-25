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
