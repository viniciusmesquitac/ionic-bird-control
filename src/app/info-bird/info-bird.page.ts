import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-info-bird',
  templateUrl: './info-bird.page.html',
  styleUrls: ['./info-bird.page.scss'],
})
export class InfoBirdPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  goBack(event) {
    this.navCtrl.pop();
  }

}
