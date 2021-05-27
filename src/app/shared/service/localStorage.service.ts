import { NotFoundRoutingModule } from './../../components/pages/notFound/not-found-routing.module';
import { Character } from '@app/shared/interfaces/data.interface';
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

const MY_FAVORITES = "myFavorites";

@Injectable({
   providedIn: 'root' 
})

export class LocalStorageService{
    private charactersFavSubject = new BehaviorSubject<Character[]>(null); // arreglo de personajes leidos
    charactersFav$ = this.charactersFavSubject.asObservable(); // los define como observables

    constructor( private toastrSvc : ToastrService){
        this.initialStorage();
    }

    addOrRemoveFromFavorite(character: Character):void{
        const {id} = character; // estructurando el id que recibimos
        const currentsFav = this.getFavoriteCharacters(); // recuperamos los favoritos
        const found= !!currentsFav.find((fav:Character)=> fav.id === id); // con find(JS)
                  // !! convierten la variable a booleano
        // Busca la primera coincidencia con el id de los registros que llegan
        found ? this.removeFromFavorite(id) : this.addToFavorite(character);
        // ternario si existe lo eleimna. si no lo agrega
    }
    
    private addToFavorite(character:Character):void{
        try {
            const currentFav = this.getFavoriteCharacters();
            localStorage.setItem(MY_FAVORITES,JSON.stringify([...currentFav,character]));
            this.charactersFavSubject.next([...currentFav,character]);
            this.toastrSvc.success(`${character.name} añadido a favoritos correctamente`, 'Rick & Morty App');
        } catch (error) {
            console.log('Error al guardar en el local storage', error);
            this.toastrSvc.error(`Error al guardar en el local storage ${error}`, 'Rick & Morty App');
        }
    } 
    
    private removeFromFavorite(id: number):void{
        try {
            const currentFav = this.getFavoriteCharacters();
            const characters = currentFav.filter(item => item.id !== id);
            localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
            this.charactersFavSubject.next([...characters]);
            this.toastrSvc.warning(`Personaje eliminado de favoritos`, 'Rick & Morty App');
        } catch (error) {
            console.log('Error al borrar en el local storagee', error);
            this.toastrSvc.error(`Error al borrar en el local storage ${error}`, 'Rick & Morty App');
        }
    }

    getFavoriteCharacters():any{
        try {
            const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES));
            this.charactersFavSubject.next(charactersFav);
            return charactersFav;
        } catch (error) {
            console.log('Error al traer los favoritos de local',error);
            this.toastrSvc.error(`Error al traer los favoritos de local ${error}`, 'Rick & Morty App');
        }
    }

    clearStorage():void{
        try {
            localStorage.clear();
        } catch (error) {
            console.log('Error al limpiar el localStorage',error);
            this.toastrSvc.error(`Error al limpiar en el local storage ${error}`, 'Rick & Morty App');
        }
    }

    private initialStorage():void {  // prepara el camino para usar local storage
        const currents = JSON.parse(localStorage.getItem(MY_FAVORITES)); // actuales si exite
        if(!currents){ // si existen datos
            localStorage.setItem(MY_FAVORITES, JSON.stringify([])); 
        }
        this.getFavoriteCharacters();
    }
}
