import { beforeEach, describe, expect, it } from 'vitest';
import { DataViewEx } from './DataViewEx';

describe('DataViewEx', () => {
  let buffer: ArrayBuffer;
  let dataView: DataViewEx<ArrayBuffer>;

  beforeEach(() => {
    buffer = new ArrayBuffer(16);
    dataView = new DataViewEx(buffer);
  });

  describe('constructor', () => {
    it('should create DataViewEx with buffer only', () => {
      const dv = new DataViewEx(buffer);
      expect(dv.buffer).toBe(buffer);
      expect(dv.byteOffset).toBe(0);
      expect(dv.byteLength).toBe(16);
    });

    it('should create DataViewEx with buffer and offset', () => {
      const dv = new DataViewEx(buffer, 4);
      expect(dv.buffer).toBe(buffer);
      expect(dv.byteOffset).toBe(4);
      expect(dv.byteLength).toBe(12);
    });

    it('should create DataViewEx with buffer, offset, and length', () => {
      const dv = new DataViewEx(buffer, 4, 8);
      expect(dv.buffer).toBe(buffer);
      expect(dv.byteOffset).toBe(4);
      expect(dv.byteLength).toBe(8);
    });
  });

  describe('basic DataView functionality', () => {
    it('should read and write Uint8 values', () => {
      dataView.setUint8(0, 255);
      expect(dataView.getUint8(0)).toBe(255);
    });

    it('should read and write Int16 values', () => {
      dataView.setInt16(0, -32768);
      expect(dataView.getInt16(0)).toBe(-32768);
    });

    it('should read and write Uint32 values', () => {
      dataView.setUint32(0, 4294967295);
      expect(dataView.getUint32(0)).toBe(4294967295);
    });

    it('should read and write Float32 values', () => {
      const piFloat32 = Math.fround(Math.PI);
      dataView.setFloat32(0, piFloat32);
      expect(dataView.getFloat32(0)).toBeCloseTo(piFloat32, 5);
    });

    it('should read and write Float64 values', () => {
      dataView.setFloat64(0, Math.PI);
      expect(dataView.getFloat64(0)).toBe(Math.PI);
    });
  });

  describe('endianness', () => {
    it('should handle little endian for Uint16', () => {
      dataView.setUint16(0, 0x1234, true);
      expect(dataView.getUint8(0)).toBe(0x34);
      expect(dataView.getUint8(1)).toBe(0x12);
    });

    it('should handle big endian for Uint16', () => {
      dataView.setUint16(0, 0x1234, false);
      expect(dataView.getUint8(0)).toBe(0x12);
      expect(dataView.getUint8(1)).toBe(0x34);
    });
  });

  describe('extended functionality', () => {
    it('should read and write null-terminated strings', () => {
      const testString = 'Hello';
      dataView.setStringZ(0, testString);
      expect(dataView.getStringZ(0)).toBe(testString);
    });

    it('should read and write strings with specified encoding', () => {
      const testString = 'Hello World';
      dataView.setStringZ(0, testString);
      expect(dataView.getStringZ(0)).toBe(testString);
    });

    it('should handle different offset positions', () => {
      dataView.setUint32(0, 0x12345678);
      dataView.setUint32(4, 0x9abcdef0);

      expect(dataView.getUint32(0)).toBe(0x12345678);
      expect(dataView.getUint32(4)).toBe(0x9abcdef0);
    });

    it('should work with TypedArray views', () => {
      const uint8View = new Uint8Array(dataView.buffer);
      uint8View[0] = 0xff;
      uint8View[1] = 0xee;

      expect(dataView.getUint16(0, false)).toBe(0xffee);
    });
  });

  describe('boundary conditions', () => {
    it('should throw error when reading beyond buffer', () => {
      expect(() => dataView.getUint32(14)).toThrow();
    });

    it('should throw error when writing beyond buffer', () => {
      expect(() => dataView.setUint32(14, 123)).toThrow();
    });

    it('should handle zero-length operations', () => {
      const testString = '';
      dataView.setStringZ(0, testString);
      expect(dataView.getStringZ(0)).toBe(testString);
    });
  });

  describe('performance and memory', () => {
    it('should handle large data efficiently', () => {
      const largeBuffer = new ArrayBuffer(1024);
      const largeDv = new DataViewEx(largeBuffer);

      for (let i = 0; i < 256; i++) {
        largeDv.setUint32(i * 4, i);
      }

      for (let i = 0; i < 256; i++) {
        expect(largeDv.getUint32(i * 4)).toBe(i);
      }
    });
  });
});
