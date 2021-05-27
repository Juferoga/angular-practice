import { Character } from '@app/shared/interfaces/data.interface';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {
  // Permite la comunicación padre e hijo por medio de decoradores, en este caso usamos Input
  @Input() character: Character;
}
