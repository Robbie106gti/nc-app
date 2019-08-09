import { Component, ChangeDetectionStrategy } from '@angular/core';
import { version } from '../../../../package.json';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public version: string = version;
  number: number = parseFloat(version);
  public applevel = '';
  constructor() {
    const arr = version.split('.');
    this.number = parseFloat(arr[0] + '.' + arr[1] + arr[2])
    if (this.number >= 0.5 && this.number <= 1) {
        this.applevel = '@ Beta';
    }
    if (this.number <= 0.5) {
      this.applevel =  '@ Alpha';
    }
  }
}
