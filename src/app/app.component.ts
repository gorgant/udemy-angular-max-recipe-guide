import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    // This expects to receive a javascript object form the backend as an argument
    // See Firebase -> authentication -> sign-in method -> web setup for the key and domain
    firebase.initializeApp({
      apiKey: 'AIzaSyDnO2CU_041AmhSfzPYLJwA_D_qTiebhyc',
      authDomain: 'udemy-ng-recipe-book-83029.firebaseapp.com'
    });
  }

}


