import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'selector',
        component: SelectorPageComponent
      },
      {
        path: '**',
        redirectTo: 'selector'
      }
    ]
  }
]

@NgModule({
  declarations: [
    SelectorPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class CountriesModule {}