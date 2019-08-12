import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';


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
export class MatingService {

  public matings: Observable<Mating[]>;

  private matingCollection: AngularFirestoreCollection<Mating>;

  constructor(private afs: AngularFirestore) {
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
