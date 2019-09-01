import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BirdsService, Bird } from '../services/birds.service';
import { Observable } from 'rxjs';
import { MatingService } from '../services/mating.service';

@Component({
  selector: 'app-info-bird',
  templateUrl: './info-bird.page.html',
  styleUrls: ['./info-bird.page.scss'],
})
export class InfoBirdPage implements OnInit {

  private birdsFemale: Observable<Bird[]>;
  private birdsMale: Observable<Bird[]>;
  public isFemale: Boolean;
  public isMale: Boolean;

  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute, private birdService: BirdsService,
    private toastCtrl: ToastController, private router: Router, public alertController: AlertController, private matingService : MatingService) { }

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
    matings: [],
  };

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.birdService.getBird(id).subscribe(bird => {
        this.bird = bird;
      });
    }
    this.birdsMale = this.birdService.getMaleBirds();
    this.birdsFemale = this.birdService.getFemaleBirds();

    if (this.bird.gender=="Female") {this.isFemale=true} else {this.isMale=true}
  }

  goBack(event) {
    this.navCtrl.pop();
  }

  updateBird() {
    if(this.bird.anilha != '') {
      this.bird.anilhado = true;
    }
    this.birdService.updateBird(this.bird).then(() =>{
      this.showToast('Pássaro Atualizado!');
    }, err => {
      this.showToast('Ocorreu um erro ao adicionar, tente novamente.');
    });
  }

  deleteBird() {
    this.birdService.deleteBird(this.bird.id).then(() =>{
      this.router.navigateByUrl('/')
      this.showToast('Pássaro Deletado!');

      this.deleteMating();
      
    }, err => {
      this.showToast('Ocorreu um erro ao deletar, tente novamente.');
    });
  }

  
  selectCouple() {
    if (this.bird.gender == 'Female') {
      console.log("the bird change to female")
      this.isMale = false;
      this.isFemale = true;
      this.birdsMale = this.birdService.getMaleBirds();
    
    }
    else {
      console.log("the bird change to male")
      this.isFemale = false;
      this.isMale = true;
      this.birdsFemale = this.birdService.getFemaleBirds();
    }
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
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

  deleteMating(){
    this.bird.matings.forEach(mating => {
      this.matingService.deleteMatingById(mating);
    });
  }

}
