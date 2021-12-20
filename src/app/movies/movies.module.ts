import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RatingComponent } from '../shared/rating/rating.component';
import { StarComponent } from '../shared/star/star.component';
import { MovieComponent } from './movie/movie.component';



@NgModule({
	declarations: [
		ListMoviesComponent,
		MovieComponent,
		RatingComponent,
		AddMovieComponent,
		StarComponent,
	],
	imports: [
		RouterModule.forChild([
			{ path: 'movies', component: ListMoviesComponent },
			{ path: 'add-movie', component: AddMovieComponent },
		]),

		ReactiveFormsModule,
		ModalModule.forChild(),
		TooltipModule.forRoot(),
		BsDatepickerModule.forRoot(),
		BrowserAnimationsModule,
		NgSelectModule,
		FormsModule,
	],
	providers: [],
})
export class MoviesModule {}