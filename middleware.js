const redux= require('redux');
const reduxLogger  = require('redux-logger'); // Importing redux-logger middleware
const logger = reduxLogger.createLogger(); // Creating a logger middleware instance
const createStore= redux.createStore;
const applyMiddleware= redux.applyMiddleware;
const combineReducers= redux.combineReducers;
const ORDER_PIZZA='ORDER_PIZZA';
const ORDER_BURGER='ORDER_BURGER';
const orderPizza=()=>{
    return {
        type: ORDER_PIZZA
    }
}
const orderBurger=()=>{
    return {
        type: ORDER_BURGER
    }
}
const initialState={
    pizzaBase: 100,
    burgerBase: 200
}

const pizzaReducer=(state=initialState,action)=>{
    switch(action.type){
        case ORDER_PIZZA:
            return {
                ...state,
                pizzaBase: state.pizzaBase-1
            }
        default:
            return state;
    }
}
const burgerReducer=(state=initialState,action)=>{
    switch(action.type){
        case ORDER_BURGER:
            return {
                ...state,
                burgerBase: state.burgerBase-1
            }
        default:
            return state;
    }
}

const rootReducer=combineReducers({
    pizza: pizzaReducer,
    burger: burgerReducer
});

const store=createStore(rootReducer, applyMiddleware(logger));
const unsbscribe=store.subscribe(()=>{
{}});
store.dispatch(orderPizza());
store.dispatch(orderBurger());
store.dispatch(orderPizza());
store.dispatch(orderBurger());
store.dispatch(orderPizza());
unsbscribe(); // Unsubscribe from further updates