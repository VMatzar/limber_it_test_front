import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private afa = inject(AngularFireAuth);

  createUser(email: string, password: string): Promise<any> {
    return this.afa.createUserWithEmailAndPassword(email, password);
  }
  login(email: string, password: string) {
    return this.afa.signInWithEmailAndPassword(email, password);
  }
  logout() {
    return this.afa.signOut();
  }
  hasUser() {
    return this.afa.authState;
  }
  getUserInformation() {
    return this.afa.user;
  }
}
