import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

// const reducer = (state = [], action) => {
//   const id = Date.now();
//   const localData = JSON.parse(localStorage.getItem("ToDo"));
//   switch (action.type) {
//     case addToDo.type:
//       if (localStorage.getItem("ToDo") === null) {
//         localStorage.setItem("ToDo", JSON.stringify([{ "text": action.payload, "id": id }]));
//       } else {
//         localStorage.setItem("ToDo", JSON.stringify([...localData, { "text": action.payload, "id": id }]));
//       }

//       return [ ...state,{ text: action.payload, id: id }];
//     case deleteToDo.type:
//       localStorage.setItem("ToDo", JSON.stringify(state.filter(toDo => toDo.id !== action.payload)));
//       return state.filter(toDo => toDo.id !== action.payload);
//     default:
//       return [...localData];
//   }
// };

const localData = JSON.parse(localStorage.getItem("ToDo"));
const reducer = createReducer([...localData], {
  [addToDo]: (state, action) => {
    const id = Date.now();
    if (localStorage.getItem("ToDo") === null) {
      localStorage.setItem("ToDo", JSON.stringify([{ "text": action.payload, "id": id }]));
    } else {
      localStorage.setItem("ToDo", JSON.stringify([...localData, { "text": action.payload, "id": id }]));
    }
    state.push({ text: action.payload, id: Date.now() });
  },
  [deleteToDo]: (state, action) =>{
    localStorage.setItem("ToDo", JSON.stringify(state.filter(toDo => toDo.id !== action.payload)));
    return state.filter(toDo => toDo.id !== action.payload)
  },
    
});

const store = configureStore({reducer});

export const actionCreators = {
  addToDo,
  deleteToDo
};

export default store;