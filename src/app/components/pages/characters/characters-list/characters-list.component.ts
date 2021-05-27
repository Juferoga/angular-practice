
// Eliminamos onInit ya que no necesitamos llamar al archivo html
// Ya que no existe :)
import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject} from '@angular/core';
// importamos HostListener
import { DataService } from '@app/shared/service/data.service';
import { LocalStorageService } from '@app/shared/service/localStorage.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-characters-list',
  template: `
  <section class="character__list" 
    infiniteScroll (scrolled)="onScrollDown()"
  >
      <!-- comunicación entre padre e hijo, utilizando [character] al input de characters card -->
      <app-characters-card *ngFor="let character of characters$ | async" [character]="character">
      </app-characters-card>
      <button *ngIf="showButton" (click)="onScrollTop()" class="button">⬆️</button>
  </section>
  `,
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
  // Definición del observable, a partir del servicio creado
  characters$ = this.dataSvc.characters$;
  showButton:boolean=false;

  private scrollHeight = 500;
  private pageNum = 1;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private dataSvc: DataService) { }
  // Usamos ahora el decorador @hostListener el cual se utiliza para escuchar un evento del DOM y se ejecuta cuando vamos a
  // utilizar ese evento.
  // eg. @HostListener(`window:scroll`)
  @HostListener(`window:scroll`)
  onWindowScroll(): void {
    const yOffSet = window.pageYOffset;
    const scrollTop = this.document.documentElement.scrollTop;
    this.showButton = (yOffSet || scrollTop) > this.scrollHeight;
  }

  onScrollTop():void{
    this.document.documentElement.scrollTop = 0;
  }

  onScrollDown():void{
    this.pageNum++;
    this.dataSvc.getCharactersByPage(this.pageNum);
  }

}
