import React, { useReducer } from 'react'
import TodoContext from './todo-context'
import todoReducer from './todo-reducer'
import { FECTCH_TODOS, ADDTO_TODO, DELETE_TODO, TOGGLE_TODO, CLEAR_COMPLETED, BLACK_MODE } from './todo-actions'

const TodoState = (props) => {
    const initialState = {
        todos: [],
        blackMode: null
    }
    const [state, dispatch] = useReducer(todoReducer, initialState)

    //Fetch all todos
    const fecthTodos = () => {
        let Alltodos = null
        if (localStorage.Todos)
            Alltodos = JSON.parse(localStorage.getItem('Todos'))
        else Alltodos = []
        dispatch({
            type: FECTCH_TODOS,
            payload: Alltodos
        })
    }


    //add to Todo
    const addToTodo = (todo) => {
        let newtodo = {}
        let Alltodos = null
        if (localStorage.Todos)
            Alltodos = JSON.parse(localStorage.getItem('Todos'))
        else Alltodos = []
        newtodo = {
            id: Math.random(),
            name: todo,
            completed: false
        }
        dispatch({
            type: ADDTO_TODO,
            payload: newtodo
        })
        Alltodos.push(newtodo)
        localStorage.setItem('Todos', JSON.stringify(Alltodos))
    }


    //Delete Todo 
    const deleteTodo = (id) => {
        dispatch({
            type: DELETE_TODO,
            payload: id
        })

        let Alltodos = null
        if (localStorage.Todos)
            Alltodos = JSON.parse(localStorage.getItem('Todos'))
        let newAllTodos = Alltodos.filter(todo => todo.id !== id)
        localStorage.setItem('Todos', JSON.stringify(newAllTodos))
    }

    //Toogle todo
    const toggleTodo = (id) => {
        dispatch({
            type: TOGGLE_TODO,
            payload: id
        })
        let Alltodos = null
        if (localStorage.Todos)
            Alltodos = JSON.parse(localStorage.getItem('Todos'))
        let newAllTodos = Alltodos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        localStorage.setItem('Todos', JSON.stringify(newAllTodos))
    }

    //Clear Completed
    const ClearCompleted = () => {
        dispatch({
            type: CLEAR_COMPLETED
        })
        let Alltodos = null
        if (localStorage.Todos)
            Alltodos = JSON.parse(localStorage.getItem('Todos'))
        let newAllTodos = Alltodos.filter(todo => todo.completed !== true)
        localStorage.setItem('Todos', JSON.stringify(newAllTodos))
    }


    //Black Mode
    const blackMd = () => {
        let mode = JSON.parse(localStorage.getItem('Mode'))
        if (mode) {
            localStorage.setItem('Mode', JSON.stringify(!mode))
            dispatch({
                type: BLACK_MODE,
                payload: !mode
            })
        }
        else {
            localStorage.setItem('Mode', JSON.stringify(true))
            dispatch({
                type: BLACK_MODE,
                payload: true
            })
        }

    }

    return (
        <TodoContext.Provider value={{
            todos: state.todos,
            fecthTodos,
            addToTodo,
            deleteTodo,
            toggleTodo,
            ClearCompleted,
            blackMode: state.blackMode,
            blackMd
        }}>

            {props.children}
        </TodoContext.Provider>
    )
}

export default TodoState;