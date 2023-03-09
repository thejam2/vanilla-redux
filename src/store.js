import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = text => {
  return {
    type: ADD,
    text
  };
};

const deleteToDo = id => {
  return {
    type: DELETE,
    id: parseInt(id)
  };
};

const reducer = (state = [], action) => {
  const id = Date.now();
  const localData = JSON.parse(localStorage.getItem("ToDo"));
  switch (action.type) {
    case ADD:
      if (localStorage.getItem("ToDo") === null) {
        localStorage.setItem("ToDo", JSON.stringify([{ "text": action.text, "id": id }]));
      } else {
        localStorage.setItem("ToDo", JSON.stringify([...localData, { "text": action.text, "id": id }]));
      }

      return [ ...state,{ text: action.text, id: id }];
    case DELETE:
      localStorage.setItem("ToDo", JSON.stringify(state.filter(toDo => toDo.id !== action.id)));
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return [...localData];
  }
};

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo
};

export default store;