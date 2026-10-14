export interface UploadFileDto {
  buffer: Buffer;
  mimetype: string;
  size: number;
  originalName: string;
}
