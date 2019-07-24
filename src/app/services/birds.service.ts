import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

export interface Bird {
  id?: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class BirdsService {
  public birds: Observable<Bird[]>;
  private birdCollection: AngularFirestoreCollection<Bird>;

  constructor(private afs: AngularFirestore) {
    this.birdCollection = this.afs.collection<Bird>('bird');
    this.birds = this.birdCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  fetchBirds() {
  }

  getBirds(): Observable<Bird[]> {
    return this.birds;
  }

  getBird(id: string) {
    return this.birdCollection.doc<Bird>(id).valueChanges().pipe(
      map(bird => {
        bird.id = id;
        bird.name = name;
        return bird;
      })
    );
  }

  addBird(bird: Bird): Promise<DocumentReference> {
    return this.birdCollection.add(bird);
  }

  updateBird(bird: Bird): Promise<void> {
    return this.birdCollection.doc(bird.id).update({name: bird.name});
  }

  deleteBird(id: string): Promise<void> {
    return this.birdCollection.doc(id).delete();
  }


}
