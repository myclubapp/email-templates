import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  AngularFirestore
} from '@angular/fire/compat/firestore'
import firebase from 'firebase/compat/app';

import '@papyrs/stylo';

@Component({
  selector: 'app-template',
  templateUrl: './template.page.html',
  styleUrls: ['./template.page.scss'],
})
export class TemplatePage implements OnInit {
  @ViewChild('styloeditor', {
    static: true
  }) stylo: ElementRef;
  @ViewChild('htmlpreview', {
    static: true
  }) preview: ElementRef;
  //@ViewChild('div[contenteditable="true"]', {static: false}) content: ElementRef;


  public templateName: string;
  public template: any = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private afStore: AngularFirestore,
  ) {

  }

  ngOnInit() {}

  ngAfterViewInit() {

    this.templateName = this.activatedRoute.snapshot.paramMap.get('id');
    this.getTemplate(this.templateName).then(snapshot => {

      // TODO: ngAfterViewInit or something, when stylo web components is loaded / mounted (class .hydrated should be applied for example) then assign values
      // Set the `containerRef` property
      this.template = snapshot.data();

      this.preview.nativeElement.innerHTML = this.template.html;
      this.stylo.nativeElement.containerRef = this.preview;
      //document.getElementById('htmlpreview').innerHTML = this.template.html;
    });

  }


  getTemplate(id: string) {
    return this.afStore.collection('template').doc(id).get().toPromise();
  }

  saveHTML() {
    this.afStore.collection('template').doc(this.templateName).set({
      html: this.preview.nativeElement.innerHTML
    }, {
      merge: true
    });

  }


}
