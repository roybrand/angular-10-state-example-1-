import { makeStateKey, TransferState } from '@angular/platform-browser';
import { OnInit, ChangeDetectionStrategy, Component, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformServer } from '@angular/common';

export interface ListItem {
  id: number;
  name: string;
}

@Component({
  selector: 'app-list',
  template: `
    <ul *ngFor="let item of list; trackBy: trackByFn">
      <li>{{ item.name }}</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  list: ListItem[] = [];

  constructor(
    private readonly transferState: TransferState,
    private readonly http: HttpClient,
    private readonly cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {}

  ngOnInit(): void {
    const cacheKey = makeStateKey('unique-key');

    if (this.transferState.hasKey(cacheKey)) {
      this.list = this.transferState.get(cacheKey, []); // Fallback to empty list if undefined
    } else {
      this.http.get<ListItem[]>('/app/heroes')
        .subscribe((data) => {
          // Set list
          this.list = data;
        
          // Save list into cache (but only on the server (you could remove this to cache list on client as well))
          if (isPlatformServer(this.platformId)) {
            this.transferState.set(cacheKey, data);
          }
          
          this.cdr.markForCheck();
        });
    }
  }
        
  trackByFn(_index: number, item: ListItem) {
    return item.id;
  }
}