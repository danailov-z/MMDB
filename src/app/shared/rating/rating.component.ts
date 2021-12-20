import { Component, EventEmitter, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Stars } from './stars';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
	constructor(public bsModalRef: BsModalRef) {}

	public event: EventEmitter<any> = new EventEmitter();
	rankingStars: Stars[] = [];
	selectedRating: number | null = null;

	initStars() {
		for (let star = 0; star < 10; star++) {
			this.rankingStars.push({ id: star, class: 'bi-star' });
		}
	}

	ngOnInit(): void {
		this.initStars();
		console.log(this.rankingStars);
	}

	selectRank(value: number): void {
		this.rankingStars.filter((star) => {
			if (star.id <= value) {
				star.class = 'bi-star-fill';
			} else {
				star.class = 'bi-star';
			}

			return star;
		});

		this.selectedRating = value;
	}

	triggerEvent(item: number) {
		this.event.emit(item + 1);
	}

	vote() {
		this.triggerEvent(this.selectedRating!);
		this.bsModalRef.hide();
	}
}
