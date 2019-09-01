import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Bird, BirdsService } from '../services/birds.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit {
  public isSearchOpened = false;
  public text = '';
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

  filterList(event) {
    this.birds = this.birdService.getBirds();
    var typed = event.target.value

    if (!typed) {
      return;
    }
    
    this.birds = this.birds.pipe(
      map(result => {
        return result.filter(bird => {
          if(bird.name.toLowerCase().indexOf(typed.toLowerCase()) > -1){
            return true;
          }
          return false;
        })
      })
    )
  }

  refreshBirds(event) {
    this.text = event.target.value;
    if (this.text.length !== 0) {
      this.birdService.searchBird(''); // passing filter.length == 0
      this.birds = this.birdService.getBirds();
    }
  }
}
