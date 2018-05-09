import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MccColorPickerCollectionComponent } from './color-picker-collection.component';

describe('MccColorPickerCollectionComponent', () => {
  let comp: MccColorPickerCollectionComponent;
  let fixture: ComponentFixture<MccColorPickerCollectionComponent>;
  let label: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MccColorPickerCollectionComponent],
    });

    fixture = TestBed.createComponent(MccColorPickerCollectionComponent);
    comp = fixture.componentInstance;

    // screen elements
    label = fixture.debugElement.query(By.css('h3')).nativeElement;
  });

  it('should display original label', () => {
    fixture.detectChanges();
    expect(label.textContent).toContain(comp.label);
  });

  it('should display changed label', () => {
    comp.label = 'Test Label';
    fixture.detectChanges();
    expect(label.textContent).toContain('Test Label');
  });
});
