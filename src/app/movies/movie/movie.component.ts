import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie, Ranking } from 'src/app/core/movie';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { RatingComponent } from 'src/app/shared/rating/rating.component';
import { CockpitService } from 'src/app/core/cockpit.service';
import { Subscription } from 'rxjs';
import { RatingService } from 'src/app/shared/rating.service';

@Component({
	selector: 'app-movie',
	templateUrl: './movie.component.html',
	styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
	@Input() movie: Movie;
	@Output() update: EventEmitter<any> = new EventEmitter();
	errorMessage: any;
	rankStars: string[] = [];
	bsModalRef?: BsModalRef;
	private subscription: Subscription;

	constructor(
		private modalService: BsModalService,
		private cockpitService: CockpitService,
		private ratingService: RatingService
	) {}

	ngOnInit(): void {
		if (this.movie.your_rank) {
			this.buildRankStars();
		}
	}

	openRatingModal() {
		this.bsModalRef = this.modalService.show(RatingComponent, { class: 'modal-dialog-centered' });
		this.bsModalRef.content.event.subscribe((rank: number) => {
			this.updateRank(this.movie, rank);
		});
	}

	buildRankStars() {
		for (let star = 1; star < 11; star++) {
			if (star <= this.movie.your_rank) {
				this.rankStars.push('bi-star-fill');
			} else {
				this.rankStars.push('bi-star');
			}
		}
	}

	resetRank(movie: Movie) {
		const newRank = this.ratingService.updateRating(+movie.votes, +movie.rank, +movie.your_rank, false);
		const data: Ranking = {
			_id: movie._id,
			rank: newRank,
			votes: +movie.votes - 1,
			your_rank: null,
		};

		this.subscription = this.cockpitService.updateMovieRank(data).subscribe({
			next: () => {
				this.update.emit(null);
			},
			error: (err) => (this.errorMessage = err),
		});
	}

	updateRank(movie: Movie, userRank: number) {
		const newRank = this.ratingService.updateRating(+movie.votes, +movie.rank, +userRank, true);
		const data: Ranking = {
			_id: movie._id,
			rank: newRank,
			votes: +movie.votes + 1,
			your_rank: userRank,
		};

		this.subscription = this.cockpitService.updateMovieRank(data).subscribe({
			next: () => {
				this.update.emit(null);
			},
			error: (err) => (this.errorMessage = err),
		});
	}
}
