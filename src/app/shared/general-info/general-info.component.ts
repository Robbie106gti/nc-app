import { Component, Input } from '@angular/core';
import { GeneralInfo } from './general-info';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent {
  @Input() info: GeneralInfo;

  constructor() { }

}
