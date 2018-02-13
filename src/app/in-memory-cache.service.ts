import { Injectable, OnDestroy } from '@angular/core';
import { IntervalObservable } from "rxjs/observable/IntervalObservable";
import { StorageService } from './storage-service.interface';

import { CacheItem } from './cache-item.model';

@Injectable()
export class InMemoryCacheService implements StorageService, OnDestroy {

  private storage: Map<any, CacheItem>;
  private cacheTime: number = 60000;
  private subscription;

  constructor() {
    this.storage = new Map<any, CacheItem>();
    this.cacheTime = 60000;
    this.init();
  }

  init() {
    this.subscription = IntervalObservable.create(10000)
      .subscribe(
        res => this.checkForExpired()
      )
  }

  store(key: any, value: any, minutes?: number): void {
    let date: Date = new Date();
    let mins: number = minutes > 0 ? minutes * 10000 : this.cacheTime;
    this.storage.set(key, new CacheItem(value, new Date(date.getTime() + mins)));
  }

  update(key: any, value: any): void {
    this.store(key, value);
  }

  get(key: any): any {
    let cacheItem: CacheItem = this.storage.get(key);
    return cacheItem ? cacheItem.getValue() : undefined;
  }

  remove(key:any): void {
    this.storage.delete(key);
  }

  private checkForExpired() {
    for(let entry of Array.from(this.storage.entries())) {
      let date = new Date();
      if(entry[1].getExpiration() < date)
        this.storage.delete(entry[0]);
    }
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }

}
