import { isDefined } from 'std-kit'; // example import from std-kit if needed

export class DataViewEx<TArrayBuffer extends ArrayBufferLike & { BYTES_PER_ELEMENT?: never }> extends DataView<TArrayBuffer> {
  // #region Fields & Constructor

  private _littleEndian: boolean;
  private readonly _decoder: TextDecoder;
  private readonly _encoder: TextEncoder;

  // Internal cursor to mimic a stream-like interface
  private _cursor = 0;

  /**
   * Constructs a new DataViewEx.
   * @param buffer       The underlying ArrayBuffer (or ArrayBuffer-like).
   * @param byteOffset   Offset in bytes to the first byte in `buffer`.
   * @param byteLength   The length of the view in bytes.
   * @param littleEndian Default endianness for multi-byte ops (defaults to true).
   */
  constructor(buffer: TArrayBuffer, byteOffset?: number, byteLength?: number, littleEndian = true) {
    super(buffer, byteOffset, byteLength);
    this._littleEndian = littleEndian;
    this._decoder = new TextDecoder(); // Defaults to 'utf-8'
    this._encoder = new TextEncoder(); // Defaults to 'utf-8'
  }

  // #endregion

  // #region Endianness

  /**
   * Sets the default endianness for multi-byte operations.
   */
  public setEndianness(littleEndian: boolean): void {
    this._littleEndian = littleEndian;
  }

  /**
   * Retrieves the current default endianness.
   */
  public getEndianness(): boolean {
    return this._littleEndian;
  }

  // #endregion

  // #region Cursor / Position Management

  /**
   * Returns the current cursor position.
   */
  public getCursor(): number {
    return this._cursor;
  }

  /**
   * Sets the cursor to an absolute position (clamped to [0, this.byteLength]).
   */
  public setCursor(position: number): void {
    const maxPos = this.byteLength;
    this._cursor = Math.max(0, Math.min(position, maxPos));
  }

  /**
   * Moves the cursor by the specified delta (can be negative).
   */
  public moveCursor(delta: number): void {
    this.setCursor(this._cursor + delta);
  }

  /**
   * Resets the cursor to 0.
   */
  public resetCursor(): void {
    this._cursor = 0;
  }

  // #endregion

  // #region Offset-based Getters/Setters

  // 8-bit
  public getInt8(byteOffset: number): number {
    return super.getInt8(byteOffset);
  }

  public getUInt8(byteOffset: number): number {
    return super.getUint8(byteOffset);
  }

  public setInt8(byteOffset: number, value: number): void {
    super.setInt8(byteOffset, value);
  }

  public setUInt8(byteOffset: number, value: number): void {
    super.setUint8(byteOffset, value);
  }

  // 16-bit
  public getInt16(byteOffset: number, littleEndian = this._littleEndian): number {
    return super.getInt16(byteOffset, littleEndian);
  }

  public getUInt16(byteOffset: number, littleEndian = this._littleEndian): number {
    return super.getUint16(byteOffset, littleEndian);
  }

  public setInt16(byteOffset: number, value: number, littleEndian = this._littleEndian): void {
    super.setInt16(byteOffset, value, littleEndian);
  }

  public setUInt16(byteOffset: number, value: number, littleEndian = this._littleEndian): void {
    super.setUint16(byteOffset, value, littleEndian);
  }

  // 32-bit
  public getInt32(byteOffset: number, littleEndian = this._littleEndian): number {
    return super.getInt32(byteOffset, littleEndian);
  }

  public getUInt32(byteOffset: number, littleEndian = this._littleEndian): number {
    return super.getUint32(byteOffset, littleEndian);
  }

  public setInt32(byteOffset: number, value: number, littleEndian = this._littleEndian): void {
    super.setInt32(byteOffset, value, littleEndian);
  }

  public setUInt32(byteOffset: number, value: number, littleEndian = this._littleEndian): void {
    super.setUint32(byteOffset, value, littleEndian);
  }

