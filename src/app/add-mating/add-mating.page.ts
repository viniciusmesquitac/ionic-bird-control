import { Component, OnInit } from '@angular/core';
import { PickerController, AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { BirdsService, Bird } from '../services/birds.service';
import { MatingService, Mating } from '../services/mating.service';
import { Observable } from 'rxjs'

@Component({
  selector: 'app-add-mating',
  templateUrl: './add-mating.page.html',
  styleUrls: ['./add-mating.page.scss'],
})

export class AddMatingPage implements OnInit {
  private maleName : string;
  private femaleName: string;

  mating: Mating = {
    name : '',
      idFather: '',
      idMother: '',
      dateInitMating:  new Date(),
      dateGale : null,
      dateFinalMating : null,
      generateEggs: false,
      isMating : false
  }

  private maleBirds : Observable<Bird[]>;
  private femaleBirds : Observable<Bird[]>;

  constructor(private pickerCtrl: PickerController,
    private alertCtrl : AlertController,
    public navCtrl: NavController,
    private birdService: BirdsService,
    private matingService: MatingService) {}

  ngOnInit() {
    this.femaleBirds = this.birdService.getFemaleBirds();
    this.maleBirds = this.birdService.getMaleBirds();
    this.maleName = '';
    this.femaleName = '';
  }

  selectMale(){
    this.birdService.getBird(this.mating.idFather).subscribe(async bird =>{
      this.maleName = await bird.name;
    });
  }

  selectFemale(){
    this.birdService.getBird(this.mating.idMother).subscribe(async bird=> {
      this.femaleName = await bird.name;
    });
  }

  async recordMating(){
    if (this.mating.idFather == '' || this.mating.idMother == ''){
      const alert = await this.alertCtrl.create({
        header: 'Atenção',
        message: 'Preencha todos os campos',
        buttons:  ['OK']
      });

      await alert.present();
    } 
    else{
      let confirm = false;
  
      const alert = await this.alertCtrl.create({
        header: 'Atenção',
        message: 'Você tem certeza que quer acasalar estes dois pássaros?',
        buttons: [
          {
          text: 'CANCELAR',
          handler: () =>{
          }
        },
        {
        text: 'SIM',
          handler: () =>{
            confirm = true;
          }
        }]
      });
  
      await alert.present();
      await alert.onDidDismiss().then(async (data) =>{
        if(confirm){
          this.mating.name = this.maleName+ " com " + this.femaleName;
          this.matingService.createMating(this.mating);
          const confirmAlert = await this.alertCtrl.create({
            header: 'Sucesso',
            message: 'Parabéns, '+ this.mating.name + ' agora estão juntos!',
            buttons: [{
              text: 'Okay',
              handler: ()=> {
                this.navCtrl.navigateForward('/tabs');
              }
            }]
          });

          await confirmAlert.present();
        }
      });
      }
    }
  
}
