const redux= require('redux');
const createStore= redux.createStore;

const ORDER_PIZZA='ORDER_PIZZA';
const orderPizza=()=>{
    return {
        type: ORDER_PIZZA
    }
}
const initialState={
    pizzaBase:100
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

const store=createStore(pizzaReducer);
const unsbscribe=store.subscribe(()=>{
    console.log('State updated:', store.getState());
});
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderPizza());
unsbscribe(); // Unsubscribe from further updates
store.dispatch(orderPizza()); // This will not trigger the subscriber