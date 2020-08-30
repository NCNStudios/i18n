import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'cnstudios';

  ngOnInit(): void {
    if (localStorage.getItem('listTrans') === null) {
      const trans = [];
      localStorage.setItem('listTrans', JSON.stringify(trans));
    }
  }
}
