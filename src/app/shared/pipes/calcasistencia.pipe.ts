import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcasistencia'
})
export class CalcasistenciaPipe implements PipeTransform {

  transform(value: number,value2: number,value3: number): number {
    console.log("asistenciaFinal CALCULANDO");
    return value+value2+value3;
  }

}
