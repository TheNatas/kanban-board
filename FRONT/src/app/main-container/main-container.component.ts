import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TasksService } from '../services/tasks.service';
import { tasks } from './models/tasks.model';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {

  constructor(private tasksService: TasksService, private router: Router) { }

  tasks: Array<tasks> = [];
  toDoTasks: Array<tasks> = [];
  doingTasks: Array<tasks> = [];
  doneTasks: Array<tasks> = [];
  
  onNewCardAdded(newTask: tasks){
    this.tasks.push(newTask);
    this.toDoTasks.push(newTask);
  }

  onCardDeleted(remainingTasks: tasks[]){
    this.tasks = remainingTasks;
    this.onTasksUpdate();
  }

  onCardChangesSaved(changedTask: tasks){
    this.tasks = this.tasks.map(task => task.id === changedTask.id ? {id: task.id, titulo: changedTask.titulo, conteudo: changedTask.conteudo, lista: task.lista} : task);
    this.onTasksUpdate(changedTask.lista);
  }

  onCardListChange(changedTask: tasks){
    this.tasks = this.tasks.map(task => task.id === changedTask.id ? changedTask : task);
    this.onTasksUpdate();
  }

  onTasksUpdate(updatedList?: string){
    if (updatedList){

      if (updatedList === 'ToDo')
        this.toDoTasks = this.tasks.filter(task => task.lista === 'ToDo');
      else if (updatedList === 'Doing')
        this.doingTasks = this.tasks.filter(task => task.lista === 'Doing');
      else if (updatedList === 'Done')
        this.doneTasks = this.tasks.filter(task => task.lista === 'Done');
      

    }else{
      this.toDoTasks = this.tasks.filter(task => task.lista === 'ToDo');
      this.doingTasks = this.tasks.filter(task => task.lista === 'Doing');
      this.doneTasks = this.tasks.filter(task => task.lista === 'Done');
    }
  }

  ngOnInit(): void {
    this.tasksService.getTasks(localStorage.getItem('token') || '')
    .subscribe(res => {
      this.tasks = res;
      this.toDoTasks = this.tasks.filter(task => task.lista === 'ToDo');
      this.doingTasks = this.tasks.filter(task => task.lista === 'Doing');
      this.doneTasks = this.tasks.filter(task => task.lista === 'Done');
    }, error => {
      if (error.status === 401) this.router.navigate(['login']);
    })
  }

}
