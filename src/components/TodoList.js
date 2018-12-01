import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import Popup from './popup'
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
        };
    }

    TogPopup(todo) {
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

    render() {
        return <div>
            {this.state.popup ? <Popup todo={this.state.popup} toggleTodo={this.TogPopup} deleteTodo={this.props.deleteTodo} editTodo={this.props.editTodo}/> : null}
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
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired
}

export default TodoList
