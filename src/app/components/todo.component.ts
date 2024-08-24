import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceApiTodoService } from '../services/service-api-todo.service';

@Component({
  selector: 'todo-component',
  standalone: true,
  imports: [MatCheckboxModule, MatSnackBarModule, MatButtonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  @Input() checked: boolean = false;
  @Input() isEditable: boolean | undefined;
  @Input() todoText: string = '';
  @Input() id: number = 0;

  readonly snackBar = inject(MatSnackBar);

  constructor(private service: ServiceApiTodoService) {
  }

  /* Save item send the new details to the endpoint */

  editSaveItem(id: number, value: 'Save' | 'Edit') {
    if (value === 'Edit') {
      this.isEditable = true;
    } else {
      this.isEditable = false;
      const isTodoText = {
        todo: this.todoText
      }
      this.service.updateTodo(id, isTodoText).subscribe(data => {
        this.open(`Edited item: ${id} successful`, '', { duration: 2000 });
      })
      const isTodo = {
        id: id,
        todo: this.todoText
      }
      this.service.updateTodoLocal(isTodo);
    }
  }

  /* Check item send the update to the endpoint */

  checkedTodoItem(id: number) {
    const isChecked = {
      completed: this.checked
    }
    this.service.updateTodo(id, isChecked).subscribe(data => {
      const isTodo = {
        id: id,
        completed: this.checked
      }
      if (data.completed === true) {
        this.open(`Checked item: ${id} successful`, '', { duration: 2000 });
        this.service.updateTodoLocal(isTodo);
        this.checked = false;
      } else {
        this.service.updateTodoLocal(isTodo);
        this.checked = true;
        this.open(`Unchecked item: ${id} successful`, '', { duration: 2000 });
      }
    })
  }

  /* Delete item send the request to the endpoint */

  deleteItem(id: number) {
    this.service.deleteTodo(id).subscribe(data => {
      if (data.isDeleted === true) {
        this.open(`Delete item: ${id} successful`, '', { duration: 2000 });
        this.service.deleteTodoLocal(id);
      } else {
        this.open(`Oops something wrong deleting the item`, '', { duration: 2000 });
      }
    })
  }

  /* Temporal fix TODO: create Snackbar component */

  open(message: string, action = '', config?: MatSnackBarConfig) {
    return this.snackBar.open(message, action, config);
  }
}