  // 64-bit BigInt
  public getInt64(byteOffset: number, littleEndian = this._littleEndian): bigint {
    return super.getBigInt64(byteOffset, littleEndian);
  }

  public getUInt64(byteOffset: number, littleEndian = this._littleEndian): bigint {
    return super.getBigUint64(byteOffset, littleEndian);
  }

  public setInt64(byteOffset: number, value: bigint, littleEndian = this._littleEndian): void {
    super.setBigInt64(byteOffset, value, littleEndian);
  }

  public setUInt64(byteOffset: number, value: bigint, littleEndian = this._littleEndian): void {
    super.setBigUint64(byteOffset, value, littleEndian);
  }

  // float32 / float64
  public getFloat32(byteOffset: number, littleEndian = this._littleEndian): number {
    return super.getFloat32(byteOffset, littleEndian);
  }

  public setFloat32(byteOffset: number, value: number, littleEndian = this._littleEndian): void {
    super.setFloat32(byteOffset, value, littleEndian);
  }

  public getFloat64(byteOffset: number, littleEndian = this._littleEndian): number {
    return super.getFloat64(byteOffset, littleEndian);
  }

  public setFloat64(byteOffset: number, value: number, littleEndian = this._littleEndian): void {
    super.setFloat64(byteOffset, value, littleEndian);
  }

  // #endregion

  // #region Cursor-based Getters/Setters

  // 8-bit
  public readInt8(): number {
    const value = super.getInt8(this._cursor);
    this._cursor += 1;
    return value;
  }

  public readUInt8(): number {
    const value = super.getUint8(this._cursor);
    this._cursor += 1;
    return value;
  }

  public writeInt8(value: number): void {
    super.setInt8(this._cursor, value);
    this._cursor += 1;
  }

  public writeUInt8(value: number): void {
    super.setUint8(this._cursor, value);
    this._cursor += 1;
  }

  // 16-bit
  public readInt16(littleEndian = this._littleEndian): number {
    const value = super.getInt16(this._cursor, littleEndian);
    this._cursor += 2;
    return value;
  }

  public readUInt16(littleEndian = this._littleEndian): number {
    const value = super.getUint16(this._cursor, littleEndian);
    this._cursor += 2;
    return value;
  }

  public writeInt16(value: number, littleEndian = this._littleEndian): void {
    super.setInt16(this._cursor, value, littleEndian);
    this._cursor += 2;
  }

  public writeUInt16(value: number, littleEndian = this._littleEndian): void {
    super.setUint16(this._cursor, value, littleEndian);
    this._cursor += 2;
  }

  // 32-bit
  public readInt32(littleEndian = this._littleEndian): number {
    const value = super.getInt32(this._cursor, littleEndian);
    this._cursor += 4;
    return value;
  }

  public readUInt32(littleEndian = this._littleEndian): number {
    const value = super.getUint32(this._cursor, littleEndian);
    this._cursor += 4;
    return value;
  }

  public writeInt32(value: number, littleEndian = this._littleEndian): void {
    super.setInt32(this._cursor, value, littleEndian);
    this._cursor += 4;
  }

  public writeUInt32(value: number, littleEndian = this._littleEndian): void {
    super.setUint32(this._cursor, value, littleEndian);
    this._cursor += 4;
  }

  // 64-bit BigInt
  public readInt64(littleEndian = this._littleEndian): bigint {
    const value = super.getBigInt64(this._cursor, littleEndian);
    this._cursor += 8;
    return value;
  }

  public readUInt64(littleEndian = this._littleEndian): bigint {
    const value = super.getBigUint64(this._cursor, littleEndian);
    this._cursor += 8;
    return value;
  }

  public writeInt64(value: bigint, littleEndian = this._littleEndian): void {
    super.setBigInt64(this._cursor, value, littleEndian);
    this._cursor += 8;
  }

