import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { BirdsService, Bird } from '../services/birds.service';

@Component({
  selector: 'app-info-bird',
  templateUrl: './info-bird.page.html',
  styleUrls: ['./info-bird.page.scss'],
})
export class InfoBirdPage implements OnInit {

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

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.birdService.getBird(id).subscribe(bird => {
        this.bird = bird;
      });
    }
  }

  goBack(event) {
    this.navCtrl.pop();
  }

  updateBird() {
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

}
