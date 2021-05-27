
// Eliminamos onInit ya que no necesitamos llamar al archivo html
// Ya que no existe :)
import { Component} from '@angular/core';
import { DataService } from '@app/shared/service/data.service';
import { LocalStorageService } from '@app/shared/service/localStorage.service';

@Component({
  selector: 'app-characters-list',
  template: `
  <section class="character__list">
      <!-- comunicación entre padre e hijo, utilizando [character] al input de characters card -->
      <app-characters-card *ngFor="let character of characters$ | async" [character]="character">
      </app-characters-card>
  </section>
  `,
  styleUrls: ['./characters-list.component.scss']
})
export class CharactersListComponent {
  // Definición del observable, a partir del servicio creado
  characters$ = this.dataSvc.characters$;
  constructor(private dataSvc: DataService, private localStorageSvc: LocalStorageService) { }
}
