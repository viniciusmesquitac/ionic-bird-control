import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Mating } from './mating.service';

export interface Egg {
  id?: string;
  name: string;
  couple?: string;
  lineage?: string;
  idFather?: string;
  idMother?: string;
}


@Injectable({
  providedIn: 'root'
})
export class EggsService {

  public eggs: Observable<Egg[]>;
  public eggsByCouple: Observable<Egg[]>;
  private eggCollection: AngularFirestoreCollection<Egg>;

  public matings: Observable<Mating[]>;
  private matingCollection: AngularFirestoreCollection<Mating>;

  constructor(private afs: AngularFirestore) { 
    this.eggCollection = this.afs.collection<Egg>('eggs', ref => ref.orderBy("name", "asc"));
    this.eggs = this.eggCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );


    this.matingCollection = this.afs.collection<Mating>('mating', ref => ref.orderBy('name','asc'));
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


  getCouples(): Observable<Mating[]> {
    return this.matings;
  }

  getEggs(): Observable<Egg[]> {
    return this.eggs;
  }

  getEgg(id: string) {
    return this.eggCollection.doc<Egg>(id).valueChanges().pipe(
      take(1),
      map(egg => {
        egg.id = id;
        return egg;
      })
    );
  }

  getEggsbyCouple(id_father: string, id_mother: string) {
    this.eggCollection = this.afs.collection<Egg>('eggs', ref => ref.where(('idFather'), '==', id_father)
                                                                    .where(('idMother'), '==', id_mother));

    this.eggsByCouple = this.eggCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
    return this.eggsByCouple;
  }

  addEgg(egg: Egg): Promise<DocumentReference> {
    return this.eggCollection.add(egg);
  }

  updateEgg(egg: Egg): Promise<void> {
    return this.eggCollection.doc(egg.id).update({name: egg.name, couple: egg.couple,
    lineage: egg.lineage, IdFather: egg.idFather, idMother: egg.idMother});
  }

  deleteEgg(id: string): Promise<void> {
    return this.eggCollection.doc(id).delete();
  }

}
