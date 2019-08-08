import { Component, OnInit } from '@angular/core';
import { BirdsService, Bird } from '../services/birds.service';
import { MatingService, Mating} from '../services/mating.service';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-mating',
  templateUrl: './info-mating.page.html',
  styleUrls: ['./info-mating.page.scss'],
})
export class InfoMatingPage implements OnInit {
  father: Bird = {
    name: '',
    gender: '',
    couple: '',
    color: '',
    lineage: '',
    father: '',
    mother: '',
  };
  
  mother: Bird = {
    name: '',
    gender: '',
    couple: '',
    color: '',
    lineage: '',
    father: '',
    mother: '',
  };

  mating: Mating = {
    name : '',
    idFather: '',
    idMother: '',
    dateInitMating: null,
    dateGale : null,
    dateFinalMating : null,
    isMating : false
  }
  
  constructor(private navCtrl: NavController, private activatedRouter: ActivatedRoute, private birdsService: BirdsService,
    private toastCtrl: ToastController, private router: Router, private matingService: MatingService) {}

  ngOnInit() {
    let matingId = this.activatedRouter.snapshot.paramMap.get('id');
    if (matingId){
      this.matingService.readMating(matingId).subscribe( mating =>{
        this.mating =  mating;
        this.birdsService.getBird(this.mating.idFather).subscribe( async father => {
          this.father =   father;
        });
        this.birdsService.getBird(this.mating.idMother).subscribe( mother =>{
          this.mother =  mother;
        });
      });
    }    

  }

  changeStatus(date: Date){
    let mating: Mating = {
      id: this.activatedRouter.snapshot.paramMap.get('id'),
      name: this.mating.name,
      idFather: this.mating.idFather,
      idMother: this.mating.idMother,
      dateInitMating: this.mating.dateInitMating,
      dateGale: date,
      dateFinalMating: this.mating.dateFinalMating,
      isMating: true
    } 
    this.matingService.updateMating(mating);
  }

}
