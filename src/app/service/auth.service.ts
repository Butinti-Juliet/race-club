// import { Injectable } from '@angular/core';
// import * as firebase from 'firebase';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }

  
 
  
  
// }
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, AlertController, LoadingController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user: Observable<User>;

  selectedFile = null;
  uploadPercent: any;
  downloadU: any;
  uniqkey: any;
  today: any = new Date();
  date = this.today.getDate() + "" + (this.today.getMonth() + 1) + "" + this.today.getFullYear();
  time = this.today.getHours() + "" + this.today.getMinutes();
  dateTime = this.date + "" + this.time;

  progress
  constructor(
    private afs: AngularFirestore,
    private nav: NavController,
    public afAuth: AngularFireAuth,
    private alertCtrl: AlertController,
    private storage: AngularFireStorage,
    private file: File,
    public loadingCtrl: LoadingController
  ) {
    afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.nav.navigateRoot("home");
      } else {
        this.nav.navigateRoot("");
      }
    })
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )
  }



  async login(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password).then((success) => {
      console.log(success);
    }).catch((err) => {
      this.alertCtrl.create({
        // message: 'You can not order more than six',
        subHeader: err.message,
        buttons: ['Ok']
      }).then(
        alert => alert.present()
      );
    })
  }

  async signup(email, password) {
    const loading = this.loadingCtrl.create({
      message: 'Signing up, Please wait...'
    });
    (await loading).present();
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(async (success) => {

      console.log(success);
      (await loading).dismiss();

    }).catch(async (err) => {

      (await loading).dismiss();
      
      this.alertCtrl.create({
        subHeader: err.message,
        buttons: ['Ok']
      }).then(
        alert => alert.present()
      );

    })
  }

  async sendPasswordResetEmail(passwordResetEmail: string) {
    return await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  async logout() {
    await this.afAuth.auth.signOut().then((success) => {
      console.log(success);
      console.log("success");
      this.nav.navigateRoot("login");
    }).catch((error) => {
      console.log(error)
    })
  }

  getUsers() {
    return this.afs.collection('users', ref => ref.orderBy('displayName')).valueChanges()
  }
  getUID(): string {
    return this.afAuth.auth.currentUser.uid;
  }
  

 

  

  


     


}

