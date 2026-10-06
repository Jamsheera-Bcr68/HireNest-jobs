// application/services/file-url-resolver.ts
import { IFileStorageService } from '../interfaces/services/file-storage.service';

export interface IFileResolverService {
  createResolver(): (key?: string) => Promise<string | undefined>;
}
export class FileUrlResolverService implements IFileResolverService {
  constructor(private readonly _fileStorageService: IFileStorageService) {}

  createResolver() {
    const cache = new Map<string, Promise<string | undefined>>();

    return (key?: string): Promise<string | undefined> => {
      if (!key) return Promise.resolve(undefined);
      if (!cache.has(key)) {
        cache.set(key, this._fileStorageService.getFileUrl(key));
      }
      return cache.get(key)!;
    };
  }
}
