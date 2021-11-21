import './App.css';
import {Fragment} from 'react'
import Homepage from './components/Homepage'
import TodoState from './context/Todostate'

function App() {
  return (
    <Fragment>
     <TodoState>
       <Homepage/>
     </TodoState>
    </Fragment>
  );
}

export default App;
