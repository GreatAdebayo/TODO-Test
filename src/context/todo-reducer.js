import {FECTCH_TODOS, ADDTO_TODO, DELETE_TODO, TOGGLE_TODO, CLEAR_COMPLETED} from './todo-actions'

const todoReducer = (state, action) =>{
    switch(action.type){
        case FECTCH_TODOS:
        return{
         ...state,
         todos: action.payload
        }

        case ADDTO_TODO:
            return{
                ...state,
                todos: [...state.todos, action.payload]
            }

        case DELETE_TODO:
            return{
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }

        case TOGGLE_TODO:
            return{
             ...state,
             todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)
            }

        case CLEAR_COMPLETED:
            return{
                ...state,
                todos: state.todos.filter(todo => todo.completed !== true)
            }

        default:
            return state
    }
}


export default todoReducer