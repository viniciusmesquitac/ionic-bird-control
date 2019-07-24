import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Bird, BirdsService } from '../services/birds.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  public isSearchOpened = false;
  private birds: Observable<Bird[]>;

  constructor(public navCtrl: NavController, private birdService: BirdsService) { }

  ngOnInit() {
    this.birds = this.birdService.getBirds();
  }

  // click events //
  thumbClicked(event) {
    this.navCtrl.navigateForward('/info-bird');
  }

  fabClicked(event) {
    this.navCtrl.navigateForward('/create-bird');
  }

  fetchBirds(event) {
    this.birds = this.birdService.getBirds();
  }

  searchBirds(event) {
    console.log(event.target.value);
  }

}
