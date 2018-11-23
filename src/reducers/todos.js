const todos = (state = [], action, text) => {
  switch (action.type) {
      case 'ADD_TODO':
          return [
              ...state,
              {
                  id: action.id,
                  text: action.text,
                  completed: false
              }
          ]
      case 'DELETE_TODO':
          return state.filter((data) => data.id !== action.id)
      case 'EDIT_TODO':
          return state.map(todo =>
              (todo.id === action.id)
                  ? {...todo, text: action.text}
                  : todo
          )
    case 'TOGGLE_TODO':
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      )
    default:
      return state
  }
}

export default todos
