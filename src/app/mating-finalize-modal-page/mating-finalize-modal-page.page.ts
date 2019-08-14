import { Component, OnInit, Input } from '@angular/core';
import { NavController, ToastController, ModalController } from '@ionic/angular';
import { EggsService, Egg } from '../services/eggs.service';
import { ActivatedRoute } from '@angular/router';
import { MatingService, Mating } from '../services/mating.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mating-finalize-modal-page',
  templateUrl: './mating-finalize-modal-page.page.html',
  styleUrls: ['./mating-finalize-modal-page.page.scss'],
})
export class MatingFinalizeModalPagePage implements OnInit {

  
  egg: Egg = {
    name: '',
    idFather: '',
    idMother: '',
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
  private idFather: string;
  private idMother: string;
  private idMating: string;
  private amount: number;

  constructor(private modalController: ModalController, private navCtrl: NavController,private toastCtrl: ToastController, private eggsService: EggsService, private matingService: MatingService,
    public activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.idFather, this.idMother)
  }

  dismissModal() {
     this.modalController.dismiss()
  }

  createEggs() {
    if(this.amount <= 0) {
      this.showToast("o número de ovos precisa ser maior que 0")
    } else {
      for (let index = 0; index < this.amount; index++) {
        this.egg.name = `Ovo ${index}`
        console.log(this.idFather)
        this.egg.idFather = this.idFather
        this.egg.idMother = this.idMother
        this.eggsService.addEgg(this.egg);
      }

      this.showToast(`${this.amount} ovos criados com sucesso!`)
      this.navCtrl.navigateRoot(`couple/${this.idMating}`)
      this.modalController.dismiss()
    }
  }


  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 1000
    }).then(toast => toast.present());
  }
}
