import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { GanadoService } from '../../services/ganado.service';
import { Animal } from '../../models/animal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css'],
  standalone: true, 
  imports: [FormsModule, CommonModule] 
})
export class AltaComponent implements OnInit, OnDestroy {
  nuevoAnimal: any = {
    caravana: '',
    tipo: 'bovino', 
    raza: '',
    fechaNacimiento: '', 
    peso: null,
    estado: 'Sano', 
    observaciones: ''
  };

  razasDisponibles = ['Aberdeen Angus', 'Brahman', 'Hereford', 'Otros'];
  estadosDisponibles = ['Sano', 'En Tratamiento', 'Vacunación Pendiente', 'Observación'];
  
  isModifying = false;
  animalToModify: Animal | null = null;
  private modificarSubscription?: Subscription;

  constructor(private ganadoService: GanadoService) { }

  ngOnInit(): void {
    // Suscribirse a eventos de modificación desde el servicio
    this.modificarSubscription = this.ganadoService.modificarAnimal$.subscribe(
      (animal: Animal) => {
        this.cargarAnimalParaModificar(animal);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.modificarSubscription) {
      this.modificarSubscription.unsubscribe();
    }
  }

  onSubmit(form: any): void {
    if (form.valid) {
      if (this.isModifying && this.animalToModify) {
        // Modificar animal existente
        const animalModificado: Animal = {
          ...this.nuevoAnimal,
          fechaNacimiento: new Date(this.nuevoAnimal.fechaNacimiento),
          caravana: this.animalToModify.caravana // Mantener la caravana original
        };
        this.ganadoService.modificarAnimal(animalModificado);
        alert(`¡Animal ${animalModificado.caravana} Modificado Exitosamente!`);
      } else {
        // Agregar nuevo animal
        this.ganadoService.agregarAnimal(this.nuevoAnimal);
        alert(`¡Animal ${this.nuevoAnimal.caravana} Registrado Exitosamente!`);
      }
      
      // Reinicia el formulario y vuelve al modo ALTA
      this.resetFormAndMode(form);
    }
  }

  resetFormAndMode(form: any): void {
    form.reset();
    this.nuevoAnimal = {
      caravana: '',
      tipo: 'bovino',
      raza: '',
      fechaNacimiento: '',
      peso: null,
      estado: 'Sano',
      observaciones: ''
    };
    this.isModifying = false;
    this.animalToModify = null;
  }

  // Método para cargar datos de un animal para modificación
  cargarAnimalParaModificar(animal: Animal): void {
    this.animalToModify = animal;
    this.nuevoAnimal = {
      caravana: animal.caravana,
      tipo: animal.tipo,
      raza: animal.raza,
      fechaNacimiento: animal.fechaNacimiento.toISOString().split('T')[0], // Convertir Date a string YYYY-MM-DD
      peso: animal.peso,
      estado: animal.estado,
      observaciones: animal.observaciones || ''
    };
    this.isModifying = true;
    
    // Scroll al formulario
    const elemento = document.getElementById('sistema');
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }

  get botonTexto(): string {
    return this.isModifying 
      ? `Guardar Modificación para ${this.animalToModify?.caravana || ''}` 
      : 'Registrar Nuevo Animal (Alta)';
  }

  get botonClase(): string {
    return this.isModifying ? 'btn-submit modifying' : 'btn-submit';
  }
}