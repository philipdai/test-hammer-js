import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
import { MaterialModule } from './material.module';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';

import { UIService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { environment } from '../environments/environment';

export class MyHammerConfig extends HammerGestureConfig {
	overrides = <any>{
		swipe: { velocity: 0.4, threshold: 20 }, // override default settings
	};
}

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		AppRoutingModule,
		FlexLayoutModule,
		AngularFireModule.initializeApp(environment.firebase),
		AuthModule,
		AngularFirestoreModule,
		EffectsModule.forRoot([]),
		StoreModule.forRoot(reducers),
		StoreDevtoolsModule.instrument({
			maxAge: 20, // number of states to retain
		}),
	],
	declarations: [ AppComponent, WelcomeComponent, HeaderComponent, SidenavListComponent ],
	bootstrap: [ AppComponent ],
	providers: [
		AuthService,
		UIService,
		{
			provide: HAMMER_GESTURE_CONFIG,
			useClass: MyHammerConfig,
		},
	],
})
export class AppModule {}
