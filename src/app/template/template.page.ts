import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  AngularFirestore
} from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit {

  public templateName: string;
  public template: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private afStore: AngularFirestore,
  ) {
    // Your editable element
    const div = document.querySelector('div[contenteditable="true"]');

    // Stylo
    const stylo: any = document.querySelector('stylo-editor');

    // Set the `containerRef` property
    stylo.containerRef = div;

  }

  ngOnInit() {
    this.templateName = this.activatedRoute.snapshot.paramMap.get('id');
    this.getTemplate(this.templateName).then(snapshot => {
      console.log(snapshot.data());
      this.template = snapshot.data();
      document.getElementById('htmlpreview').innerHTML = this.template.html;
    });
  }

  getTemplate(id: string) {
    return this.afStore.collection('template').doc(id).get().toPromise();
  }
}
