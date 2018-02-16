import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MccColorPickerComponent } from './color-picker.component';

describe('MccColorPickerComponent', () => {
  let comp: MccColorPickerComponent;
  let fixture: ComponentFixture<MccColorPickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MccColorPickerComponent],
    });

    fixture = TestBed.createComponent(MccColorPickerComponent);

    comp = fixture.componentInstance;
  });
});
