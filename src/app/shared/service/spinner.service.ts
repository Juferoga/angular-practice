import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SpinnerService{
    // creamos un nuevo observable en este cso de tipo Subject<booleano>
    isLoading$ = new Subject<boolean>();

    show():void{
        this.isLoading$.next(true);
    }

    hide():void{
        this.isLoading$.next(false);
    }

}