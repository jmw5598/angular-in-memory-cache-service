export interface StorageService {
  store(key: any, value: any): void;
  update(key: any, value: any): void;
  get(key: any): any;
  remove(key:any): void;
}
