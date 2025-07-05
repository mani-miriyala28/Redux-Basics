const produce = require("immer").produce;
const redux = require("redux");
const { default: logger } = require("redux-logger");
const applyMiddleware = redux.applyMiddleware;
const createStore = redux.createStore;

//actions
const UPDATE_NAME = "UPDATE_NAME";
const UPDATE_CITY = "UPDATE_CITY";
const UPDATE_PINCODE = "UPDATE_PINCODE";
const UPDATE_TODO = "UPDATE_TODO";

//action creators

const upadteName = (name) => {
  return {
    type: UPDATE_NAME,
    payload: name,
  };
};

const upadteCity = (city) => {
  return {
    type: UPDATE_CITY,
    payload: city,
  };
};
const updatePincode = (pincode) => {
  return {
    type: UPDATE_PINCODE,
    payload: pincode,
  };
};
const updateTodo = (todo) => {
  return {
    type: UPDATE_TODO,
    payload: todo,
  };
};

const initialState = {
  user: {
    id: 1,
    name: "Mani",
    address: {
      city: "Hyderabad",
      pincode: 5000,
    },
  },
  todo: [
    { id: 1, title: "Learn React", done: false },
    { id: 2, title: "Learn Redux", done: false },
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NAME:
      const nextState = produce(state, (draft) => {
        draft.user.name = action.payload;
      });
      return nextState;
    case UPDATE_CITY:
      return produce(state, (draft) => {
        draft.user.address.city = action.payload;
      });
    case UPDATE_PINCODE:
      return produce(state, (draft) => {
        draft.user.address.pincode = action.payload;
      });
    case UPDATE_TODO:
      return produce(state, (draft) => {
        const todo = draft.todo.find((t) => t.id === action.payload.id);
        if (todo) {
          todo.done = action.payload.done;
        }
      });
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(logger));

const unsubscribe = store.subscribe(() => {
  console.log("state ", store.getState());
});

store.dispatch(upadteName("Mani Babu"));
store.dispatch(upadteName("MMB"));
store.dispatch(upadteCity("Bangalore"));
store.dispatch(updatePincode(560001));
store.dispatch(updateTodo({ id: 1, title: "Learn React", done: true }));
