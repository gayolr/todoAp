import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './components/todo.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Todo, TodoListResponse } from './interfaces/todoList-interface.todo';
import { ServiceApiTodoService } from './services/service-api-todo.service';
import { FilterPipe } from './pipes/filter.pipe';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, MatProgressSpinnerModule, MatSnackBarModule, MatTabsModule, MatButtonModule, MatCardModule, MatInputModule, NgFor, CommonModule, TodoComponent, FilterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  readonly snackBar = inject(MatSnackBar);

  title = 'Todo Matic';
  isLoading: boolean = false;
  todoText: string = '';
  dataListTodo: TodoListResponse = {
    todos: [],
    total: 0,
    skip: 0,
    limit: 0
  };

  constructor(private service: ServiceApiTodoService) {
  }

  /* We get the todo list from the endpoint */

  ngOnInit() {
    this.isLoading = true;
    this.service.getAllTodos().subscribe(data => {
      if (data) {
        console.log(data);
        this.dataListTodo = data;
        this.addEditProperty(this.dataListTodo);
        /* This is just extra to see the changes in real time */
        this.service.setTodos(this.dataListTodo.todos);
        this.service.getTodosLocal().subscribe(data => {
          this.dataListTodo.todos = data;
        });
        this.isLoading = false;
      }
    });
  }

  /* Add new item to the list send the post request to the endpoint */

  addTodo() {
    if (this.todoText !== '') {
      const todo = {
        todo: this.todoText,
        completed: false,
        userId: 1,
      }
      this.service.addTodo(todo).subscribe(data => {
        if (data) {
          this.open(`New item created successful`, '', { duration: 2000 });
          this.service.addTodolocal({
            ...data,
            isEditable: false
          })
        }
      })
      this.todoText = '';
    }
  }

  /* Add isEditable property to know if the user want to do some changes to the item */

  addEditProperty(todoList: any) {
    for (let i = 0; i < todoList.todos.length; i++) {
      todoList.todos[i].isEditable = false;
    }
  }

  /* Get the number of pendings tasks in the active tab */

  getNumberOfPendingTasks(arr: Array<any>) {
    if (!arr) return [];
    const res = arr.filter(it => it['completed'] === false);
    return res.length;
  }

  /* Temporal fix TODO: create Snackbar component */

  open(message: string, action = '', config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, config);
  }
}
