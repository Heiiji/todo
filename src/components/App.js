import React from 'react';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Header from './Header';
import '../App.css'

const App = () => (
    <div>
        <Header/>
        <AddTodo />
        <VisibleTodoList />
    </div>
)

export default App
