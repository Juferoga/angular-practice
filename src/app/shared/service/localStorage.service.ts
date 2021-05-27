import { Injectable } from "@angular/core";

const MY_FAVORITES = "myFavorites";

@Injectable({
   providedIn: 'root' 
})

export class LocalStorageService{

    constructor(){
        this.initialStorage();
    }

    private initialStorage():void {  // prepara el camino para usar local storage
        const currents = JSON.parse(localStorage.getItem(MY_FAVORITES)); // actuales si exite
        if(!currents){ // si existen datos
            localStorage.setItem(MY_FAVORITES, JSON.stringify([])); 
        }
    }
}