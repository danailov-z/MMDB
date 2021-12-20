import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {

		const authReq = req.clone({
			setHeaders: {
				'Authorization': `Bearer ${environment.apiKey}`,
				'Content-type': 'application/json'
			},
		});

		return next.handle(authReq);
	}
}
