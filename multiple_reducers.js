const redux= require('redux');
const createStore= redux.createStore;
const combineReducers=redux.combineReducers

const ORDER_PIZZA="ORDER_PIZZA";
const ORDER_BURGER="ORDER_BURGER";

const oredrPizza=()=>{
    return{
        type:ORDER_PIZZA
    }
}

const orderBurger=()=>{
    return {
        type:ORDER_BURGER
    }
}

const initialState={
    pizzaBase:100,
    burgerBuns:200
}

const pizzaReducer=(state=initialState,action)=>{
    switch(action.type){
        case ORDER_PIZZA:
            return {
                ...state,
                pizzaBase:state.pizzaBase-1
            }
        default:
            return state
    }
}

const burgerReducer=(state=initialState,action)=>{
    switch(action.type){
        case ORDER_BURGER:
            return {
                ...state,
                burgerBuns : state.burgerBuns-1
            }
        default:
            return state
    }
}

const rootReducer=combineReducers({
    pizzaReducer:pizzaReducer,
    burgerReducer:burgerReducer
})

const store=createStore(rootReducer)

console.log("Current State : ",store.getState())

const unsbscribe=store.subscribe(()=>{
    console.log("updated state ",store.getState())
})

store.dispatch(orderBurger());
store.dispatch(oredrPizza())