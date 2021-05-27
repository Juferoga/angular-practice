import { Character, Episode, DataResponse } from './../interfaces/data.interface';
import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import {take, tap} from 'rxjs/operators';
import { LocalStorageService } from './localStorage.service';

const QUERY = gql`
{
  episodes{
    results{
      name
      episode
    }
  }
  characters{
    results {
      id
      name
      status
      species
      gender
      image
    }
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  private episodesSubject = new BehaviorSubject<Episode[]>(null);
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<Character[]>(null);
  characters$ = this.charactersSubject.asObservable();

  constructor(private apollo:Apollo, private localStorageSvc:LocalStorageService) {
    this.getDataApi();
   }

  private getDataApi():void{
    this.apollo.watchQuery<DataResponse>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      // Estructuramos los datos que llegan desde el api
      tap(({data}) => {
        // Estructuramos otra vez en este caso episodios y personajes
        const {characters, episodes} = data;
        // nos sirven paara construir los observables
        this.episodesSubject.next(episodes.results);
        this.charactersSubject.next(characters.results);
        this.parseCharactersData(characters.results);
      })
    ).subscribe();
  }

  // no podemos trabajar sobre el mismo objeto que recibimos y tenemos que 
  // hacer uno nuevo al recibirlo
  private parseCharactersData(characters:Character[]):void {
    const currentFavs = this.localStorageSvc.getFavoriteCharacters();
    const newData = characters.map(character => {
      const found = !!currentFavs.find(( fav: Character) => fav.id === character.id);
      return { ...character, isFavorite: found};
    });

    this.charactersSubject.next(newData);
  }
}
