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

    addTask(e){
        if (this._taskInput.value !== ""){
            var newItem = {
                text: this._taskInput.value,
                key: Date.now()
            };
            this.setState((prevState) => {
                return {
                    tasks: prevState.tasks.concat(newItem)
                };
            });
            this._taskInput.value = "";
        }
        console.log(this.state.tasks);
        e.preventDefault();
    }

    deleteTask(key){
        var filteredTasks = this.state.tasks.filter((task) => (task.key !== key));

        this.setState({
            tasks : filteredTasks
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