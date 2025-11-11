import { Component, OnInit, OnDestroy } from '@angular/core';
import { GanadoService } from '../../services/ganado.service'; 
import { Animal } from '../../models/animal'; 
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  standalone: true, 
  imports: [CommonModule, FormsModule, RouterLink], 
  providers: [DatePipe] 
})
export class ListadoComponent implements OnInit, OnDestroy {
  animales: Animal[] = [];
  animalesFiltrados: Animal[] = [];
  terminoBusqueda: string = '';
  
  private animalesSubscription!: Subscription;

  constructor(private ganadoService: GanadoService) { }

  ngOnInit(): void {
    this.animalesSubscription = this.ganadoService.animales$.subscribe(
      (data: Animal[]) => {
        this.animales = data;
        this.filtrarAnimales();
      }
    );
  }
  
  ngOnDestroy(): void {
    if (this.animalesSubscription) {
      this.animalesSubscription.unsubscribe();
    }
  }

  filtrarAnimales(): void {
    if (!this.terminoBusqueda.trim()) {
      this.animalesFiltrados = [...this.animales];
    } else {
      const termino = this.terminoBusqueda.toLowerCase();
      this.animalesFiltrados = this.animales.filter(animal => 
        animal.caravana.toLowerCase().includes(termino) ||
        animal.raza.toLowerCase().includes(termino) ||
        animal.estado.toLowerCase().includes(termino)
      );
    }
  }

  limpiarBusqueda(): void {
    this.terminoBusqueda = '';
    this.filtrarAnimales();
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-AR');
  }

  eliminar(caravana: string): void {
    if (confirm(`¿Está seguro de dar de BAJA (eliminar) al animal con Caravana N° ${caravana}?`)) { 
      this.ganadoService.eliminarAnimal(caravana);
    }
  }

  modificar(animal: Animal): void {
    this.ganadoService.solicitarModificacion(animal);
    // Redirigir a registro para modificar
    window.location.href = '/registro';
  }

}
