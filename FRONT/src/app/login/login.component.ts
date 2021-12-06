import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private tasksService: TasksService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'login': new FormControl(null),
      'senha': new FormControl(null)
    })
  }

  onSubmit(){
    this.tasksService.login(this.loginForm.value)
    .subscribe(res => {
      localStorage.setItem('token', res);
      this.router.navigateByUrl('kanban-board')
    });
  }

}
