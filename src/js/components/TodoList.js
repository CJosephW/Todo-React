import React, {Component} from "react";
import TodoItems from "./TodoItems";
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            today: "",
            yesterday: "",
            twoDaysAgo: "",
            todayCount: 0,
            yesterdayCount: 0,
            twoDaysAgoCount: 0,
        }
        
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
    }
    componentDidMount() {1
        // GET request using fetch with set headers

        var date = new Date();
        var todayStr = date.toString().substr(0,15);
        var yes = new Date(date.getTime() - (1 * 24 * 60 * 60 * 1000));
        var yesterdayStr = yes.toString().substr(0,15);
        var twoDays = new Date(date.getTime() - (2 * 24 * 60 * 60 * 1000));
        var twoDaysAgoStr = twoDays.toString().substr(0,15);
        
        this.setState({twoDaysAgo: twoDaysAgoStr})
        this.setState({yesterday: yesterdayStr})
        this.setState({today:todayStr});
        
        var todoJson = [];

        const headers = { 'Content-Type': 'application/json' }
        fetch('http://localhost:3000/v1/todo', { headers })
            //getting Tasks from backend
        .then(response => response.json())
            .then(data => {
                console.log(data);
                for(var i = 0; i < data.length; i++){

                    todoJson.push({
                        text : data[i].text,
                        key: data[i].key,
                        day: data[i].day
                    })
                }
                this.setState({tasks:todoJson});
            })
        
            
    }

    addTask(e){

        var postItem;
        
        if (this._taskInput.value !== ""){//if the task input is not blank
            var newItem = {
                text: this._taskInput.value,
                key: Date.now(),
                day: this.state.today
            };
            postItem = newItem;
            this.setState((prevState) => {
                return {
                    tasks: prevState.tasks.concat(newItem),//adding the new task to the previousState's tasks
                };
            });
            this._taskInput.value = "";

        }
        console.log(this.postItems(postItem));
        e.preventDefault();

    }
    postItems(data){
        //posting task with data from addTask
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
        //filter out the task with the matching key
        this.setState({
            tasks : filteredTasks
        })
        
        fetch("http://localhost:3000/v1/todo/" + key, {
            headers :{
                "Content-Type": "application/json"
                },
            method: 'DELETE',
            mode: 'cors'
            //backend finds the task via its key and deletes it
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