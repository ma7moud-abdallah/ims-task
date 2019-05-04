import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { StoreModule, Store } from '@ngrx/store';
import { itemReducer } from './store/item.reducer';
import { ActionTypes, Item } from './store/item.actions'


describe('AppComponent', () => {
  let store: Store<Item[]>
  let component: AppComponent
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ items: itemReducer })
      ],

    }).compileComponents();
    component = new AppComponent(store = TestBed.get(Store), new FormBuilder)
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ims'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('ims');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to ims!');
  });
  it('should create form with three controls', () => {
    expect(component.signForm.contains('name')).toBeTruthy()
    expect(component.signForm.contains('value')).toBeTruthy()
    expect(component.signForm.contains('value')).toBeTruthy()
  })
  it('should create form with three required controls (name,value,Qty)', () => {
    let name = component.signForm.get('name')
    let value = component.signForm.get('value')
    let Qty = component.signForm.get('Qty')
    name.setValue('')
    value.setValue('')
    Qty.setValue('')
    expect(name.valid).toBeFalsy()
    expect(value.valid).toBeFalsy()
    expect(Qty.valid).toBeFalsy()
  })
  describe('createForm function', () => {
    it('should create form with only 2 required controls(name,Qty) if it called with Buy Item arg', () => {
      let name = component.signForm.get('name')
      let value = component.signForm.get('value')
      let Qty = component.signForm.get('Qty')
      name.setValue('')
      value.setValue('')
      Qty.setValue('')
      const { controls } = component.createForm('Buy Item')
      expect(controls.name.valid).toBeFalsy()
      expect(controls.value.valid).toBeTruthy()
      expect(controls.Qty.valid).toBeFalsy()
    })
    it('should create form with three required controls (name,value,Qty)', () => {
      let name = component.signForm.get('name')
      let value = component.signForm.get('value')
      let Qty = component.signForm.get('Qty')
      name.setValue('')
      value.setValue('')
      Qty.setValue('')
      expect(name.valid).toBeFalsy()
      expect(value.valid).toBeFalsy()
      expect(Qty.valid).toBeFalsy()
    })

  })
  describe('exec function', () => {
    it('should call store.dispatch function with the action payload', () => {
      component.signForm.controls.name.setValue('A')
      component.signForm.controls.value.setValue(1)
      component.signForm.controls.Qty.setValue(1)
      component.exec(ActionTypes.Add)
      let payload = { type: ActionTypes.Add, body: component.body }
      expect(store.dispatch).toHaveBeenCalledWith(payload)
    })
  })
});
