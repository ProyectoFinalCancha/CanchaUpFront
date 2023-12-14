import { Jugador } from "./jugador";

export class Equipo{

    id?:number;
    representanteId?: number;
    representante?: Jugador | null;
    jugadores?: Jugador[] | undefined;
    name?:string;
}
















    // representante!: Jugador;