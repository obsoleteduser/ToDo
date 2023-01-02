import { signOut, onAuthStateChanged } from 'firebase/auth'
import { onValue, ref, remove, set, update } from 'firebase/database'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uid } from 'uid'
import { auth } from '../firebase'
import { db } from '../firebase'
import './todo.css'

const Todo = () => {
    const navigate = useNavigate()
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [tempUidd, setTempUidd] = useState('')

    useEffect(()=>{
        auth.onAuthStateChanged(user => {
            if(user){
                onValue(ref(db, `/${auth.currentUser.uid}`), snapshot =>{
                    setTodos([])
                    const data = snapshot.val()
                    
                    if(data !== null){
                      setTodos([...(Object.values(data))])
                      console.log(todos)
                       
                    }
                })
            }
            else if(!user){
                navigate('/')
            }
        })
    }, [])

    const handleSignOut = () =>{
        signOut(auth)
        .then(()=>{navigate('/')})
    }


    const todoHandler  = (event) =>{
        setTodo(event.target.value)
    }
 

    const writeToDatabase  = () =>{
        const uidd = uid()
        console.log(uid)
        set(ref(db, `${auth.currentUser.uid}/${uidd}`), {
            todo: todo,
            uidd: uidd
        })

        setTodo('')
    }


    const handleDelete  = (uid)=>{
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`))
    } 


    const handleUpdate = (todo)=>{
        setIsEdit(true)
        setTodo(todo.todo)
        setTempUidd(todo.uidd)
    }

    const handleEdit = (uid)=>{
        update(ref(db, `${auth.currentUser.uid}/${uid}`))
    }


    const handleEditConfirm = ()=>{
        update(ref(db, `${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo,
            tempUidd: tempUidd
        })
        setTodo('')
    }


  return (
    <div className='todos'>
        <h1>Add ToDo</h1>
        <div className="addToDo">
            <input onChange={todoHandler} placeholder='Add ToDo' type="text" />
            <button onClick={writeToDatabase}>Add</button>
           
        </div>
        <div className="my-todos">
                {todos.map((todo) => (
                    <div className='todo'>
                        <span>{todo.todo}</span>
                       <div className="controllers">
                       <button onClick={()=>{handleUpdate(todo)}} className='todo-edit'>Edit</button>
                        <button onClick={()=>{handleDelete(todo.uidd)}} className='todo-delete'>Delete</button>
                       </div>
                        </div>
                ))}
            </div>
            {
                isEdit ? 
              (<div className='confirm' onClick={handleEditConfirm}>Confirm</div>)
                : 
                (<div></div>)
            }
        <button className='signOut-btn' onClick={handleSignOut}>Sign out</button>
    </div>
  )
}


export default Todo;