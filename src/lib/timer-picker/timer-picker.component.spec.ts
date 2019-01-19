import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { MccTimerPickerComponent } from '../../../src/lib/timer-picker/timer-picker.component';

describe('MccTimerPickerComponent', () => {
  let comp: MccTimerPickerComponent;
  let fixture: ComponentFixture<MccTimerPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PortalModule, OverlayModule],
      declarations: [MccTimerPickerComponent],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });

    TestBed.overrideComponent(MccTimerPickerComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });

    fixture = TestBed.createComponent(MccTimerPickerComponent);

    comp = fixture.componentInstance;
    comp.isOpen = true;
  });

  afterEach(() => { fixture.destroy(); });

  it('should open timer-picker', () => {
    expect(comp.isOpen).toBeTruthy();
  });

  it('should have default button labels', () => {
    const btnConfirm = fixture.nativeElement.querySelector('[aria-label="Confirm"]');
    const btnCancel = fixture.nativeElement.querySelector('[aria-label="Cancel"]');

    expect(btnConfirm.textContent.trim()).toEqual('Ok');
    expect(btnCancel.textContent.trim()).toEqual('Cancel');
  });

  it('should change button labels', () => {
    const confirmLabel = 'Confirm';
    const cancelLabel = 'Abort';

    comp.btnConfirm = confirmLabel;
    comp.btnCancel = cancelLabel;

    fixture.detectChanges();

    const btnConfirm = fixture.nativeElement.querySelector('[aria-label="Confirm"]');
    const btnCancel = fixture.nativeElement.querySelector('[aria-label="Cancel"]');

    expect(btnConfirm.textContent.trim()).toEqual(confirmLabel);
    expect(btnCancel.textContent.trim()).toEqual(cancelLabel);
  });

  it('should hide buttons', () => {
    comp.hideButtons = true;

    fixture.detectChanges();

    const actions = fixture.nativeElement.querySelector('.mcc-timer-picker-actions');
    expect(actions).toBeNull();
  });


  it('should emit time with hide buttons', () => {
    comp.hideButtons = true;

    fixture.detectChanges();

    const btnPeriod = fixture.debugElement.queryAll(By.css('.mcc-timer-picker-am-pm button'))[1];
    btnPeriod.triggerEventHandler('click', null);

    fixture.detectChanges();

    comp.confirmSelectedTime();
  });

  it('should return 13:00 am with hide buttons', () => {
    comp.hideButtons = true;

    comp.selected.subscribe(selected => {
      expect(selected).toBe('1:00 am');
    })

    const btnHour = fixture.debugElement.query(By.css('#option-2'));
    btnHour.triggerEventHandler('click', null);
  });

  it('should cancel de selection', () => {
    comp.cancelSelection();

    expect(comp.isOpen).toBeFalsy();
  });

  it('should return selected hour 12:00 am with a backdrop click', () => {
    comp.selected.subscribe(selected => {
      expect(selected).toBe('12:00 am');
    });
    comp.backdropClick();
  });

  it('should return selected hour 12:30 am', () => {
    const btnHour = fixture.debugElement.query(By.css('#option-0'));
    btnHour.triggerEventHandler('click', null);

    fixture.detectChanges();

    const btnMin = fixture.debugElement.query(By.css('#option-11'));
    btnMin.triggerEventHandler('click', null);

    comp.selected.subscribe(selected => {
      expect(selected).toEqual('12:30 am');
    });
    comp.confirmSelectedTime();
  });

  it('should return selected hour 1:45 pm', () => {
    const btnPeriod = fixture.debugElement.queryAll(By.css('.mcc-timer-picker-am-pm button'))[1];
    btnPeriod.triggerEventHandler('click', null);

    fixture.detectChanges();

    const btnHour = fixture.debugElement.query(By.css('#option-2'));
    btnHour.triggerEventHandler('click', null);

    fixture.detectChanges();

    const btnMin = fixture.debugElement.query(By.css('#option-5'));
    btnMin.triggerEventHandler('click', null);

    comp.selected.subscribe(selected => {
      expect(selected).toEqual('1:45 pm');
    });
    comp.confirmSelectedTime();
  });

  it('should return selected hour 23:50', () => {
    comp.format = '24';

    const btnPeriod = fixture.debugElement.queryAll(By.css('.mcc-timer-picker-am-pm button'))[1];
    btnPeriod.triggerEventHandler('click', null);

    fixture.detectChanges();

    const btnHour = fixture.debugElement.query(By.css('#option-1'));
    btnHour.triggerEventHandler('click', null);

    fixture.detectChanges();

    const btnMin = fixture.debugElement.query(By.css('#option-3'));
    btnMin.triggerEventHandler('click', null);

    comp.selected.subscribe(selected => {
      expect(selected).toEqual('23:50');
    });
    comp.confirmSelectedTime();
  });

  it('should return selected hour 11:50', () => {
    comp.format = '24';

    const btnHour = fixture.debugElement.query(By.css('#option-1'));
    btnHour.triggerEventHandler('click', null);

    fixture.detectChanges();

    const btnMin = fixture.debugElement.query(By.css('#option-3'));
    btnMin.triggerEventHandler('click', null);

    comp.selected.subscribe(selected => {
      expect(selected).toEqual('11:50');
    });
    comp.confirmSelectedTime();
  });

  it('should not change focus', () => {
    comp.focus = 'hour';
  });

  it('should change focus to min and back to hour', () => {
    comp.focus = 'min';
    comp.focus = 'hour';
  });

  it('should disable options less than 10h', () => {
    comp.format = '24';
    comp.min = '10:30';
    comp.max = '13:00';

    fixture.detectChanges();
  });

  it('should disable options greater than 11h', () => {
    comp.format = '24';
    comp.max = '11:00';

    fixture.detectChanges();
  });

  it('should disable options less than 11h30', () => {
    comp.format = '24';
    comp.min = '11:30';

    const btnHour = fixture.debugElement.query(By.css('#option-1'));
    btnHour.triggerEventHandler('click', null);

    fixture.detectChanges();

    const btnMin = fixture.debugElement.query(By.css('#option-3'));
    btnMin.triggerEventHandler('click', null);

    fixture.detectChanges();
  });

  it('should disable options greater than 11h30', () => {
    comp.format = '24';
    comp.max = '11:30';

    const btnHour = fixture.debugElement.query(By.css('#option-1'));
    btnHour.triggerEventHandler('click', null);

    fixture.detectChanges();

    const btnMin = fixture.debugElement.query(By.css('#option-3'));
    btnMin.triggerEventHandler('click', null);

    fixture.detectChanges();
  });


});