  public writeUInt64(value: bigint, littleEndian = this._littleEndian): void {
    super.setBigUint64(this._cursor, value, littleEndian);
    this._cursor += 8;
  }

  // float32 / float64
  public readFloat32(littleEndian = this._littleEndian): number {
    const value = super.getFloat32(this._cursor, littleEndian);
    this._cursor += 4;
    return value;
  }

  public writeFloat32(value: number, littleEndian = this._littleEndian): void {
    super.setFloat32(this._cursor, value, littleEndian);
    this._cursor += 4;
  }

  public readFloat64(littleEndian = this._littleEndian): number {
    const value = super.getFloat64(this._cursor, littleEndian);
    this._cursor += 8;
    return value;
  }

  public writeFloat64(value: number, littleEndian = this._littleEndian): void {
    super.setFloat64(this._cursor, value, littleEndian);
    this._cursor += 8;
  }

  // #endregion

  // #region String Helpers (Offset-based)

  /**
   * Reads a null-terminated UTF-8 string at the absolute offset.
   * Stops on `\0` or end-of-buffer. Does NOT affect cursor.
   */
  public getStringZ(offset: number, maxLength?: number): string {
    let pos = offset;
    const bytes: number[] = [];
    const end = this.byteOffset + this.byteLength;

    while (pos < end) {
      const val = super.getUint8(pos++);
      if (val === 0) {
        break; // found null terminator
      }

      bytes.push(val);
      if (isDefined(maxLength) && bytes.length >= maxLength) {
        break;
      }
    }

    return this._decoder.decode(new Uint8Array(bytes));
  }

  /**
   * Writes a UTF-8 string plus `\0` at the absolute offset.
   * Does NOT affect cursor.
   */
  public setStringZ(offset: number, value: string): void {
    let pos = offset;
    const encoded = this._encoder.encode(value);
    for (let i = 0; i < encoded.length; i++) {
      super.setUint8(pos++, encoded[i]);
    }

    // null terminator
    super.setUint8(pos, 0);
  }

  /**
   * Reads a fixed-length UTF-8 string from the absolute offset,
   * ignoring null terminators, always reading `length` bytes (clamped if needed).
   * Does NOT affect cursor.
   */
  public getFixedString(offset: number, length: number): string {
    if (length <= 0) {
      return '';
    }

    let sliceLength = length;
    const endPos = offset + length;
    const maxEnd = this.byteOffset + this.byteLength;

    // clamp if beyond buffer
    if (endPos > maxEnd) {
      sliceLength = maxEnd - offset;
    }

    if (sliceLength <= 0) {
      return '';
    }

    const slice = new Uint8Array(this.buffer, this.byteOffset + offset, sliceLength);
    return this._decoder.decode(slice);
  }

  /**
   * Writes a fixed-length UTF-8 string at the absolute offset.
   * If shorter than `length`, extra bytes are zeroed.
   * If longer, it is truncated. Does NOT affect cursor.
   */
  public setFixedString(offset: number, value: string, length: number): void {
    if (length <= 0) {
      return;
    }

    const encoded = this._encoder.encode(value);
    let pos = offset;

    let i = 0;
    for (; i < length && i < encoded.length; i++) {
      super.setUint8(pos++, encoded[i]);
    }

    for (; i < length; i++) {
      super.setUint8(pos++, 0);
    }
  }

  // #endregion

  // #region String Helpers (Cursor-based)

  /**
   * Reads a null-terminated UTF-8 string from the current cursor.
   * Stops on `\0` or the end of buffer. Advances `_cursor` by however many bytes were read.
   */
  public readStringZ(maxLength?: number): string {
    const bytes: number[] = [];
    let offset = this._cursor;

    while (offset < this.byteOffset + this.byteLength) {
      const value = super.getUint8(offset);
      offset++;

      if (value === 0) {
        break; // Found null terminator
      }

      bytes.push(value);
      if (isDefined(maxLength) && bytes.length >= maxLength) {
        break;
      }
    }

    // Advance cursor by how many bytes we consumed
    this._cursor = offset;

    return this._decoder.decode(new Uint8Array(bytes));
  }

