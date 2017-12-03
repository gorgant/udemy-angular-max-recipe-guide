import * as firebase from 'firebase';

export class AuthService {
  // The auth() method gives us access to all the firebase auth methods
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }
}
