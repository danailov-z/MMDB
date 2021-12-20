import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Stars } from '../rating/stars';

@Component({
	selector: 'app-star',
	templateUrl: './star.component.html',
	styleUrls: ['./star.component.scss'],
})
export class StarComponent implements OnInit {
	@Output() rank: EventEmitter<any> = new EventEmitter();
	
	rankingStars: Stars[];

	constructor() {}

	ngOnInit(): void {
		this.initStars();
	}

	initStars() {
		this.rankingStars = [];
		for (let star = 0; star < 10; star++) {
			this.rankingStars.push({ id: star, class: 'bi-star' });
		}
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

		this.rank.emit(value);
	}
}
