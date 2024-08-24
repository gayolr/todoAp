import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../interfaces/todoList-interface.todo';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiTodoService {

  private apiURL: string = "https://dummyjson.com/todos";
  private todos: Todo[] = [];
  private todosSubject: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>(this.todos);

  constructor(private http: HttpClient) {
  }

  getAllTodos(): Observable<any> {
    return this.http.get<any>(this.apiURL);
  }

  updateTodo(id: number, data: any) {
    return this.http.put<any>(`${this.apiURL}/${id}`, data);
  }

  addTodo(data: any) {
    return this.http.post<any>(`${this.apiURL}/add`, data);
  }

  deleteTodo(id: number) {
    return this.http.delete<any>(`${this.apiURL}/${id}`);
  }

  /* This just to see the changes reflects in real time there is some issues because the limitations of the API */

  getTodosLocal(): Observable<Todo[]> {
    return this.todosSubject.asObservable();
  }

  addTodolocal(newTodo: any) {
    this.todos.push(newTodo);
    console.log(this.todos);
    this.todosSubject.next(this.todos);
  }

  setTodos(newTodos: Todo[]) {
    this.todos = newTodos;
    this.todosSubject.next(this.todos);
  }

  // Update a todo item
  updateTodoLocal(updatedTodo: any) {
    this.todos = this.todos.map(todo =>
      todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
    );
    this.todosSubject.next(this.todos); // Notify subscribers of the change
  }

  // Delete a todo item
  deleteTodoLocal(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.todosSubject.next(this.todos); // Notify subscribers of the change
  }
}
