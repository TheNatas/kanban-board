import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { tasks } from '../models/tasks.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input('task') task!:tasks;
  @Output() cardDeleted = new EventEmitter<tasks[]>();
  @Output() cardChangesSaved = new EventEmitter<tasks>();
  @Output() cardListChanged = new EventEmitter<tasks>();
  
  constructor(private tasksService: TasksService) { }

  editMode:boolean = false;
  titleInput!:string;
  contentInput!:string;

  toggleMode(){
    this.editMode = !this.editMode;
  }

  onEdit(){
    this.toggleMode();
    this.titleInput = this.task.titulo;
    this.contentInput = this.task.conteudo;
  }

  onDelete(){
    this.tasksService.deleteTask(
      localStorage.getItem('token') || '', this.task.id)
      .subscribe(remainingTasks => this.cardDeleted.emit(remainingTasks));
  }

  changeTaskList(newList: string){
    this.tasksService.changeTask(
      localStorage.getItem('token') || '', {
        id: this.task.id,
        titulo: this.task.titulo,
        conteudo: this.task.conteudo,
        lista: newList
      })
    .subscribe(changedTask => this.cardListChanged.emit(changedTask));
  }

  onPrevious(){
    if (this.task.lista === 'ToDo') return;
    const newList = this.task.lista === 'Doing' ? 'ToDo' : 'Doing';
    this.changeTaskList(newList);
  }

  onNext(){
    if (this.task.lista === 'Done') return;
    const newList = this.task.lista === 'ToDo' ? 'Doing' : 'Done';
    this.changeTaskList(newList);
  }

  onCancel(){
    this.toggleMode();
  }

  saveChangesOnCard(){
    this.tasksService.changeTask(
      localStorage.getItem('token') || '', {
        id: this.task.id,
        titulo: this.titleInput,
        conteudo: this.contentInput,
        lista: this.task.lista
      }
    )
    .subscribe(changedTask => this.cardChangesSaved.emit(changedTask));
    this.toggleMode();
  }

  ngOnInit(): void {
  }

}
