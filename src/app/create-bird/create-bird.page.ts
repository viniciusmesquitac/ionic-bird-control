import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-create-bird',
  templateUrl: './create-bird.page.html',
  styleUrls: ['./create-bird.page.scss'],
})
export class CreateBirdPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  goBack(event) {
    this.navCtrl.pop();
  }

  goBirdTab(event) {
    this.navCtrl.navigateForward('/tabs');
  }

  ngOnInit() {
  }

}
