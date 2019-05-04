import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionTypes, Item } from './store/item.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ims';
  body: Item
  signForm: FormGroup
  mTitle = ''
  modal = true
  items$: Observable<[]>;
  constructor(private store: Store<[]>, public fb: FormBuilder) {
    this.createForm()
    this.items$ = store.pipe(select('items'));

  }

  createForm(title = '') {
    this.mTitle = title
    this.signForm = this.mTitle != 'Buy Item' ? this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.compose([
        Validators.required,
        Validators.min(1)
      ])],
      Qty: ['', Validators.compose([
        Validators.required,
        Validators.min(1)
      ])]
    }) : this.fb.group({
      name: ['', Validators.required],
      value: [''],
      Qty: ['', Validators.compose([
        Validators.required,
        Validators.min(1)
      ])]
    })
    return this.signForm
  }



  exec(title: ActionTypes) {
    try {
      this.body = this.signForm.value
      this.mTitle = title
      this.store.dispatch({ type: title, body: this.body })
    } catch (error) {
      console.log(error)
    }

  }
}
