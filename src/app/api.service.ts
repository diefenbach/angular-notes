import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, concatMap } from 'rxjs/operators';

import { Note, Folder } from './models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  notesUrl = 'http://localhost:8000/api/notes';
  foldersUrl = 'http://localhost:8000/api/folders';

  constructor(
    private http: HttpClient,
  ) {}

  public getNote(id: string): Observable<Note> {
    return this.http.get<Note>(this.notesUrl + '/' + id).pipe(
      map(result => new Note(result))
    );
  }

  public getNotes(filter?: string): Observable<Array<Note>> {
    const url = filter ? this.notesUrl + '?q=' + filter : this.notesUrl;
    return this.http.get<Array<Note>>(url).pipe(
      map(result => result.map(entry => new Note(entry)))
    );
  }

  public addNote(data): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, data);
  }

  public addFolder(data): Observable<Folder> {
    return this.http.post<Folder>(this.foldersUrl, data);
  }

  public getFolders(): Observable<Array<Folder>> {
    return this.http.get<Array<Folder>>(this.foldersUrl).pipe(
      map(result => result.map(entry => new Folder(entry)))
    );
  }

  public getFolder(id: string): Observable<Folder> {
    return this.http.get<Folder>(this.foldersUrl + '/' + id).pipe(
      map(result => new Folder(result))
    );
  }

}
