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

	selectedRating: number | null = null;

	ngOnInit(): void {}

	triggerEvent(item: number) {
		this.event.emit(item + 1);
	}

	getRank(value: number) {
		this.selectedRating = value;
	}

	vote() {
		this.triggerEvent(this.selectedRating!);
		this.bsModalRef.hide();
	}
}
