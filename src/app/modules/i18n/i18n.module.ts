import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { I18nRoutingModule } from './i18n-routing.module';
import { I18nComponent } from './i18n.component';
import { AddComponent } from './dialogs/add/add.component';
import { UpdateComponent } from './dialogs/update/update.component';
import { DeleteComponent } from './dialogs/delete/delete.component';
import { DeleteAllComponent } from './dialogs/delete-all/delete-all.component';
import { AddMultipleComponent } from './dialogs/add-multiple/add-multiple.component';


@NgModule({
  declarations: [I18nComponent, AddComponent, UpdateComponent, DeleteComponent, DeleteAllComponent, AddMultipleComponent],
  imports: [
    CommonModule,
    I18nRoutingModule,
    SharedModule
  ]
})
export class I18nModule { }
