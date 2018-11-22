import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

function randomTodo() {
    const ACTIONS = [
        'eat',
        'sleep',
        'sell',
        'buy',
        'destroy',
        'throw',
        'bury',
    ];


    const OBJECTS = [
        'the banana',
        'the dog',
        'a fireman',
        'a dancing guy',
        'Station F',
        'the coffin',
    ];

    console.log(ACTIONS[Math.round(Math.random() * ACTIONS.length)] + OBJECTS[Math.round(Math.random() * OBJECTS.length)])

    return (ACTIONS[Math.round(Math.random() * ACTIONS.length)] + OBJECTS[Math.round(Math.random() * OBJECTS.length)])
}

const AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form className="submitTODO" onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        <input ref={node => input = node} placeholder="new todo" /><br/>
          <div onClick={() => {
              dispatch(addTodo(randomTodo()))
              input.value = ''
          }} className="chance">J'ai de la chance</div>
      </form>
    </div>
  )
}

export default connect()(AddTodo)
