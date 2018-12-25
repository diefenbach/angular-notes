export class Note {
  public id: number;
  public title: string;
  public description: string;

  public constructor(data?: {}) {
    if (data) {
      this.id = data['id'];
      this.title = data['title'];
      this.description = data['description'];
    }
  }
}

export class Folder {
  public id: number;
  public title: string;
  public notes: Array<Note> = [];

  public constructor(data?: {}) {
    if (data) {
      this.id = data['id'];
      this.title = data['title'];
      for (const note of data['notes']) {
        this.notes.push(new Note(note));
      }
    }
  }
}
