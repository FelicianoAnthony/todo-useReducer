import React from 'react'

// root component 
function App() {
  return (
    <div style={{textAlign: 'center'}}>
      <TodoContextProvider>
        <TodoList/>
      </TodoContextProvider> 
    </div>
  );
}

// todoReducer constants 
const TODO_REMOVE = 'TODO_REMOVE'; 
const TODO_ADD = 'TODO_ADD';
const TODO_CHANGE = 'TODO_CHANGE';

// rendered component 
const TodoList = () => {

  const {todoData, dispatch} = React.useContext(TodoContext)
  const currentTodo = todoData.currentTodo
  const todos = todoData.todos

  const handleRemoveTodo = (e) => {
    dispatch({type: TODO_REMOVE, payload: {id: e.target.id}})
  }

  const handleAddTodo = (e) => {
    e.preventDefault()
    dispatch({type: TODO_ADD, payload: {title: currentTodo}})
  }

  const handleTodoChange = (e) => {
    dispatch({type: TODO_CHANGE, payload: {currentTodo: e.target.value}})
  }

  return (
    <div>
      <form onSubmit={handleAddTodo}>
        {todos.length ? 
        (
          todos.map((todo, index) => {
            return <p id={todo.id} key={index} onClick={handleRemoveTodo}>{todo.title} </p>
          })
        ):
          (<div> nothing to do</div>)
        }

        <label htmlFor='currentTodo'> Add todo: </label>
        <input type='text' id='currentTodo' value="currentTodo" onChange={handleTodoChange}/>
        <input value='Add New todo' type='submit'/>
        {/* <button type="submit"> Add </button> */}

      </form>
    </div>
  )
}


// create a context to wrap components 
const TodoContext = React.createContext(); 

// create a context provider so other components have access to state
/* path of data from component's dispatch method to reducer :
  component
    context provider
      reducer 
        perform action on state depending on action type 
          components see there was a change and re-render 
*/
const TodoContextProvider = (props) => {

  const initialState = {
    currentTodo: {title: ''}, 
    todos: [
      {id: Math.random(), title: 'Thing 1'},
      {id: Math.random(), title: 'Thing 2'},
      {id: Math.random(), title: 'Thing 3'}
    ]
  }

  const [todoData, dispatch] = React.useReducer(todoReducer, initialState)
  console.log(`TodoContextProvider.todoData = ${JSON.stringify(todoData)}`)

  return (
    <TodoContext.Provider value={{todoData, dispatch}}> 
      {props.children}
    </TodoContext.Provider>
  )
}


const todoReducer = (state, action) => {
  // **** when using reducer to update state, never update state directly, always make a copy. **** //
  switch(action.type) {
    case TODO_ADD: 
      const { title } = action.payload
      // return Object.assign({}, state, {todos: state.todos.concat({text, id: Math.random()})}, {currentTodo: ''} )
      return {
        ...state,
        todos: [...state.todos, {title, id: Math.random()} ], // or todos: state.todos.concat({text, id: Math.random()}),
        currentTodo: '' 
      }

    case TODO_REMOVE:
      const { id } = action.payload  
      // return Object.assign({}, state, {todos: state.todos.filter(todo => todo.id !== Number(id)) })
      return {
        ...state, 
        todos: [...state.todos.filter(todo => todo.id !== Number(id))]
      }

    case TODO_CHANGE:
      const { currentTodo } = action.payload 
      // return Object.assign({}, state, {currentTodo: action.text})
      return {
        ...state, 
        currentTodo // same as currentTodo: currentTodo
      }
    default: 
      return state
  }
}

export default App;