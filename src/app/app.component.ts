import { Component, OnInit } from '@angular/core';
import { InMemoryCacheService } from './in-memory-cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  key: string;
  value: string
  search: string;

  constructor(public cacheService: InMemoryCacheService) {}

  ngOnInit() {}

  push(key, value) {
    if(key && value)
      this.cacheService.store(key, value);
  }

  print(key) {
    if(key)
      console.log(this.cacheService.get(this.key));
  }

}
