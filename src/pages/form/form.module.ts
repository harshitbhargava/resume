import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormPage } from './form';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormPage,
    FormsModule
  ],
  imports: [
    IonicPageModule.forChild(FormPage),
  ],
})
export class FormPageModule {}
