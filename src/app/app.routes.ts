import { Routes } from '@angular/router';
import { InformacionComponent } from './components/informacion/informacion.component';
import { AltaComponent } from './components/alta/alta.component';
import { ListadoComponent } from './components/listado/listado.component';
import { AcerdaDeComponent } from './acerda-de/acerda-de.component';
import { FuncionalidadesComponent } from './funcionalidades/funcionalidades.component';
import { MetodologiaComponent } from './metodologia/metodologia.component';
import { ProblemasComponent } from './problemas/problemas.component';

export const routes: Routes = [
  { path: '', component: InformacionComponent },
  { path: 'registro', component: AltaComponent },
  { path: 'listado', component: ListadoComponent },
    { path: 'AcercaDe', component: AcerdaDeComponent },
      { path: 'Funcionalidad', component: FuncionalidadesComponent },
  { path: 'metodologia', component: MetodologiaComponent },
    { path: 'problema', component: ProblemasComponent },
  { path: '**', redirectTo: '' }
];
