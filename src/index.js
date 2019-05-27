import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import WeatherReducer from "./redux/Weather/WeatherReducer";
import {Provider} from "react-redux";


let combinedReducer = combineReducers({
    weather: WeatherReducer
});

let middleWare = applyMiddleware(thunk);

let store = createStore(combinedReducer, middleWare);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
