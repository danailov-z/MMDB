import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { CockpitService } from 'src/app/core/cockpit.service';
import { Validators } from '@angular/forms';
import { Movie } from '../movie';
import { Router } from '@angular/router';

@Component({
	selector: 'app-add-movie',
	templateUrl: './add-movie.component.html',
	styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit, OnDestroy {
	private subscription: Subscription;
	selectedRating: number;
	errorMessage: any;
	movieCategories$: Observable<string[]>;
	selectedCategories: string[];

	constructor(private cockpitService: CockpitService, private fb: FormBuilder, private router: Router) {}

	addMovieForm = this.fb.group({
		title: ['', Validators.required],
		date: ['', Validators.required],
		selectedCategories: [],
		boxoffice: [''],
	});

	ngOnInit(): void {
		this.movieCategories$ = this.cockpitService.getCategories();
	}

	getRank(value: number) {
		this.selectedRating = value + 1;
	}

	onOpenCalendar(container: any) {
		container.yearSelectHandler = (event: any): void => {
			container._store.dispatch(container._actions.select(event.date));
		};
		container.setViewMode('year');
	}

	saveMovie(movie: Movie) {
		this.subscription = this.cockpitService.saveMovie(movie).subscribe({
			next: () => {
				this.router.navigate(['']);
			},
			error: (err) => (this.errorMessage = err),
		});
	}

	onSubmit() {
		const movie = {
			name: this.addMovieForm.value.title,
			category: this.addMovieForm.value.selectedCategories,
			release_date: new Date(this.addMovieForm.value.date).getFullYear().toString(),
			box_office: this.addMovieForm.value.boxoffice,
			votes: this.selectedRating ? 1 : 0,
			rank: this.selectedRating,
			your_rank: this.selectedRating,
		};

		this.saveMovie(movie);
	}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}