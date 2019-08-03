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

export interface Mating{
  id?: string;
  name?: string;
  idFather?: string;
  idMother?: string;
  dateInitMating: Date;
  dateGale: Date;
  isMating: boolean;
  dateFinalMating: Date;
}

@Injectable({
  providedIn: 'root'
})
export class BirdsService {
  
  public birds: Observable<Bird[]>;
  public birdsFemale: Observable<Bird[]>;
  public birdsMale: Observable<Bird[]>;

  public matings: Observable<Mating[]>;

  private birdCollection: AngularFirestoreCollection<Bird>;
  private matingCollection: AngularFirestoreCollection<Mating>;

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

    this.matingCollection = this.afs.collection<Mating>('mating', ref => ref.orderBy('name','asc').limit(10));
    this.matings = this.matingCollection.snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};  
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

  createMating(mating: Mating): Promise<DocumentReference> {
    return this.matingCollection.add(mating);
  }

  readMatings(): Observable<Mating[]>{
    return this.matings;
  }

  readMating(id: string){
    return this.matingCollection.doc<Mating>(id).valueChanges().pipe(
      take(1),
      map(mating =>{
        mating.id = id;
        return mating;
      })
    );
  }

  updateMating(mating: Mating): Promise<void>{
    return this.matingCollection.doc(mating.id).update({name: mating.name, idFather: mating.idFather, idMother: mating.idMother,
      dateInitMating: mating.dateInitMating, dateGale: mating.dateGale,dateFinalMating: mating.dateFinalMating, isMating: mating.isMating});
  }

  deleteMating(mating: Mating): Promise<void>{
    return this.matingCollection.doc(mating.id).delete();
  }

}