  /**
   * Writes a UTF-8 string plus a null terminator at the current cursor,
   * advancing the cursor by the total written.
   */
  public writeStringZ(value: string): void {
    const encoded = this._encoder.encode(value);
    for (let i = 0; i < encoded.length; i++) {
      super.setUint8(this._cursor++, encoded[i]);
    }

    // Null terminator
    super.setUint8(this._cursor++, 0);
  }

  /**
   * Reads a fixed-length UTF-8 string from the current cursor,
   * not stopping at null. Exactly `length` bytes are read.
   * Advances `_cursor` by `length` (clamped if necessary).
   */
  public readFixedString(length: number): string {
    if (length <= 0) {
      return '';
    }

    // If length extends beyond the buffer, clamp it
    let sliceLength = length;
    const endPos = this._cursor + length;
    if (endPos > this.byteOffset + this.byteLength) {
      sliceLength = this.byteOffset + this.byteLength - this._cursor;
    }

    const slice = new Uint8Array(this.buffer, this.byteOffset + this._cursor, sliceLength);
    this._cursor += sliceLength;

    return this._decoder.decode(slice);
  }

  /**
   * Writes a fixed-length UTF-8 string from the current cursor.
   * If `value` is shorter than `length`, extra bytes are zeroed.
   * If longer, it is truncated. Advances `_cursor` by `length`.
   */
  public writeFixedString(value: string, length: number): void {
    if (length <= 0) {
      return;
    }

    const encoded = this._encoder.encode(value);
    let i = 0;

    for (; i < length && i < encoded.length; i++) {
      super.setUint8(this._cursor++, encoded[i]);
    }

    // Fill any remainder with zeros
    for (; i < length; i++) {
      super.setUint8(this._cursor++, 0);
    }
  }

  // #endregion

  // #region Buffer Helpers

  /**
   * Convenience getter for the underlying ArrayBuffer reference.
   */
  public get bufferRef(): TArrayBuffer {
    return this.buffer;
  }

  /**
   * Convenience getter for the underlying ArrayBufferView.
   */
  public get bufferView(): Uint8Array {
    return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
  }

  /**
   * Copies `length` bytes from another DataViewEx to this DataViewEx
   * using absolute offsets. Does not affect either cursor.
   */
  public copyFrom(source: DataViewEx<TArrayBuffer>, sourceOffset: number, targetOffset: number, length: number): void {
    const sourceSlice = new Uint8Array(source.buffer, source.byteOffset + sourceOffset, length);
    const targetSlice = new Uint8Array(this.buffer, this.byteOffset + targetOffset, length);

    for (let i = 0; i < length; i++) {
      targetSlice[i] = sourceSlice[i];
    }
  }

  /**
   * Copies `length` bytes from this DataViewEx to another DataViewEx
   * using absolute offsets. Does not affect either cursor.
   */
  public copyTo(target: DataViewEx<TArrayBuffer>, targetOffset: number, sourceOffset: number, length: number): void {
    const sourceSlice = new Uint8Array(this.buffer, this.byteOffset + sourceOffset, length);
    const targetSlice = new Uint8Array(target.buffer, target.byteOffset + targetOffset, length);

    for (let i = 0; i < length; i++) {
      targetSlice[i] = sourceSlice[i];
    }
  }

  /**
   * Creates a new DataViewEx referencing a sub-range of this DataView's buffer.
   * The returned view shares the same underlying ArrayBuffer.
   * Does not affect `_cursor`.
   */
  public slice(subOffset: number, subLength: number): DataViewEx<TArrayBuffer> {
    return new DataViewEx(this.buffer, this.byteOffset + subOffset, subLength, this._littleEndian);
  }

  // #endregion
}
