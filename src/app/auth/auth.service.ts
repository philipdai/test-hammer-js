import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';

import { Store } from '@ngrx/store';
import { User } from './user.model';
import { Wedding } from '../shared/models/wedding.model';
import { AuthData } from './auth-data.model';

import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService {
  private fbSubs: Subscription[] = [];

  constructor(private router: Router,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/gifts']);
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(user: User) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        this.addDataToDatabase({
          userId: result.uid,
          name: user.name,
          role: user.role,
          email: user.email,
          password: user.password
        });
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 5000);
      })
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Auth.SetUserIdLoggedIn(result.uid));
        this.getUser(result.uid);
        this.getDefaultWedding(result.uid);
      })
      .catch(error => {
        this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar(error.message, null, 5000);
      });
  }

  getUser(userId: string) {
    this.fbSubs.push(
      this.db
        .collection('users')
        .doc(userId)
        .valueChanges()
        .subscribe(user => {
          this.store.dispatch(new Auth.SetUserLoggedIn(<User> user));
        })
    )
  }

  getDefaultWedding(userId: string) {
    this.fbSubs.push(
      this.db
        .collection('weddings', ref => {
          return ref.where(`usersSetDefault.${userId}`, '==', true)
        })
        .stateChanges()
        .map(items => {
          console.log('items: ', items);
          return { id: items[0].payload.doc.id, ...items[0].payload.doc.data() }
        })
        .subscribe(wedding => {
          console.log('wedding: ', wedding);
          this.store.dispatch(new Auth.SetDefaultWedding(<Wedding> wedding));
        })
    );
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  private addDataToDatabase(user: User) {
    this.db.collection('users').doc(user.userId).set(user);
    this.db.collection('weddings').add({
      ownerId: user.userId,
      name: `${user.name}'s Wedding'`,
      users: {[user.userId]: user},
      usersSetDefault: {[user.userId]: true}
    });
  }

}
