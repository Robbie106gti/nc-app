import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-underconstruction',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './underconstruction.component.html',
  styleUrls: ['./underconstruction.component.scss']
})
export class UnderconstructionComponent implements OnInit {
  @Input() title: string;

  constructor() {}

  ngOnInit() {}
}
