import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoMatingPage} from './info-mating.page';
import { MatingFinalizeModalPagePage } from '../mating-finalize-modal-page/mating-finalize-modal-page.page';

const routes: Routes = [
  {
    path: '',
    component: InfoMatingPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfoMatingPage]
})
export class InfoMatingPageModule {}
