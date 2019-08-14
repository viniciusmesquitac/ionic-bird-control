import { Component, OnInit, Input } from '@angular/core';
import { BirdsService, Bird } from '../services/birds.service';
import { MatingService, Mating} from '../services/mating.service';
import { NavController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MatingFinalizeModalPagePage } from '../mating-finalize-modal-page/mating-finalize-modal-page.page';
import { generate } from 'rxjs';

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
    anilha:'',
    anilhado: false,
  };
  
  mother: Bird = {
    name: '',
    gender: '',
    couple: '',
    color: '',
    lineage: '',
    father: '',
    mother: '',
    anilha:'',
    anilhado: false,
  };

  mating: Mating = {
    name : '',
    idFather: '',
    idMother: '',
    dateInitMating: null,
    dateGale : null,
    dateFinalMating : null,
    isMating : false,
    generateEggs: false,
  }
  
  constructor(private navCtrl: NavController, private activatedRouter: ActivatedRoute, private birdsService: BirdsService,
    private toastCtrl: ToastController, private router: Router, private matingService: MatingService, private alertCtrl : AlertController,
    public modalController: ModalController, public alertController: AlertController) {}

  ngOnInit() {
    let matingId = this.activatedRouter.snapshot.paramMap.get('id');
    if (matingId){
      this.matingService.readMating(matingId).subscribe( mating =>{
        this.mating = mating;
        this.birdsService.getBird(this.mating.idFather).subscribe( async father => {
          this.father = father;
        });
        this.birdsService.getBird(this.mating.idMother).subscribe( mother =>{
          this.mother = mother;
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
      isMating: true,
      generateEggs: false
    } 
    this.matingService.updateMating(mating);
  }

  async deleteMating(){
    let confirm = false;
    const alert = await this.alertCtrl.create({
      header: 'Atenção!',
      message: 'Você realmente deseja deletar este acasalamento?',
      buttons:[{
        text : 'NÃO',
        role: 'cancel'
      },{
        text: 'SIM',
        handler:() => {
          confirm = true;
        }
      }]
    });

    await alert.present();
    alert.onDidDismiss().then( data =>{
      if(confirm){
        this.matingService.deleteMating(this.mating);
        this.navCtrl.navigateForward('/tabs');
      }
    });
  }

  finishMating() {
      this.FinalizeAlert()
  }

  async FinalizeAlert() {
    const alert = await this.alertController.create({
      header: '',
      message: 'Essa reprodução gerou ovos?',
      buttons: [
        {
          text: 'NÃO',
          handler: () => {
            this.showToast("Aguarde a reprodução gerar ovos :)");
          },
          cssClass: 'secondary',
          }, {
          text: 'SIM',
          handler: () => {
            this.presentModal();
          }
        }
      ]
    });

    await alert.present();
  }

  
  async presentModal() {
    const modal = await this.modalController.create({
      component: MatingFinalizeModalPagePage,
      componentProps: {
        'idMother': this.mother.id,
        'idFather': this.father.id,
        'idMating': this.mating.id
      }
    });
    return await modal.present();
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 1000
    }).then(toast => toast.present());
  }

}