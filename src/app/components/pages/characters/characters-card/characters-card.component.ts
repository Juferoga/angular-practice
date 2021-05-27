import { Character } from '@app/shared/interfaces/data.interface';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LocalStorageService } from '@app/shared/service/localStorage.service';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {
  // Permite la comunicación padre e hijo por medio de decoradores, en este caso usamos Input
  @Input() character: Character;

  constructor(private localStorageSvc:LocalStorageService){

  }

  //getIcon(isFavorite:boolean): string{
    getIcon(): string{
    //return isFavorite? 'heart-solid.svg' : 'heart.svg'; // Ahorro de código
    return this.character.isFavorite? 'heart-solid.svg' : 'heart.svg'; // ternario: pregunta? si:no
  }

  toogleFavorite():void{
    const isFavorite = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorite;
    this.localStorageSvc.addOrRemoveFromFavorite(this.character);
  }
}
