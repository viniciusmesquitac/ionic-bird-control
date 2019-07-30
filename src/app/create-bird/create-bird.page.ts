import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { BirdsService, Bird } from '../services/birds.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-bird',
  templateUrl: './create-bird.page.html',
  styleUrls: ['./create-bird.page.scss'],
})
export class CreateBirdPage implements OnInit {
  private birdsFemale: Observable<Bird[]>;
  private birdsMale: Observable<Bird[]>;
  public isFemale: Boolean = true;
  public isMale: Boolean = true;

  constructor(private navCtrl: NavController, private activatedRoute: ActivatedRoute, private birdService: BirdsService,
              private toastCtrl: ToastController, private router: Router) { }

  bird: Bird = {
    name: '',
    gender: '',
    couple: '',
    color: '',
    lineage: '',
    father: '',
    mother: '',
  };

  goBack(event) {
    this.navCtrl.pop();
  }

  goBirdTab(event) {
    this.router.navigateByUrl('/');
    this.navCtrl.navigateForward('/tabs');
  }

  ngOnInit() {
    // loading famale and male birds array.
    this.birdsMale = this.birdService.getMaleBirds();
    this.birdsFemale = this.birdService.getFemaleBirds();
  }

  addBird() {
    this.birdService.addBird(this.bird).then(() => {
      this.router.navigateByUrl('/');
      this.showToast('Pássaro adicionado!');
    }, err => {
      this.showToast('Ocorreu um erro ao adicionar, tente novamente.');
    });
  }

  selectCouple() {
    if (this.bird.gender == 'Female') {
      console.log("algo de certo esta correto")
      this.isMale = false;
      this.isFemale = true;
    }
    else {
      console.log("algo de certo esta errado")
      this.isFemale = false;
      this.isMale = true;
    }
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
