Redux 

const countModifier = (count = 0, action) => {
  return count;
};
const store = createStore(countModifier);

Store는 data를 저장하는 곳
CreateStore는 reducer를 요구함.
Reducer는 data를 modify 해주는 함수로 reducer가 return하는 것은 application에 있는 data가 됨.
store.getState();

Action : redux에서 function을 부를 때 쓰는 두 번째 parameter 혹은 argument으로 reducer와 소통하기 위한 방법
store를 수정하는 유일한 방법은 action을 보내는것
Reducer에게 Action을 보내는 방법 : store.dispatch({key: value});

Subscribe : store 안에 있는 변화 감지
store.subscribe(func); // store안의 변화를 감지하면 func 실행

state를 mutate하면 안됨



react redux
컴포넌트 export할때 connect 사용
export default connect(mapStateToProps, mapDispatchToProps)(Home);
connect 첫번쨰함수는 state 가져옴
connect 두번쨰함수는 dispatch기능


redux쉽게 -> redux toolkit

createAction()
const addToDo = createAction("ADD");	//()안의 ADD는 type
const deleteToDo = createAction("DELETE");	//

const reducer = (state = [], action) => {
  switch (action.type) {	//
    case addToDo.type:
      return [ ...state,{ text: action.payload, id: id }];		//
    case deleteToDo.type:
      return state.filter(toDo => toDo.id !== action.payload);
    default:
	
  }
};

createReducer	//createReducer에서는 state mutate 가능 단 리던안해야함 , switch도 필요 없음

const reducer = createReducer([...localData], {
  [addToDo]: (state, action) => {	//{}있고 리턴없음
    state.push({ text: action.payload, id: Date.now() });	//push로 mutate하지만 뒤에서 immer가 작업
  },
  [deleteToDo]: (state, action) => state.filter(toDo => toDo.id !== action.payload)	//{}없으므로 바로리턴
});


createSlice //초기 state, reducer 함수의 객체, "slice 이름"을 받아 리듀서 및 state에 해당하는 action crator와 action type을 자동으로 생성하는 함수입니다.
내부적으로는 createAction 및 createReducer를 사용하므로 Immer를 사용하여 "mutating" 불변 업데이트를 작성할 수도 있습니다.
const counterSlice = createSlice({
  name: 'counter',	//명
  initialState,		//초기값
  reducers: {		//reducer
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})
