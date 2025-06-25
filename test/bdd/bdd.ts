import { assert } from "chai";
import * as Base64 from '@cnwhy/base64';
import syncBlob from "../../src";
const log = function (...arg) {
    console.log(...arg);
};
const str = "Blob有同步方法有点绕";
const arr = [0,1,2,3,4,5,6]

const Utf16Encode = function(str) {
	let cods = str.split('').map(s => s.charCodeAt(0));
	return new Uint8Array(new Uint16Array(cods).buffer);
}
const Utf16Decode = function(arr) {
	let u16 = Array.from(new Uint16Array(arr.buffer));
	return u16.map(c => String.fromCharCode(c)).join('');
}
const newTextBlobUtf8 = (s = str) => {
    return new Blob([s], { type: 'text/plain; charset=utf-8' })
}

const newTextBlobUtf16 = (s = str) => {
    return new Blob([Utf16Encode(s)], { type: 'text/plain; charset=utf-16' })
}

describe("SyncBlob", () => {
    beforeEach(async () => {
        log("beforeEach");
    });
    describe("SyncBlob.blob2buffer", () => {
        it(`blob2buffer 测试`, async () => {
            const blob = newTextBlobUtf16();
            const blob1 = newTextBlobUtf8();
            const buffer = syncBlob.blob2buffer(blob)
            const buffer1 = syncBlob.blob2buffer(blob1)
            const _buffer = await blob.arrayBuffer()
            const _buffer1 = await blob1.arrayBuffer()
            assert.deepEqual(buffer, _buffer)
            assert.deepEqual(buffer1, _buffer1)
        });
    })
    describe("SyncBlob.blob2Base64", () => {
        it(`blob2Base64 测试`, async () => {
            const blob = newTextBlobUtf16();
            const blob1 = newTextBlobUtf8();
            const b64 = syncBlob.blob2Base64(blob)
            const b641 = syncBlob.blob2Base64(blob1)
            const _b64 = Base64.encode(await blob.arrayBuffer())
            const _b641 = Base64.encode(await blob1.arrayBuffer())
            console.log(b64, _b64)
            console.log(b641, _b641)
            assert.deepEqual(b64, _b64)
            assert.deepEqual(b641, _b641)
        });
    
    })
    describe("SyncBlob.blob2String", () => {
        it(`blob2String 测试`, async () => {
            const blob = newTextBlobUtf16();
            const blob1 = newTextBlobUtf8();
            const s = syncBlob.blob2String(blob)
            const s1 = syncBlob.blob2String(blob1)
            console.log('s', s)
            console.log('s1', s1)
            assert.deepEqual(s, str)
            assert.deepEqual(s1, str)
        });
        it(`blob2String 自定义编码`, async () => {
            const blob = newTextBlobUtf16();
            const blob1 = newTextBlobUtf8();
            const s = syncBlob.blob2String(blob, 'LATIN1')
            const s1 = syncBlob.blob2String(blob1, 'LATIN1')
            const u8 = Utf16Encode(str);
            const u81 = new TextEncoder().encode(str);
            let _s = '';
            let _s1 = '';
            u8.forEach(code=>{
                _s += String.fromCharCode(code);
            })
            u81.forEach(code=>{
                _s1 += String.fromCharCode(code);
            })
            console.log('blob2String 自定义编码', s, _s)
            console.log('blob2String 自定义编码1', s1, _s1)
            assert.deepEqual(s, _s)
            assert.deepEqual(s1, _s1)
        });
        
    })
});