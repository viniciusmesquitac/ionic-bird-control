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
    console.log('thumb clicked');
  }

  fabClicked(event) {
  this.navCtrl.navigateForward('/create-bird');
  }

}
