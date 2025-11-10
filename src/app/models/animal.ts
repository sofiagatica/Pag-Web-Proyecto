// src/app/models/animal.ts

// Interfaz que define la estructura de un animal en la base de datos
export interface Animal {
    caravana: string;
    tipo: 'bovino' | 'ovino' | 'caprino'; // Tipos de ganado permitidos
    raza: string;
    fechaNacimiento: Date;
    peso: number;
    estado: string;
    observaciones?: string; // Opcional
}