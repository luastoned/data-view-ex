declare class DataViewEx<TArrayBuffer extends ArrayBufferLike & {
    BYTES_PER_ELEMENT?: never;
}> extends DataView<TArrayBuffer> {
    private _littleEndian;
    private readonly _decoder;
    private readonly _encoder;
    private _cursor;
    /**
     * Constructs a new DataViewEx.
     * @param buffer       The underlying ArrayBuffer (or ArrayBuffer-like).
     * @param byteOffset   Offset in bytes to the first byte in `buffer`.
     * @param byteLength   The length of the view in bytes.
     * @param littleEndian Default endianness for multi-byte ops (defaults to true).
     */
    constructor(buffer: TArrayBuffer, byteOffset?: number, byteLength?: number, littleEndian?: boolean);
    /**
     * Sets the default endianness for multi-byte operations.
     */
    setEndianness(littleEndian: boolean): void;
    /**
     * Retrieves the current default endianness.
     */
    getEndianness(): boolean;
    /**
     * Returns the current cursor position.
     */
    getCursor(): number;
    /**
     * Sets the cursor to an absolute position (clamped to [0, this.byteLength]).
     */
    setCursor(position: number): void;
    /**
     * Moves the cursor by the specified delta (can be negative).
     */
    moveCursor(delta: number): void;
    /**
     * Resets the cursor to 0.
     */
    resetCursor(): void;
    getInt8(byteOffset: number): number;
    getUInt8(byteOffset: number): number;
    setInt8(byteOffset: number, value: number): void;
    setUInt8(byteOffset: number, value: number): void;
    getInt16(byteOffset: number, littleEndian?: boolean): number;
    getUInt16(byteOffset: number, littleEndian?: boolean): number;
    setInt16(byteOffset: number, value: number, littleEndian?: boolean): void;
    setUInt16(byteOffset: number, value: number, littleEndian?: boolean): void;
    getInt32(byteOffset: number, littleEndian?: boolean): number;
    getUInt32(byteOffset: number, littleEndian?: boolean): number;
    setInt32(byteOffset: number, value: number, littleEndian?: boolean): void;
    setUInt32(byteOffset: number, value: number, littleEndian?: boolean): void;
    getInt64(byteOffset: number, littleEndian?: boolean): bigint;
    getUInt64(byteOffset: number, littleEndian?: boolean): bigint;
    setInt64(byteOffset: number, value: bigint, littleEndian?: boolean): void;
    setUInt64(byteOffset: number, value: bigint, littleEndian?: boolean): void;
    getFloat32(byteOffset: number, littleEndian?: boolean): number;
    setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void;
    getFloat64(byteOffset: number, littleEndian?: boolean): number;
    setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void;
    readInt8(): number;
    readUInt8(): number;
    writeInt8(value: number): void;
    writeUInt8(value: number): void;
    readInt16(littleEndian?: boolean): number;
    readUInt16(littleEndian?: boolean): number;
    writeInt16(value: number, littleEndian?: boolean): void;
    writeUInt16(value: number, littleEndian?: boolean): void;
    readInt32(littleEndian?: boolean): number;
    readUInt32(littleEndian?: boolean): number;
    writeInt32(value: number, littleEndian?: boolean): void;
    writeUInt32(value: number, littleEndian?: boolean): void;
    readInt64(littleEndian?: boolean): bigint;
    readUInt64(littleEndian?: boolean): bigint;
    writeInt64(value: bigint, littleEndian?: boolean): void;
    writeUInt64(value: bigint, littleEndian?: boolean): void;
    readFloat32(littleEndian?: boolean): number;
    writeFloat32(value: number, littleEndian?: boolean): void;
    readFloat64(littleEndian?: boolean): number;
    writeFloat64(value: number, littleEndian?: boolean): void;
    /**
     * Reads a null-terminated UTF-8 string at the absolute offset.
     * Stops on `\0` or end-of-buffer. Does NOT affect cursor.
     */
    getStringZ(offset: number, maxLength?: number): string;
    /**
     * Writes a UTF-8 string plus `\0` at the absolute offset.
     * Does NOT affect cursor.
     */
    setStringZ(offset: number, value: string): void;
    /**
     * Reads a fixed-length UTF-8 string from the absolute offset,
     * ignoring null terminators, always reading `length` bytes (clamped if needed).
     * Does NOT affect cursor.
     */
    getFixedString(offset: number, length: number): string;
    /**
     * Writes a fixed-length UTF-8 string at the absolute offset.
     * If shorter than `length`, extra bytes are zeroed.
     * If longer, it is truncated. Does NOT affect cursor.
     */
    setFixedString(offset: number, value: string, length: number): void;
    /**
     * Reads a null-terminated UTF-8 string from the current cursor.
     * Stops on `\0` or the end of buffer. Advances `_cursor` by however many bytes were read.
     */
    readStringZ(maxLength?: number): string;
    /**
     * Writes a UTF-8 string plus a null terminator at the current cursor,
     * advancing the cursor by the total written.
     */
    writeStringZ(value: string): void;
    /**
     * Reads a fixed-length UTF-8 string from the current cursor,
     * not stopping at null. Exactly `length` bytes are read.
     * Advances `_cursor` by `length` (clamped if necessary).
     */
    readFixedString(length: number): string;
    /**
     * Writes a fixed-length UTF-8 string from the current cursor.
     * If `value` is shorter than `length`, extra bytes are zeroed.
     * If longer, it is truncated. Advances `_cursor` by `length`.
     */
    writeFixedString(value: string, length: number): void;
    /**
     * Convenience getter for the underlying ArrayBuffer reference.
     */
    get bufferRef(): TArrayBuffer;
    /**
     * Convenience getter for the underlying ArrayBufferView.
     */
    get bufferView(): Uint8Array;
    /**
     * Copies `length` bytes from another DataViewEx to this DataViewEx
     * using absolute offsets. Does not affect either cursor.
     */
    copyFrom(source: DataViewEx<TArrayBuffer>, sourceOffset: number, targetOffset: number, length: number): void;
    /**
     * Copies `length` bytes from this DataViewEx to another DataViewEx
     * using absolute offsets. Does not affect either cursor.
     */
    copyTo(target: DataViewEx<TArrayBuffer>, targetOffset: number, sourceOffset: number, length: number): void;
    /**
     * Creates a new DataViewEx referencing a sub-range of this DataView's buffer.
     * The returned view shares the same underlying ArrayBuffer.
     * Does not affect `_cursor`.
     */
    slice(subOffset: number, subLength: number): DataViewEx<TArrayBuffer>;
}

export { DataViewEx };
