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
  private birdMale: Bird;
  private birdFemale: Bird;

  mating: Mating = {
    name : '',
      idFather: '',
      idMother: '',
      dateInitMating:  new Date(),
      dateGale : null,
      dateFinalMating : null,
      generateEggs: false,
      isMating : false,
      idCage: '',

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
  }

  selectMale(){
    this.birdService.getBird(this.mating.idFather).subscribe(async bird =>{
      this.birdMale = await bird;
    });
  }

  selectFemale(){
    this.birdService.getBird(this.mating.idMother).subscribe(async bird=> {
      this.birdFemale = await bird;
    });
  }

  async recordMating(){
    if (this.mating.idFather == '' || this.mating.idMother == '' || this.mating.idCage == ''){
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

          if(this.matingExist()){
            const declineAlert = await this.alertCtrl.create({
              header: 'Atenção',
              message: 'Estes pássaros ja estão juntos, porfavor escolha outros pássaros',
              buttons: ['Okay']
            });

            await declineAlert.present();
          }else{
              this.mating.name = this.birdMale.name + " com " + this.birdFemale.name;
              this.matingService.createMating(this.mating);
              
              this.updateBirds();
              
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

        }
      });
      }
    }

    matingExist(){
      let exist: boolean; 
      this.matingService.readMatingByCouple(this.birdMale.id,this.birdFemale.id).subscribe( matings =>{
        if(matings.length > 0){
          exist = true;                 
        }else{
          exist = false;
        }
      });
      console.log(exist);
      return exist;
    }

    updateBirds(){
      this.matingService.readMatingByCouple(this.birdMale.id, this.birdFemale.id).subscribe( matings =>{  
        matings.forEach(mating => {
            console.log(mating.id);
            this.birdMale.matings.push(mating.id);
            this.birdFemale.matings.push(mating.id);
            this.birdService.updateBird(this.birdMale);
            this.birdService.updateBird(this.birdFemale);
        });      
      });
    }
}
