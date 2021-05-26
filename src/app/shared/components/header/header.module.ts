import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';

// Exportamos para poder utilizarlo en toda la aplicacion.

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [ 
    HeaderComponent
  ]
})
export class HeaderModule { }
