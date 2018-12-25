import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Note } from '../models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.sass']
})
export class NoteComponent implements OnInit, OnDestroy {
  public note: Note;
  private subscription: Subscription;

  constructor(
    public apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.apiService.getNote(params.noteId).subscribe(note => this.note = note);
    });
  }

  ngOnDestroy(): void {
    try {
      this.subscription.unsubscribe();
    } catch (e) {}
  }
}
