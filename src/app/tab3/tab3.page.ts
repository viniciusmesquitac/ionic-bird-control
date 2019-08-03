import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BirdsService, Mating} from '../services/birds.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{


  private matings: Observable<Mating[]>;

  constructor(public navCtrl: NavController, private birdsService: BirdsService) {}

  ngOnInit(){
    this.matings = this.birdsService.readMatings();
  }

  ButtonClick(){
    this.navCtrl.navigateForward('/info-mating');
  }

  addMating(){
    this.navCtrl.navigateForward('/add-mating');
  }

}
