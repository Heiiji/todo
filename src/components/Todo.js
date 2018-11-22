import React from 'react'
import PropTypes from 'prop-types'

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
}

const Todo = ({ onClick, completed, text, remove, check }) => (
  <li
    className="todo"
    style={{
      textDecoration: completed ? 'line-through !important' : 'none',
        opacity: completed ? '0.3' : '1',
    }}
  >
    <span onClick={onClick} dangerouslySetInnerHTML={{__html: urlify(text)}} style={{display: 'inline-block', width: '80%'}} ></span>
      <span onClick={remove} className="delete">X</span>
      <span onClick={check} className="check">√</span>
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
