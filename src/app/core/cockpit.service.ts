import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, filter, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie, Ranking } from '../movies/movie';

@Injectable({
	providedIn: 'root',
})
export class CockpitService {
	constructor(private http: HttpClient) {}

	private APIget = `${environment.apiUrl}api/collections/get/${environment.moviesCollection}`;
	private APIsave = `${environment.apiUrl}api/collections/save/${environment.moviesCollection}`;
	private APIgetCategories = `${environment.apiUrl}api/collections/collection/${environment.moviesCollection}`;

	getMovies(): Observable<Movie> {
		return this.http.post<Movie>(this.APIget, { simple: true }).pipe(catchError(this.handleError));
	}

	updateMovieRank(data: Ranking): Observable<Movie> {
		return this.http.post<Movie>(this.APIsave, { data: data }).pipe(catchError(this.handleError));
	}

	saveMovie(data: Movie): Observable<Movie> { 
		return this.http.post<Movie>(this.APIsave, { data: data }).pipe(catchError(this.handleError));
	}

	getCategories(): Observable<any> {
		return this.http.post<any>(this.APIgetCategories, {}).pipe(
			map((node) => node.fields[1].options.options.split(', ')),
			catchError(this.handleError)
		);
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
