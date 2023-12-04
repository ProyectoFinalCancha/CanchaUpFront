import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MetodoHorariosService {
  constructor(private http: HttpClient) {}

  async checkHorarioDisponible(dia: string): Promise<string[]> {
    const horarios = ["_18_HS", "_19_HS", "_20_HS", "_21_HS", "_22_HS", "_23_HS"];
    const horariosDisponibles: string[] = [];

    for (const horario of horarios) {
      try {
        const data = await this.existePartido(dia, horario);
        if (data.value === true) {
          horariosDisponibles.push(horario);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    return horariosDisponibles;
  }

  private existePartido(dia: string, horario: string): Promise<any> {
    const url = "http://localhost:8080/restful/services/simple.PartidoServices/actions/existePartido3/invoke";

    const headers = new HttpHeaders({
      Authorization: "Basic c3ZlbjpwYXNz",
      Accept: "application/json;profile=urn:org.apache.causeway/v2",
      "Content-Type": "application/json",
    });

    const body = {
      horarioS: {
        value: horario,
      },
      diaS: {
        value: dia,
      },
    };

    return this.http.post(url, body, { headers }).toPromise();
  }
}
