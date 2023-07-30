import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrorMessage'
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(error: { key: string, value: any }, ...args: unknown[]): unknown {
    
    const errorMessages: Record<string, string> = {
      required: 'Este campo es requerido',
      email: 'Debe ser un email valido',
      minlength: 'No cumple con la longitud minima requerida'
    };

    return errorMessages[error.key] || 'Campo invalido';
  }

}
