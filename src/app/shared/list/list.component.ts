import {
  Component, Input,
  ViewChildren,
  ElementRef,
  AfterViewInit,
  QueryList,
  ChangeDetectionStrategy
} from '@angular/core';
import { List } from './list';
declare var M: any;

@Component({
  selector: 'app-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent // implements AfterViewInit
{
  @Input() list: List;
  /*   @ViewChildren('materialboxed', { read: ElementRef })
    elemsMaterialboxed: QueryList<ElementRef>; */

  constructor() { }

  /*   ngAfterViewInit(): void {
      const elems = this.elemsMaterialboxed;
      elems.forEach(el => {
        const instanceMaterialboxed = new M.Materialbox(el.nativeElement, {});
      });
    } */

}
