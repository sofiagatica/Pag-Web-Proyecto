import { Routes } from '@angular/router';
import { InformacionComponent } from './components/informacion/informacion.component';
import { AltaComponent } from './components/alta/alta.component';
import { ListadoComponent } from './components/listado/listado.component';

export const routes: Routes = [
  { path: '', component: InformacionComponent },
  { path: 'inicio', component: InformacionComponent },
  { path: 'registro', component: AltaComponent },
  { path: 'listado', component: ListadoComponent },
  { path: '**', redirectTo: '' }
];
