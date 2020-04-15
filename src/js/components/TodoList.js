import React, {Component} from "react";
import TodoItems from "./TodoItems";
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        }
        
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }
    componentDidMount() {
        // GET request using fetch with set headers
        var todoJson = [];
        const headers = { 'Content-Type': 'application/json' }
        fetch('http://localhost:3000/v1/todo', { headers })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                for(var i = 0; i < data.length; i++){
                    todoJson.push({
                        text : data[i].text,
                        key: data[i].key

                    })
                }
                this.setState({tasks:todoJson});
            })
                
            
    }
    getTasks(){

    }
    addTask(e){
        var postItem;
        if (this._taskInput.value !== ""){
            var newItem = {
                text: this._taskInput.value,
                key: Date.now()
            };
            postItem = newItem;
            this.setState((prevState) => {
                return {
                    tasks: prevState.tasks.concat(newItem)
                };
            });
            this._taskInput.value = "";

        }
        console.log(this.state.tasks);
        console.log(postItem)

        console.log(this.postItems(postItem));
        e.preventDefault();

    }
    postItems(data){
        
        console.log('something is fucknig up');
        fetch('http://localhost:3000/v1/todo', {
            headers: {

                "Content-Type": "application/json"
            },    
            method: "POST",
            mode: 'cors',
           
            body: JSON.stringify(data),

    
        }).then(res => {
            return res;
        }).catch(err => err);
    }

    deleteTask(key){
        var filteredTasks = this.state.tasks.filter((task) => (task.key !== key));

        this.setState({
            tasks : filteredTasks
        })
        
          // Note: I'm using arrow functions inside the `.fetch()` method.
          // This makes it so you don't have to bind component functions like `setState`
          // to the component.
        
        fetch("http://localhost:3000/v1/todo/" + key, {
            headers :{
                "Content-Type": "application/json"
                },
            method: 'DELETE',
            mode: 'cors'
        }).then((response) => {
            return response.json();
          })
        }
    

    render(){
        return (
            <div class = "todoMain">
                <div classname = "header">
                    <form onSubmit = {this.addTask}>
                        <input ref = {(a) => this._taskInput = a} placeholder = "enter a task!">

                        </input>
                        <button type = "submit">add :()</button>
                    </form>
                </div>
                <TodoItems entries = {this.state.tasks}
                    delete = {this.deleteTask}
                    />
            </div>
        );
    }
}

export default TodoList;