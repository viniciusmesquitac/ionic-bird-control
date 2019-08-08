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
  public male : Bird;
  public female : Bird;
  public mating: Mating;

  private maleBirds : Observable<Bird[]>;
  private femaleBirds : Observable<Bird[]>;
  private columnOptions : Bird[];

  constructor(private pickerCtrl: PickerController,
    private alertCtrl : AlertController,
    public navCtrl: NavController,
    private birdService: BirdsService,
    private matingService: MatingService) {}

  ngOnInit() {
    this.femaleBirds = this.birdService.getFemaleBirds();
    this.maleBirds = this.birdService.getMaleBirds();
    this.female = {
      name: '',
      gender: '',
      couple: '',
      color: '',
      lineage: '',
      father: '',
      mother: '',
    };
    this.male = {
      name: '',
      gender: '',
      couple: '',
      color: '',
      lineage: '',
      father: '',
      mother: '',
    };
  }

  async openPicker(type){
    if (type == 'female'){
      this.femaleBirds.subscribe(async birds => {
        this.columnOptions = await birds;
      });
    }
    else{
      this.maleBirds.subscribe(async birds =>{
        this.columnOptions = await birds;
      });
    }

    let confirm = false;

    const  picker = await this.pickerCtrl.create({
      columns : this.getColumns(1,this.columnOptions),
      buttons : [
        {
          text : 'cancel',
          role : 'cancel'
        },
        {
          text : 'Confirm',
          handler :  (value) =>{
            confirm = true;
          }
        }
      ]
    });

    await picker.present();
    picker.onDidDismiss().then(async data =>{
      if (confirm){
        let col = await picker.getColumn('col-0');
        if (type == 'female') this.female = this.columnOptions[col.selectedIndex] ;
        else this.male = this.columnOptions[col.selectedIndex];
      }
    });

  }

  
  getColumns(numOptions,columnOptions){
    console.log(''+columnOptions[0].name);
    let columns = [];
    columns.push({
      name: 'col-0',
      options: this.getColumnOptions(numOptions,columnOptions)
    });

    return columns;
  }

  getColumnOptions(numOptions,columnOptions){
    console.log(''+columnOptions[0].name);
    let options = [];
    for (let i = 0; i< numOptions; i++){
      options.push({
        text: columnOptions[i].name,
        value: i
      });
    }
    return options;
  }

  async recordMating(){
    if (this.male.name == '' || this.female.name == ''){
      const alert = await this.alertCtrl.create({
        header: 'Cuidado',
        message: 'É necessário escolher tanto o pássaro macho quanto a fêmea. Não deixe alguma opção em branco.',
        buttons:  ['Okay']
      });

      await alert.present();
    } 
    else{
      let confirm = false;
  
      const alert = await this.alertCtrl.create({
        header: 'Atenção',
        subHeader: 'Confirmação de acasalamento',
        message: 'Você tem certeza que quer acasalar estes dois pássaros?',
        buttons: [{
          text: 'Okay',
          handler: () =>{
            confirm = true;
          }
        },
        {
          text: 'Cancel',
          handler: () =>{
          }
        }]
      });
  
      await alert.present();
      await alert.onDidDismiss().then(async (data) =>{
        if(confirm){
          this.mating = {
            name : this.male.name + ' com ' + this.female.name,
            idFather: this.male.id,
            idMother: this.female.id,
            dateInitMating: new Date(),
            dateGale : null,
            dateFinalMating : null,
            isMating : false
          };
          this.matingService.createMating(this.mating);
          const confirmAlert = await this.alertCtrl.create({
            header: 'Sucesso',
            message: 'Parabéns,'+ this.male.name +' e ' + this.female.name + ' começaram a acasalar.',
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
