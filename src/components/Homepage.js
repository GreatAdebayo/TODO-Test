import React, { Fragment, useRef, useEffect, useContext } from 'react'
import Arrow from '../assets/icon-arrow.svg'
import TodoContext from '../context/todo-context'


const Homepage = () => {
    const { fecthTodos, todos, addToTodo, deleteTodo, toggleTodo,  ClearCompleted, blackMd} = useContext(TodoContext)

    const newTodo = useRef();


    const addNewTodo = () => {
        if (newTodo.current.value)
            addToTodo(newTodo.current.value);
        newTodo.current.value = '';
    }

    const DeleteTodo = (id) => {
        deleteTodo(id);
    }


    const ToggleTodo = (id) => {
        toggleTodo(id)
    }

    const clearCompleted = () =>{
        ClearCompleted();
    }


    const Blackmode = () =>{
        blackMd();
    }

    useEffect(() => {
        fecthTodos();
    }, [])
    return (
        <Fragment>
            <div className="container-fluid pattern mx-auto">
                <div className="row">
                    <div className="col-md-4 col-10 inp mx-auto">
                        <div className="pb-4">
                            <span className="text-white fs-4 fw-bold text-left">TODO  <i class="fas fa-moon"></i></span>
                        </div>
                        <div className="input-group">

                            <input className="col-md-4 col-12 form-control" type="text" placeholder="Create a new Todo" ref={newTodo} />
                            <div className="bg-dark p-3  input-group-addon" style={{ borderRadius: '0px 20px 20px 0px' }} onClick={addNewTodo}>
                                <span className="p-3">
                                    <img src={Arrow} alt="" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mb-5">
                <div className="row pt-2 det mx-auto">
                    <div className="col-12 mx-auto rounded bg-white p-5">
                        <div className="row">
                            <div className="col-md dark">
                                <ul class="list-group-flush">
                                    {todos.length ? todos.map((item, index) => {
                                        return (
                                            <li class="list-group-item py-3"><div class="form-check form-check-inline">
                                                <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" onClick={() => ToggleTodo(item.id)} checked={item.completed} />
                                                <label class={item.completed ? 'form-check-label text-capitalize text-danger text-decoration-line-through' : 'form-check-label text-capitalize'} for="inlineCheckbox1">{item.name}</label>
                                            </div><div><i class="fad fa-trash-alt text-danger" onClick={() => DeleteTodo(item.id)}></i></div></li>
                                        )
                                    }) : ''}

                                </ul>
                                <div className="text-center">
                                <small className="px-2"><strong>{todos.length} Items left</strong></small> <br/>
                                <small style={{cursor:'pointer'}} onClick={clearCompleted}>Clear Completed</small>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

         <div className="text-center mb-5">
            <button className="btn btn-md btn-dark rounded" onClick={Blackmode}><small><strong>Dark Mode</strong></small></button>
         </div>
        </Fragment>
    )
}


export default Homepage