import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  public isSearchOpened = false;
  constructor(public navCtrl: NavController) { }
  // click events //
  thumbClicked(event) {
    this.navCtrl.navigateForward('/info-bird');
  }

  fabClicked(event) {
    this.navCtrl.navigateForward('/create-bird');
  }

  fetchBirds(event) {
    console.log(event.target.value);
  }

}
