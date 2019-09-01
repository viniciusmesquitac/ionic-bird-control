import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
})
export class LoginPagePage implements OnInit {

  private email: string;
  private password: string;

  constructor(public authFirebase: AngularFireAuth,
     private navCtrl: NavController,
     private alertCtrl : AlertController) { }

  ngOnInit() {

  }


  async loginUser() {
    try {
      const result = await this.authFirebase.auth.signInWithEmailAndPassword(this.email,this.password)
      if(result) {
        this.navCtrl.navigateRoot('go-tabs')
      }
    } catch (error) {
      this.alertError();
    }
      
  }

  async alertError() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: 'Senha incorreta',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          }
        ]
    });
    
    await alert.present();
  }

}
