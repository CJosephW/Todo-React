import React, {Component} from "react";
import TodoList from "./TodoList";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class TodoItems extends Component {
    constructor(props){
        super(props);
        
        this.createTasks = this.createTasks.bind(this);
    }
    
    createTasks(item){
        return  <CSSTransition key = {item.key} timeout = {500} classNames = "item"><li onClick={() => this.delete(item.key)}
            key = {item.key}><span>{item.text}</span></li></CSSTransition>
    }
    delete(key) {
        this.props.delete(key);
    }

    render() {
        var todoEntries = this.props.entries;
        var listItems = todoEntries.map(this.createTasks);

        return(
            
                <ul className = "theList">
                    <TransitionGroup className = "todo-list">
                        {listItems}
                    </TransitionGroup>
                </ul>
            
        )
    }
}

export default TodoItems;