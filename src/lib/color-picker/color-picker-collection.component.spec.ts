import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';
import { MccColorPickerOptionDirective } from './color-picker.directives';
import { EMPTY_COLOR } from './color-picker';

describe('MccColorPickerCollectionComponent', () => {
  let comp: MccColorPickerCollectionComponent;
  let fixture: ComponentFixture<MccColorPickerCollectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MccColorPickerCollectionComponent, MccColorPickerOptionDirective],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true },
        { provide: EMPTY_COLOR, useValue: 'none' }
      ]
    });

    // overide change detection strategy
    TestBed.overrideComponent(MccColorPickerCollectionComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });

    fixture = TestBed.createComponent(MccColorPickerCollectionComponent);
    comp = fixture.componentInstance;
    comp.ngAfterContentChecked();
  });

  afterEach(() => { fixture.destroy(); });

  it('should have default label', () => {
    const label = fixture.nativeElement.querySelector('h3');
    expect(label.textContent).toEqual('');
  });


  it('should change default label', () => {
    const text = 'My Collection';
    comp.label = text;

    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('h3');
    expect(label.textContent).toEqual(text);
  });

  it('should hide transparent option', () => {
    const transparentColor = fixture.nativeElement.querySelector('.mcc-color-picker-remove-color');
    expect(transparentColor).toBeNull();
  });

  it('should show transparent option', () => {
    comp.transparent = true;

    fixture.detectChanges();

    const transparentColor = fixture.nativeElement.querySelector('.mcc-color-picker-remove-color'); 
    expect(transparentColor).not.toBeNull();
  });

  it('should render 30 colors', () => {
    comp.colors = ['#FFFFFF', '#000000'];

    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.directive(MccColorPickerOptionDirective));
    expect(options.length).toEqual(30);
  });

  it('should render 10 colors', () => {
    comp.size = 10;
    comp.colors = ['#FFFFFF', '#000000'];

    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.directive(MccColorPickerOptionDirective));
    expect(options.length).toEqual(10);
  });

  it('should render 2 colors', () => {
    comp.hideEmpty = true;
    comp.colors = ['#FFFFFF', '#000000'];

    fixture.detectChanges();

    const options = fixture.debugElement.queryAll(By.directive(MccColorPickerOptionDirective));
    expect(options.length).toEqual(2);
  });

  it('should select transparent color', (done: DoneFn) => {
    comp.transparent = true;

    fixture.detectChanges();

    comp.changeColor.subscribe(color => {
      expect(color).toEqual('none');
      done();
    });

    const transparentColor = fixture.debugElement.query(By.css('.mcc-color-picker-remove-color'));
    transparentColor.triggerEventHandler('click', null);
  });

  it('should select white color', (done: DoneFn) => {
    comp.colors = ['#FFFFFF', '#000000'];

    fixture.detectChanges();

    comp.changeColor.subscribe(color => {
      expect(color).toEqual('#FFFFFF');
      done();
    });

    const option = fixture.debugElement.query(By.directive(MccColorPickerOptionDirective));
    option.triggerEventHandler('click', null);
  });

  it('should select black color', (done: DoneFn) => {
    comp.colors = [{ text: 'black', value: '#000000' }, { text: 'white', value: '#FFFFFF'}];

    fixture.detectChanges();

    comp.changeColor.subscribe(color => {
      expect(color).toEqual('#000000');
      done();
    });

    const option = fixture.debugElement.query(By.directive(MccColorPickerOptionDirective));
    option.triggerEventHandler('click', null);
  });

});
