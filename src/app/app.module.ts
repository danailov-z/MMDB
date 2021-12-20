import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/auth.interceptor';
import { NavigationComponent } from './core/navigation/navigation.component';
import { MoviesModule } from './movies/movies.module';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
	declarations: [AppComponent, NavigationComponent, WelcomeComponent],
	imports: [BrowserModule, AppRoutingModule, HttpClientModule, MoviesModule, CommonModule],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
