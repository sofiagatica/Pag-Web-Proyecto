// src/app/services/ganado.service.ts

import { Injectable } from '@angular/core';
import { Animal } from '../models/animal'; 
import { BehaviorSubject, Observable, Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class GanadoService {

  // Lista privada con datos iniciales (simulados)
  private animales: Animal[] = this.getDatosIniciales();

  // BehaviorSubject: permite a los componentes "suscribirse" a la lista para que se actualice automáticamente
  private animalesSubject = new BehaviorSubject<Animal[]>(this.animales);
  
  // Observable público: es la fuente de datos que los componentes consumen
  public animales$: Observable<Animal[]> = this.animalesSubject.asObservable();

  // Subject para comunicar cuando se quiere modificar un animal
  private modificarAnimalSubject = new Subject<Animal>();
  public modificarAnimal$: Observable<Animal> = this.modificarAnimalSubject.asObservable();

  constructor() { }

  // ----------------------------------------------------
  // Funciones CRUD (ABM)
  // ----------------------------------------------------

  // ALTA (C - Create)
  agregarAnimal(nuevoAnimal: Omit<Animal, 'fechaNacimiento'> & {fechaNacimiento: string}): void {
    const animal: Animal = {
      ...nuevoAnimal,
      fechaNacimiento: new Date(nuevoAnimal.fechaNacimiento) // Convierte la fecha de string a Date
    };
    this.animales.push(animal);
    this.animalesSubject.next(this.animales); // Notifica el cambio
  }

  // BAJA (D - Delete)
  eliminarAnimal(caravana: string): void {
    this.animales = this.animales.filter(a => a.caravana !== caravana);
    this.animalesSubject.next(this.animales); // Notifica el cambio
  }

  // MODIFICACIÓN (U - Update)
  modificarAnimal(animalModificado: Animal): void {
    const index = this.animales.findIndex(a => a.caravana === animalModificado.caravana);
    if (index > -1) {
      this.animales[index] = animalModificado;
      this.animalesSubject.next(this.animales);
    }
  }

  // Método para notificar que se quiere modificar un animal
  solicitarModificacion(animal: Animal): void {
    this.modificarAnimalSubject.next(animal);
  }

  // ----------------------------------------------------
  // Datos de Prueba
  // ----------------------------------------------------
  private getDatosIniciales(): Animal[] {
    return [
      {
        caravana: 'A-00123',
        tipo: 'bovino',
        raza: 'Aberdeen Angus',
        fechaNacimiento: new Date('2023-01-15'),
        peso: 350.5,
        estado: 'Sano',
        observaciones: 'Lote 1, excelente genética.'
      },
      {
        caravana: 'B-00456',
        tipo: 'bovino',
        raza: 'Brahman',
        fechaNacimiento: new Date('2022-10-20'),
        peso: 480.0,
        estado: 'Vacunación Pendiente',
        observaciones: 'Requiere vacuna antiaftosa.'
      }
    ];
  }
}