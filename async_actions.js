const redux= require('redux');
const createStore= redux.createStore;
const applyMiddleware= redux.applyMiddleware;
const thunk= require('redux-thunk').thunk;
const axios= require('axios');

//state
const initialState={
    loading: false,
    products: [],
    error: false
}

//action types
const FETCH_REQUEST = 'FETCH_REQUEST';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_ERROR = 'FETCH_ERROR';

//action creators
const fetchRequest = () => {
    return {
        type: FETCH_REQUEST
    }
}
const fetchSuccess = (products) => {
    return {
        type: FETCH_SUCCESS,
        payload: products
    }
}
const fetchError = (error) => {
    return {
        type: FETCH_ERROR,
        payload: error
    }
}

//async action creator
const fetchProducts = () => {
    return function(dispatch){
        dispatch(fetchRequest());
        // Making an API call to fetch products
        // Using axios to make the HTTP request
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                const products = response.data.map((product)=>product.title);
                dispatch(fetchSuccess(products));
            })
            .catch(error => {
                dispatch(fetchError(error.message));
            });
    }
}
//reducer
const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload,
                error: false
            }
        case FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

//create store with thunk middleware
const store = createStore(productReducer, applyMiddleware(thunk));

//subscribe to store
const unsubscribe = store.subscribe(() => {
    console.log('State updated:', store.getState());
});

//dispatch async action
store.dispatch(fetchProducts());

unsubscribe()