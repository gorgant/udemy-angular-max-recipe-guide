import * as firebase from 'firebase';

export class AuthService {
  token: string;
  // The auth() method gives us access to all the firebase auth methods
  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        response => {
          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
        }
      )
      .catch(
        error => console.log(error)
      );
  }

  getToken() {
    // This is an asynchronous call because not only does it fetch from local storage (synchronous)
    // ... it also pings Firebase server to ensure the token hasn't expired
    // ... if expired we'd need to implement some error handling to get the user to try again
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );
    return this.token;
  }
}
