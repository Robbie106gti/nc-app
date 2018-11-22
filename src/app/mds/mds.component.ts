import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-mds',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mds.component.html',
  styleUrls: ['./mds.component.scss']
})
export class MdsComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
