import { Component } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore'
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/compat/app';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {





  /*public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];*/
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public templateList: Array<any>;


  constructor(
    private afStore: AngularFirestore,
    private alertController: AlertController,
  ) {
    afStore.collection('template').get().toPromise().then(snapshot=>{
      this.templateList = [];
      snapshot.docs.forEach(element=>{
      this.templateList.push({
          name: element.id,
          url: '/template/' + element.id,
          data: element.data()
        });
      })
      console.log(this.templateList);

    })
  }


  add(data){

    this.afStore.collection('template').doc(data.title).set({
      html: '',
      subject: data.subject
    });
   
  

  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Create new template',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Template title'
        },
        {
          name: 'subject',
          type: 'text',
          id: 'subject',
          value: 'a random subject',
          placeholder: 'email subject'
        },
      
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok');
            this.add(data);
          }
        }
      ]
    });

    await alert.present();
  }

}
