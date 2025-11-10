import { Component } from '@angular/core';
import { ListadoComponent } from './components/listado/listado.component';
import { AltaComponent } from './components/alta/alta.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    InformacionComponent,
    AltaComponent,
    ListadoComponent,
    FooterComponent,
    CommonModule
  ], 
})
export class AppComponent {
  title = 'gestion-ganado-agrosoft';
}