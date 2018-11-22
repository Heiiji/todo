import React from 'react'
import PropTypes from 'prop-types'

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
}

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    className="todo"
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
    dangerouslySetInnerHTML={{__html: urlify(text)}}
  >
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
