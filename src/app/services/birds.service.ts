import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';

export interface Bird {
  id?: string;
  name: string;
  gender: string;
  couple?: string;
  color: string;
  lineage?: string;
  father?: string;
  mother?: string;
}


@Injectable({
  providedIn: 'root'
})
export class BirdsService {
  
  public birds: Observable<Bird[]>;
  public birdsFemale: Observable<Bird[]>;
  public birdsMale: Observable<Bird[]>;


  private birdCollection: AngularFirestoreCollection<Bird>;

  constructor(private afs: AngularFirestore) {
    
    this.birdCollection = this.afs.collection<Bird>('bird', ref => ref.orderBy("name", "asc").limit(10));
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

  getBirds(): Observable<Bird[]> {
    return this.birds;
  }

  getBird(id: string) {
    return this.birdCollection.doc<Bird>(id).valueChanges().pipe(
      take(1),
      map(bird => {
        bird.id = id;
        return bird;
      })
    );
  }

  getFemaleBirds() {
    this.birdCollection = this.afs.collection<Bird>('bird', ref => ref.where(('gender'), '==', 'Female'));
    this.birdsFemale = this.birdCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.birdsFemale;
  }

  getMaleBirds() {
    this.birdCollection = this.afs.collection<Bird>('bird', ref => ref.where(('gender'), '==', 'Male'));
    this.birdsMale = this.birdCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.birdsMale;
  }
  addBird(bird: Bird): Promise<DocumentReference> {
    return this.birdCollection.add(bird);
  }

  updateBird(bird: Bird): Promise<void> {
    return this.birdCollection.doc(bird.id).update({name: bird.name, gender: bird.gender, couple: bird.couple,
      color: bird.color, lineage: bird.lineage, father: bird.father, mother: bird.mother});
  }

  deleteBird(id: string): Promise<void> {
    return this.birdCollection.doc(id).delete();
  }

  searchBird(filter: string) {
    if (filter.length !== 0) {
      console.log('test filter');
      this.birdCollection = this.afs.collection<Bird>('bird', ref => ref.where(('name'), '==', filter));
      this.birds = this.birdCollection.snapshotChanges().pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
    } else if (filter.length === 0) {
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
      console.log('you aren\'t filtering');
    }
  }
}
