import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MccColorPickerComponent } from './color-picker.component';
import { EMPTY_COLOR, MccColorPickerService } from '.';

describe('MccColorPickerComponent', () => {
  let comp: MccColorPickerComponent;
  let fixture: ComponentFixture<MccColorPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OverlayModule, PortalModule],
      declarations: [MccColorPickerComponent],
      providers: [
        MccColorPickerService,
        { provide: EMPTY_COLOR, useValue: 'none' },
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ]
    });

    TestBed.overrideComponent(MccColorPickerComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });

    fixture = TestBed.createComponent(MccColorPickerComponent);

    comp = fixture.componentInstance;
  });

  /*afterEach(() => { fixture.destroy(); });

  it('should open color-picker', () => {
    const button = fixture.debugElement.query(By.css('.btn-picker'));
    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(comp.isOpen).toBeTruthy();
  });*/

});
