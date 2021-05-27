import { Injectable } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import {take, tap} from 'rxjs/operators';

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
      origin{
        name
      }
      location{
        name
      }
      image
    }
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private episodesSubject = new BehaviorSubject<any[]>(null);
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<any[]>(null);
  characters$ = this.charactersSubject.asObservable();

  constructor(private apollo:Apollo) {
    this.getDataApi();
   }

  private getDataApi():void{
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({data}) => {
        const {characters, episodes} = data;
        this.episodesSubject.next(episodes.results);
        this.charactersSubject.next(characters.results);
      })
    ).subscribe();
  }
}
