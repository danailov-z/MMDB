import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMoviesComponent } from './movies/list-movies/list-movies.component';

const routes: Routes = [
	{ path: '', component: ListMoviesComponent, pathMatch: 'full' },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
