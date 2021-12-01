import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { tasks } from '../models/tasks.model';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  @Output() newCardAdded = new EventEmitter<tasks>();
  
  constructor(private tasksService: TasksService) { }

  newCardTitle:string = '';
  newCardContent:string = '';

  addNewCard(){
    this.tasksService.addTask(
      localStorage.getItem('token') || '',
      {
        titulo: this.newCardTitle,
        conteudo: this.newCardContent,
        lista: 'ToDo'
      }
    )
    .subscribe(newCard => this.newCardAdded.emit(newCard));
    this.newCardTitle = '';
    this.newCardContent = '';
  }

  ngOnInit(): void {
  }

}
