import {
  Component,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  constructor() {}

  ngAfterViewInit(): void {}

  Login() {
    console.log('hello');
  }
}
