import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider
{
    private user: firebase.User;

    constructor(public auth: AngularFireAuth)
    {
        auth.authState.subscribe((user: firebase.User) => this.user = user);
    }

    get authenticated(): boolean
    {
        return this.user != null;
    }

    loginWithFacebook()
    {
        return this.auth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }

    logout():void
    {
        this.auth.auth.signOut();
    }

    get nameUser():string
    {
        return this.user ? this.user.displayName : '';
    }
}
