import { Component } from '@angular/core';

@Component({
  selector: 'app-root1',
  templateUrl: './app.component.html',
})
export class AppComponent {

  title = 'Custom Timepicker Demo';
  clockIn: any = { hour: 3, minute: 50, second: 0 };
  meredian: boolean = true;

}

