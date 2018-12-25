import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ApiService } from '../api.service';
import { Note } from '../models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass']
})
export class NotesComponent implements OnInit, OnDestroy {
  public folderId: string;
  public notes: Array<Note>;
  public notesSubscription: Subscription;
  public foldersSubscription: Subscription;
  public filter = '';

  constructor(
    public apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.folderId = params.folderId;
      this.filter = '';
      this.getData();
    });
  }

  onKeyUp() {
    if (this.folderId === 'all') {
      this.notesSubscription = this.apiService.getNotes(this.filter).subscribe(notes => this.notes = notes);
    } else {
      this.foldersSubscription = this.apiService.getFolder(this.folderId).subscribe(folder => {
        this.notes = folder.notes.filter(note => note.title.toLowerCase().includes(this.filter.toLowerCase()));
      });
    }
  }

  public addNote(noteName) {
    if (noteName.value !== '') {
      const folderId = this.route.snapshot.params.folderId;
      this.apiService.addNote({title: noteName.value, folder: folderId}).subscribe(() => {
        noteName.value = '';
        this.getData();
      });
    }
  }

  private getData() {
    if (this.folderId === 'all') {
      this.notesSubscription = this.apiService.getNotes().subscribe(notes => this.notes = notes);
    } else {
      this.foldersSubscription = this.apiService.getFolder(this.folderId).subscribe(folder => this.notes = folder.notes);
    }
  }

  ngOnDestroy(): void {
    try {
      this.notesSubscription.unsubscribe();
    } catch (e) {}

    try {
      this.foldersSubscription.unsubscribe();
    } catch (e) {}
  }

}
