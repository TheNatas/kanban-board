import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private http: HttpClient){}

  onCreatePost(postData: { "login":"letscode", "senha":"lets@123" }){

    this.http.post(
      'http://0.0.0.0:5000/login/',
      postData
    ).subscribe((res: any) => console.log(res));
    
  }

}
