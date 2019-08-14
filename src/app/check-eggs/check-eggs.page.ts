import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EggsService, Egg } from '../services/eggs.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Mating, MatingService } from '../services/mating.service';

@Component({
  selector: 'app-check-eggs',
  templateUrl: './check-eggs.page.html',
  styleUrls: ['./check-eggs.page.scss'],
})
export class CheckEggsPage implements OnInit {

  egg: Egg = {
    name: '',
    idFather: '',
    idMother: ''
  }

  mating: Mating = {
    name: '',
    idFather: '',
    idMother: '',
    dateInitMating: null,
    dateGale: null,
    dateFinalMating: null,
    generateEggs: false,
    isMating: false
  }

  private eggsFromCouple: Observable<Egg[]>

  constructor(public navCtrl: NavController, private eggService: EggsService, private matingService: MatingService, private activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    let matingId = this.activatedRouter.snapshot.paramMap.get('id');

    if (matingId) {
      this.matingService.readMating(matingId).subscribe(mating => {
        this.mating = mating;
        let id_father = this.mating.idFather
        let id_mother = this.mating.idMother
        console.log(id_father + "   " + id_mother)
        this.eggsFromCouple = this.eggService.getEggsbyCouple(id_father, id_mother);
      });
    }
  }

  goBack() {
    this.navCtrl.navigateBack('tabs/tab2')
    console.log("teste")
  }

}
