import { Jugador } from "./jugador";
import { EstadosPartido, Horarios } from "./partido";
export class Solicitud {
    id?: number;
    dia!: Date;
    horario!: { enumName: string; enumTitle: string; enumType: string };
    numeroCancha?: { enumName: string; enumTitle: string; enumType: string };
    precio!: number;
    estado!: {
        enumName: EstadosPartido;
        enumTitle: string;
        enumType: string;
    };
    edadPromedio!: number;
    jugador!: Jugador[] | null;
    telefono!: string | null;

    constructor() {
        this.estado = {
            enumName: EstadosPartido.MATCHMAKING,
            enumTitle: 'Matchmaking',
            enumType: 'domainapp.modules.simple.dom.partido.types.Estados',
        };
    }
}

export const HorariosEnumTitle: Record<Horarios, string> = {
    [Horarios._18_HS]: '18 HS',
    [Horarios._19_HS]: '19 HS',
    [Horarios._20_HS]: '20 HS',
    [Horarios._21_HS]: '21 HS',
    [Horarios._22_HS]: '22 HS',
    [Horarios._23_HS]: '23 HS',
};










// horario?: { enumName: string, enumTitle: string, enumType: string };