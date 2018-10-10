import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  
  lastId: number = 0;
  todos: Todo[] = [];

  constructor() { }

  //模拟POST请求 /todos
  addTodo(todo: Todo): TodoDataService{
      
      if(!todo.id){
          todo.id = ++ this.lastId;
      }

      this.todos.push(todo);
      return this;
  }

  //模拟DELETE请求  /todos/:id
  deleteTodoById(id: number): TodoDataService{
      this.todos = this.todos.filter(v=>v.id!==id);
      return this;
  }

  // 模拟GET请求 获取所有todo信息 /todos
  getAllTodos(): Todo[]{
      return this.todos;
  }

  // 模拟GET请求 获取对应id的todo信息 /todos.:id    
  getTodoById(id: number): Todo{
      return this.todos.find(v=>v.id == id);
  }

  // 模拟PUT请求 修改对应ID上的信息 /todos/:id
  updateTodoById(id: number,values: Object = {}): Todo {

      let currentTodo = this.getTodoById(id);
      
      if(!currentTodo)
          return null;
      
      Object.assign(currentTodo,values);
      
      return currentTodo;
  }

  // 切换todo的complete状态
  toggleTodoComplete(todo: Todo){
      
      let updateTodo = this.updateTodoById(todo.id,{ complete: !todo.complete });

      return updateTodo;
  }


}
