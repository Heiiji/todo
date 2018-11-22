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
            chat: 'https://purr.objects-us-west-1.dream.io/i/NlaPbCh.jpg'
        }
    }

    TogPopup(todo) {
        if (this.state.popup) {
            this.setState({
                popup: null
            });
        } else {
            let popup = <div className="popup">
                { todo.completed ? <span style={{color: 'green'}}>DONE</span> : <span style={{color: 'black'}}>WIP</span> }
                <p>{todo.text}</p>
                <img src={this.state.chat} alt="cat" width="250" />
                <div className="erase" onClick={() => {this.props.deleteTodo(todo.id); this.setState({popup: null})}}>Effacer</div>
                <div className="close" onClick={() => {this.setState({popup: null})}}>close</div>
            </div>;
            this.setState({
                popup: popup
            });
            axios.get('http://aws.random.cat/meow').then((res) => {
                let cat = res.data.file;
                this.setState({chat: cat})
            });
        }
    }

    render() {
        return <div>
            {this.state.popup}
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
