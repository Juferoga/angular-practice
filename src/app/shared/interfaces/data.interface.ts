export interface APIResponse<T>{ // Concepto de Generics en typeScript, se pone la T por convención
    results: T; 
}
export interface DataResponse{ // Utilizamos varios tipados
    characters: APIResponse<Character[]>; // Definimos un arreglo de personajes
    episodes: APIResponse<Episode[]>; // Definimos un arreglo de episodios
}
export interface Episode{
    name : string;
    episode : string;
}
export interface Character{
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    isFavorite?: boolean; //se pone el ? si el campo es opcional, casi que no ;)
}