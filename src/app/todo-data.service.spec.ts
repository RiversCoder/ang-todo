import { TestBed, async, inject } from '@angular/core/testing';
import { Todo } from './todo'
import { TodoDataService } from './todo-data.service';

describe('TodoDataService', () => {
    
    /* 
        TestBed : 
        简介：配置并创建一个Angular测试模块，我们要在其中运行单元测试  
        概述：我们使用TestBed.configureTestingModule（）方法配置和创建一个新的Angular测试模块。 我们可以通过传入配置对象来配置测试模块。 此配置对象可以具有普通Angular模块的大多数属性。
    */
    beforeEach(() => TestBed.configureTestingModule({
        providers: [TodoDataService]
    }));

    it('should be created', () => {
        const service: TodoDataService = TestBed.get(TodoDataService);
        expect(service).toBeTruthy();
    });


      // 检测查询功能
    describe('#getAllTodos()', ()=>{

        /*
            1. 使用@ angular / core / testing提供的inject函数从我们的测试函数中的TestBed注入器中注入正确的服务
            2. inject函数的第一个参数是一个Angular依赖注入令牌数组。 第二个参数是test函数，其参数是与数组中的依赖项注入令牌相对应的依赖项。
            3. 在这里，我们告诉TestBed注入器通过在第一个参数的数组中指定它来注入TodoDataService。 
            因此，我们可以在测试函数中访问TodoDataService作为服务，因为service是我们测试函数的第一个参数的名称。
         */
        it('should return an empty array by default', inject([TodoDataService], (service: TodoDataService) => {
          expect(service.getAllTodos()).toEqual([]);
        }));

        // 返回所有的todo对象
        it('should return all todos',inject([TodoDataService],(services: TodoDataService)=>{

            let todo1 = new Todo({title: 'Hello 1', complete: false});
            let todo2 = new Todo({title: 'Hello 2', complete: true});

            services.addTodo(todo1);
            services.addTodo(todo2);

            expect(services.getAllTodos()).toEqual([todo1,todo2]);

        }));

    });


    // 检测新增功能
    describe('#save(todo)',()=>{

        // 检测id是否自增
        it('should automatically assign an incermenting id',inject([TodoDataService],((services: TodoDataService) => {

            let todo1 = new Todo({title: 'Hello 1', complete: false});
            let todo2 = new Todo({title: 'Hello 2', complete: true});

            services.addTodo(todo1);
            services.addTodo(todo2);

            expect(services.getTodoById(1)).toEqual(todo1);
            expect(services.getTodoById(2)).toEqual(todo2);

            return null;
        })));

    });


    // 检测删除功能
    describe('#deleteTodoById(id)',()=>{

        // 检测删除功能 正常删除
        it('should remove todo with the corresponding id',inject([TodoDataService],(services: TodoDataService)=>{

            let todo1 = new Todo({title: 'Hello1', complete: false});
            let todo2 = new Todo({title: 'Hello2', complete: true});

            services.addTodo(todo1);
            services.addTodo(todo2);

            expect(services.getAllTodos()).toEqual([todo1, todo2]);
            services.deleteTodoById(1);
            expect(services.getAllTodos()).toEqual([todo2]);
            services.deleteTodoById(2);
            expect(services.getAllTodos()).toEqual([]);
        }));

        // 检测删除功能 异常删除
        it('should not removing if todo width corresponding id is not found',inject([TodoDataService],(services: TodoDataService)=>{
            
            let todo1 = new Todo({title: 'Hello1', complete: false});
            let todo2 = new Todo({title: 'Hello2', complete: true});

            services.addTodo(todo1);
            services.addTodo(todo2);

            services.deleteTodoById(3);

            expect(services.getAllTodos()).toEqual([todo1,todo2]);
            
        }));
    });


    // 检测更新功能
    describe('#updateTodoById(id, values)',()=>{

        // 检测更新数据后是否返回之前的id和更新的信息
        it('should return todo with the corresponding id and update data',inject([TodoDataService],(services: TodoDataService)=>{
            let todo = new Todo({title: 'Hello 1',complete: false});
            services.addTodo(todo);

            let updateTodo = services.updateTodoById(1,{ title: '卡拉OK' });
            expect(updateTodo.title).toEqual('卡拉OK');
        }));

        // 如果没有找到参数传入的id对应的todo对象，检测是否返回空
        it('should return null if can\'t find update id corresponding todo',inject([TodoDataService],(services: TodoDataService)=>{
            let todo = new Todo({title: 'Hello 1',complete: false});
            services.addTodo(todo);

            let updateTodo = services.updateTodoById(3,{ value: '哆啦A梦' });
            expect(updateTodo).toEqual(null);
        }));

    });


    //检测切换功能
    describe('#toggleTodoComplete',()=>{

        it('should return updated data with inverse complete boolean valve',inject([TodoDataService],(services: TodoDataService)=>{

            let todo = new Todo({title: 'Hello 1',complete: false});
            services.addTodo(todo);

            let updatedTodo = services.toggleTodoComplete(todo);
            expect(updatedTodo.complete).toEqual(true);
            
            updatedTodo = services.toggleTodoComplete(todo);
            expect(updatedTodo.complete).toEqual(false);

        }));
    });


});


