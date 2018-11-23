import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions'
import axios from 'axios'

class TodoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popup: null,
            chat: 'https://purr.objects-us-west-1.dream.io/i/NlaPbCh.jpg',
            edit: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    TogPopup(todo) {
        var text = todo.text;
        if (this.state.popup) {
            this.setState({
                popup: null
            });
        } else {
            this.setState({
                popup: todo,
                edit: todo.text
            });
            axios.get('http://aws.random.cat/meow').then((res) => {
                let cat = res.data.file;
                this.setState({chat: cat})
            });
        }
    }

    handleChange(event) {
        this.props.editTodo(event.target.value, this.state.popup.id);
        this.setState({edit: event.target.value});
    }

    render() {
        let popup = null;

        if (this.state.popup) {
            popup = <div className="popup">
                { this.state.popup.completed ? <span style={{color: 'green'}}>DONE</span> : <span style={{color: 'black'}}>WIP</span> }<br/>
                <textarea  style={{ width: '60%', margin: 10 }} value={this.state.edit} onChange={(e) => this.handleChange(e)} /><br/>
                <img src={this.state.chat} alt="cat" width="250" />
                <div className="erase" onClick={() => {this.props.deleteTodo(this.state.popup.id); this.setState({popup: null})}}>Effacer</div>
                <div className="close" onClick={() => {this.setState({popup: null})}}>Save and close</div>
            </div>;
        }


        return <div>
            {popup}
            <ul className="todoContain">
                {this.props.todos.map(todo =>
                    <Todo
                        key={todo.id}
                        {...todo}
                        onClick={() => this.TogPopup(todo)}
                        check={() => this.props.toggleTodo(todo.id)}
                        remove={() => this.props.deleteTodo(todo.id)}
                    />
                )}
                <FilterLink filter={VisibilityFilters.SHOW_ALL}>
                    <li
                        className="todoEnd"
                    >
                        Show All
                    </li>
                </FilterLink>
                <FilterLink filter={VisibilityFilters.SHOW_ACTIVE}>
                    <li
                        className="todoEnd"
                    >
                        Hide completed
                    </li>
                </FilterLink>
            </ul>
        </div>;
    }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
}

export default TodoList
