import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'go-tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'bird', loadChildren: './create-bird/create-bird.module#CreateBirdPageModule' },
  { path: 'bird/:id', loadChildren: './info-bird/info-bird.module#InfoBirdPageModule' },
  { path: 'mating/:id', loadChildren: './info-mating/info-mating.module#InfoMatingPageModule' },
  { path: 'couple/:id', loadChildren: './check-eggs/check-eggs.module#CheckEggsPageModule' },
  { path: 'add-mating', loadChildren: './add-mating/add-mating.module#AddMatingPageModule' },
  { path: 'check-eggs', loadChildren: './check-eggs/check-eggs.module#CheckEggsPageModule' },
  { path: 'egg/:id', loadChildren: './info-egg/info-egg.module#InfoEggPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
