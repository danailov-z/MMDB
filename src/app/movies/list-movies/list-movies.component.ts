import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CockpitService } from 'src/app/core/cockpit.service';
import { Movie } from 'src/app/movies/movie';

@Component({
	selector: 'app-list-movies',
	templateUrl: './list-movies.component.html',
	styleUrls: ['./list-movies.component.scss'],
})
export class ListMoviesComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	errorMessage: any;
	constructor(private cockpitService: CockpitService) {}

	movies: Movie[];

	ngOnInit(): void {
		this.getMovies();
	}

	getMovies() {
		this.subscription = this.cockpitService.getMovies().subscribe({
			next: (data: any) => {
				this.movies = data;
			},
			error: (err) => (this.errorMessage = err),
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
