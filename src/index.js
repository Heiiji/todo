import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'
import * as serviceWorker from './serviceWorker';
import {loadState, saveState} from "./localStorage";

const persistedState = loadState();
console.log('tah')
console.log(persistedState)
const store = createStore(
    todoApp,
    persistedState
);

setInterval(() => {
    store.subscribe(() => {
        saveState({
            todos: store.getState().todos
        });
    });
}, 1000);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
