import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesModule } from './movies/movies.module';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
	{ path: 'movies', loadChildren: () => import('./movies/movies.module').then((m) => m.MoviesModule) },
	{ path: 'add-movie', loadChildren: () => import('./movies/movies.module').then((m) => m.MoviesModule) },
	{ path: '', component: WelcomeComponent, pathMatch: 'full' },
	{ path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes), MoviesModule],
	exports: [RouterModule],
})
export class AppRoutingModule {}
