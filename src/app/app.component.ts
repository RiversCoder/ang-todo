import { Component } from '@angular/core';
// Import class so we can register it as dependency injection token
import {Todo} from './todo'
import {TodoDataService} from './todo-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   providers: [TodoDataService]
})
export class AppComponent {
    
    private todoDataService: TodoDataService;
    public newTodo: Todo = new Todo();

    // Ask Angular DI system to inject the dependency
    // associated with the dependency injection token `TodoDataService`
    // and assign it to a property called `todoDataService`
    constructor(todoDataService: TodoDataService){
        this.todoDataService = todoDataService;
    }

    // Service is now available as this.todoDataService
    toggleTodoComplete(todo){
        this.todoDataService.toggleTodoComplete(todo);
    }

    removeTodo(todo){
        this.todoDataService.deleteTodoById(todo.id);
    }

    getTodos(){
        this.todoDataService.getAllTodos();
    }

    addTodo(){
        this.todoDataService.addTodo(this.newTodo);
        this.newTodo = new Todo();   
    }
}
