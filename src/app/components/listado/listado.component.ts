import { Component, OnInit, OnDestroy } from '@angular/core';
import { GanadoService } from '../../services/ganado.service'; 
import { Animal } from '../../models/animal'; 
import { CommonModule, DatePipe } from '@angular/common';
import { Subscription } from 'rxjs'; // Importar Subscription

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  // 1. Marcar como Standalone
  standalone: true, 
  // 2. Incluir CommonModule para directivas como *ngFor, *ngIf
  imports: [CommonModule], 
  providers: [DatePipe] 
})
export class ListadoComponent implements OnInit, OnDestroy { // Implementar OnDestroy

  // La variable que recibe los datos (conectada al servicio)
  animales: Animal[] = [];
  
  // Variable para manejar la suscripción y evitar fugas de memoria
  private animalesSubscription!: Subscription;

  constructor(private ganadoService: GanadoService) { }

  ngOnInit(): void {
    // CORRECCIÓN CLAVE: Nos suscribimos al Observable para recibir y actualizar la lista en tiempo real.
    this.animalesSubscription = this.ganadoService.animales$.subscribe(
      (data: Animal[]) => {
        // Asigna el nuevo valor emitido por el Observable a la lista local
        this.animales = data;
      }
    );
  }
  
  // Limpiar la suscripción cuando el componente se destruye
  ngOnDestroy(): void {
    if (this.animalesSubscription) {
      this.animalesSubscription.unsubscribe();
    }
  }

  // Función para formatear la fecha a un formato legible
  // NOTA: Se recomienda usar el pipe 'date' directamente en el HTML en lugar de esta función.
  formatearFecha(fecha: Date): string {
    // La fecha del modelo es un string, hay que asegurarnos de que se formatee si es necesario.
    return new Date(fecha).toLocaleDateString('es-AR');
  }

  // Lógica del botón ELIMINAR (llama a la función del servicio)
  eliminar(caravana: string): void {
    if (confirm(`¿Está seguro de dar de BAJA (eliminar) al animal con Caravana N° ${caravana}?`)) { 
      this.ganadoService.eliminarAnimal(caravana);
    }
  }

  // Lógica del botón MODIFICAR - notifica al servicio para que el AltaComponent cargue los datos
  modificar(animal: Animal): void {
    this.ganadoService.solicitarModificacion(animal);
  }

}