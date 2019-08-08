import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MatingService, Mating} from '../services/mating.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{


  private matings: Observable<Mating[]>;

  constructor(public navCtrl: NavController, private matingService: MatingService) {}

  ngOnInit(){
    this.matings = this.matingService.readMatings();
  }

  ButtonClick(){
    this.navCtrl.navigateForward('/info-mating');
  }

  addMating(){
    this.navCtrl.navigateForward('/add-mating');
  }

}
