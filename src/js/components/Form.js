import React, {Component} from "react";
import ReactDom from "react-dom";
import TodoList from  "./TodoList" 
class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            value: "",
            task_list:[]

        };

    }
 
    render() {

        
        return(
            <div>
                <TodoList></TodoList>
            </div>
        );
    }
}
export default Form;

const wrapper = document.getElementById("container");
wrapper ? ReactDom.render(<Form />, wrapper) : false;