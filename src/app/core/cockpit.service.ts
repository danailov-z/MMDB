import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, Ranking } from './movie';

@Injectable({
	providedIn: 'root',
})
export class CockpitService {
	constructor(private http: HttpClient) {}

	private APIget = `${environment.apiUrl}api/collections/get/${environment.moviesCollection}`;
	private APIsave = `${environment.apiUrl}api/collections/save/${environment.moviesCollection}`;

	getMovies(): Observable<Movie> {
		return this.http.post<Movie>(this.APIget, { simple: true }).pipe(catchError(this.handleError));
	}

	updateMovieRank(data: Ranking): Observable<Movie> {
		console.log(data);
		return this.http.post<Movie>(this.APIsave, { data: data }).pipe(catchError(this.handleError));
	}

	private handleError(err: HttpErrorResponse) {
		let errorMessage = '';
		if (err.error instanceof ErrorEvent) {
			errorMessage = `An error occured: ${err.error.message}`;
		} else {
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		}
		console.log(errorMessage);
		return throwError(() => errorMessage);
	}
}
