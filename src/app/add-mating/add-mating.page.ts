import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-add-mating',
  templateUrl: './add-mating.page.html',
  styleUrls: ['./add-mating.page.scss'],
})
export class AddMatingPage implements OnInit {
  macho = '';
  femea = '';
  defaultColumnOptions = [
    [
      'dog',
      'cat',
      'fish',
      'bird',
      'lizard'
    ]
  ];

  constructor(private pickerCtrl: PickerController, public navCtrl: NavController) {
  }

  ngOnInit() {
  }

  async openPicker(type = 'femea',numColumns = 1,numOptions = 5,columnOptions = this.defaultColumnOptions){
    const picker = await this.pickerCtrl.create({
      columns : this.getColumns(numColumns,numOptions,columnOptions),
      buttons : [
        {
          text : 'cancel',
          role : 'cancel'
        },
        {
          text : 'Confirm',
          handler : (value) =>{
            console.log('Got value $(value)');
          }
        }
      ]
    });
    await picker.present();
    picker.onDidDismiss().then(async data =>{
      let col = await picker.getColumn('col-0');
      if (type == 'macho'){
        this.macho = col.options[col.selectedIndex].text;
      } else{
        this.femea = col.options[col.selectedIndex].text;
      }
    });
  }

  getColumns(numColumns,numOptions,columnOptions){
    let columns = [];
    for (let i = 0; i<numColumns; i++){
      columns.push({
        name: 'col-0',
        options: this.getColumnOptions(i,numOptions,columnOptions)
      });
    }
    return columns;
  }

  getColumnOptions(columnIndex,numOptions,columnOptions){
    let options = [];
    for (let i = 0; i< numOptions; i++){
      options.push({
        text: columnOptions[columnIndex][i % numOptions],
        value: i
      });
    }
    return options;
  }

  recordMating(){
    this.navCtrl.navigateForward('/tabs');
  }

}
