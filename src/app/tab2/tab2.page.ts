import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { EggsService, Egg } from '../services/eggs.service';
import { Observable } from 'rxjs';
import {BirdsService, Bird } from '../services/birds.service';
import { Mating } from '../services/mating.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  public isSearchOpened = false;
  private eggs: Observable<Egg[]>;
  private coupleBirds: Observable<Mating[]>

  constructor(public navCtrl: NavController, private eggsService: EggsService, private birdService: BirdsService) {}

  
  ngOnInit() {
    this.coupleBirds = this.eggsService.getCouples();
    this.eggs = this.eggsService.getEggs();
  }
}
