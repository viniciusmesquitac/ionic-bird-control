import { Component, OnInit } from '@angular/core';
import { Egg, EggsService } from '../services/eggs.service';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BirdsService, Bird } from '../services/birds.service';

@Component({
  selector: 'app-info-egg',
  templateUrl: './info-egg.page.html',
  styleUrls: ['./info-egg.page.scss'],
})
export class InfoEggPage implements OnInit {

  egg: Egg = {
    name: '',
    idFather: '',
    idMother: '',
  }

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

  bird: Bird = {
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


  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute, private eggService: EggsService,
    private toastCtrl: ToastController, private router: Router, public alertController: AlertController, private birdService: BirdsService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.eggService.getEgg(id).subscribe(egg => {
        this.egg = egg;
        this.fetchBirds(egg)
      });
    }
  }

  goBack(event) {
    this.navCtrl.pop();
  }

  updateEgg() {
    this.eggService.updateEgg(this.egg).then(() =>{
      this.showToast('Pássaro Atualizado!');
    }, err => {
      this.showToast('Ocorreu um erro ao adicionar, tente novamente.');
    });
  }

  deleteBird() {
    this.eggService.deleteEgg(this.egg.id).then(() =>{
      this.router.navigateByUrl('/')
      this.showToast('Pássaro Deletado!');
    }, err => {
      this.showToast('Ocorreu um erro ao deletar, tente novamente.');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

  fetchBirds(egg: Egg){
      this.birdService.getBird(egg.idFather).subscribe( father => {
        this.father = father;
      });

      this.birdService.getBird(egg.idMother).subscribe( mother =>{
        this.mother = mother;
      });
  }

  async deleteAlert() {
    const alert = await this.alertController.create({
      header: 'Exclusão',
      message: 'Você tem certeza que deseja <strong>deletar</strong> este pássaro?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          }, {
          text: 'Deletar',
          handler: () => {
            this.deleteBird();
          }
        }
      ]
    });

    await alert.present();
  }
}
