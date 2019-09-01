import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { error } from '@angular/compiler/src/util';


export interface Mating{
  id?: string;
  idCage?: string;
  name?: string;
  idFather?: string;
  idMother?: string;
  dateInitMating: Date;
  dateGale: Date;
  isMating: boolean;
  generateEggs: false;
  dateFinalMating: Date;

}


@Injectable({
  providedIn: 'root'
})
export class MatingService {

  public matings: Observable<Mating[]>;
  public isMatingList: Observable<Mating[]>;
  public notMatingList: Observable<Mating[]>;
  public matingCouple: Observable<Mating[]>;

  private matingCollection: AngularFirestoreCollection<Mating>;

  constructor(private afs: AngularFirestore) {
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

  readIsMating(){
    this.matingCollection = this.afs.collection<Mating>('mating', ref => ref.where(('isMating'), '==',true));
    this.isMatingList = this.matingCollection.snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    ); 

    return this.isMatingList;
  }

  readNoMating(){
    this.matingCollection = this.afs.collection<Mating>('mating', ref => ref.where(('isMating'),'==',false));
    this.notMatingList = this.matingCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      })
    );
    return this.notMatingList;
  }

  readMatingByCouple(idMale : string, idFemale : string){
    this.matingCollection = this.afs.collection<Mating>(
        'mating', ref => ref.where(('ifFather'), '==', idMale).where(('idMother'), '==', idFemale)
    );
    this.matingCouple = this.matingCollection.snapshotChanges().pipe(
       map(actions =>{
        return actions.map( a =>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data}
        });
      })
    );

    return this.matingCouple;
  }

  updateMating(mating: Mating): Promise<void>{
    return this.matingCollection.doc(mating.id).update({name: mating.name, idFather: mating.idFather, 
        idMother: mating.idMother, dateInitMating: mating.dateInitMating, dateGale: mating.dateGale,
        dateFinalMating: mating.dateFinalMating, isMating: mating.isMating, generateEggs: mating.generateEggs,
        idCage : mating.idCage});
  }

  deleteMating(mating: Mating): Promise<void>{
    return this.matingCollection.doc(mating.id).delete();
  }

  deleteMatingById(id: string): Promise<void>{
    return this.matingCollection.doc(id).delete();
  }

}
