import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions'

const TodoList = ({ todos, toggleTodo, deleteTodo }) => (
  <ul className="todoContain">
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => toggleTodo(todo.id)}
        remove={() => deleteTodo(todo.id)}
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
)

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
