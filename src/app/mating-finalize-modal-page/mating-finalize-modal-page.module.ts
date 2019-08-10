import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MatingFinalizeModalPagePage } from './mating-finalize-modal-page.page';

const routes: Routes = [
  {
    path: '',
    component: MatingFinalizeModalPagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MatingFinalizeModalPagePage],
  entryComponents: [MatingFinalizeModalPagePage]
})

export class MatingFinalizeModalPagePageModule {}
