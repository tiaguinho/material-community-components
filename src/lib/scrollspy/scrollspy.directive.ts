import {
  AfterContentInit,
  Input,
  ContentChildren,
  Directive,
  ElementRef,
  QueryList,
  Renderer2,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { MccScrollspyService } from './scrollspy.service';

@Directive({
  selector: '[mccScrollspyItem], [mcc-scrollspy-item]',
  exportAs: 'mccScrollspyItem',
})
export class MccScrollspyItemDirective implements AfterContentInit {
  /**
   * Hold the element id, if element doesn't have id
   * the method will create one
   */
  set id(id: string) {
    if (!id) {
      id = this._createId();
      this.renderer.setProperty(this.elementRef.nativeElement, 'id', id);
    }

    this._id = id;
  }
  get id(): string {
    return this._id;
  }
  private _id: string;

  /**
   * Element distance of the top
   */
  get top(): number {
    return this.elementRef.nativeElement.offsetTop;
  }

  /**
   * Element is focused
   */
  @Input('focus')
  set focus(focused: boolean) {
    this._focused = coerceBooleanProperty(focused);
  }
  get focus(): boolean {
    return this._focused;
  }
  private _focused: boolean;

  /**
   * Label that will appear on the list of items.
   * The default is the text inside the element
   */
  @Input() label: string;

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterContentInit() {
    if (!this.label) {
      this.label = this.elementRef.nativeElement.textContent;
    }
    this.id = this.elementRef.nativeElement.id;
  }

  /**
   * Create an ID for the element
   */
  private _createId(): string {
    let tmpID = this.label.toLowerCase().replace(/[ ]+/gi, '_');
    return `mcc_scrollspy_${tmpID}`;
  }
}

@Directive({
  selector: '[mccScrollspyGroup], [mcc-scrollspy-group]',
  exportAs: 'mccScrollspyGroup',
})
export class MccScrollspyGroupDirective implements AfterContentInit {
  /**
   * List of scrollspy items
   */
  @ContentChildren(MccScrollspyItemDirective) items: QueryList<MccScrollspyItemDirective>;

  /**
   * Name of the scrollspy group
   */
  @Input('mccScrollspyGroup')
  set name(name: string) {
    this._name = name;
  }
  private _name: string;

  constructor(private mccScrollspyService: MccScrollspyService) {}

  ngAfterContentInit() {
    // add the group items
    const items = this.items.map(item => item);
    this.mccScrollspyService.create(this._name, items);
  }
}
