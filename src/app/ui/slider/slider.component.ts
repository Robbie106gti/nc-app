import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
declare var M: any;

@Component({
  selector: 'app-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements AfterViewInit {
  @ViewChild('slider', { read: ElementRef })
  slider: ElementRef;

  constructor() {}
  ngAfterViewInit(): void {
    M.Slider.init(this.slider.nativeElement, {});
  }
}
