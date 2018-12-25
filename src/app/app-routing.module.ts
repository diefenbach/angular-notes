import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteComponent } from './note/note.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
    { path: 'folder/:folderId', component: NotesComponent, children: [
      { path: 'note/:noteId', component: NoteComponent },
    ] },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
