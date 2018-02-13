export class CacheItem {

  private value: any;
  private expiration: Date;

  constructor(value: any, expiration: Date) {
    this.value = value;
    this.expiration = expiration;
  }

  public getValue(): any {
    return this.value;
  }

  public getExpiration(): Date {
    return this.expiration;
  }

}
