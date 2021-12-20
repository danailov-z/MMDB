import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class RatingService {
	constructor() {}

	updateRating(votes: number, rank: number, your_rank: number, operaton: boolean) {
		//operations: add (true), substract (false)
		let result: number;

		if (operaton) {
			result = ((votes * rank) + your_rank) / (votes + 1);
		} else {
			result = ((votes * rank) - your_rank) / (votes - 1);
		}

		return result;
	}
}
