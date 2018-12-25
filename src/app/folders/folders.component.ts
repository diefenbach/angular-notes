import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiService } from '../api.service';
import { Folder } from '../models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.sass']
})
export class FoldersComponent implements OnInit, OnDestroy {
  public folders: Array<Folder>;
  private subscription: Subscription;

  constructor(
    public apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.subscription = this.apiService.getFolders().subscribe(folders => this.folders = folders);
  }

  public addFolder(folderName: any) {
    if (folderName.value !== '') {
      this.apiService.addFolder({title: folderName.value}).subscribe(result => {
        this.apiService.getFolders().subscribe(folders => {
          this.folders = folders;
          this.router.navigate(['/folder', result.id]);
        });
        folderName.value = '';
      });

    }
  }

  ngOnDestroy(): void {
    try {
      this.subscription.unsubscribe();
    } catch (err) {}
  }
}
