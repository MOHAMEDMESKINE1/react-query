import { useEffect, useState } from "react";
import TodoApi from "../../Api/TodoApi";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// react-qeury
import {useMutation, useQuery, useQueryClient} from 'react-query'
import TodoCompleted from "./TodoCompleted";
import TodoCreate from "./TodoCreate";
import Pagination from "../features/Pagination";
import { useForm } from "react-hook-form";
import DarkMode from "../features/DarkMode";

const TodoList = () => {
   
    //    useform
    const {reset} = useForm();
//    useform
    //pagintion
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(5);
    //    
    const [lastUpdate,setLastUpdate] = useState();
    const [SearchTerm,setSearchTerm] = useState('');
    const queryClient = useQueryClient();

    // useQuery 
    const {data:todos,isFetching,dataUpdatedAt,isLoading,isError,error,refetch} = useQuery(['todos'],TodoApi.getAll,{
        refetchOnWindowFocus:true,
        // refetchOnMount:false,
        // enabled:false,
        retry:0,
        cacheTime:50000,
        staleTime:30000,
        onError : (error) => {console.log(error);},
        onSuccess : (data) => {setLastUpdate((new Date()).toISOString())},
        
        // data transformation
        select : (data)=> {
               
                return data.data.map((todo)=>{
                    return {
                        ...todo,
                        longId:String(todo.id).padStart(10,'0'),
                        title : String(todo.title).toUpperCase()
                    }
                }) ;
        }
        // refetchInterval:2000,
        // refetchIntervalInBackground:true
    });
   
    const todoDeleteMutation  = useMutation((id)=>{
        return TodoApi.delete(id)
    },{
        onSuccess : ()=>{
             queryClient.invalidateQueries('todos')
        }
    })

    const handleDelete =  (e) => {
        e.preventDefault();
        const id  = parseInt(e.currentTarget.dataset.id);

        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this data!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
          }).then((result) => {

            if (result.isConfirmed) {
           
            todoDeleteMutation.mutate(id)

                Swal.fire('Deleted!', 'Your data has been deleted.', 'success');

            }else{
              toast('todo  cancelled',{
                theme: "dark"
              })
            }
          
          });
    }
   
    if(isLoading ){
        return <h6 className="text-white font-bold mx-5">Loading ...</h6>
    }
    if(isError){
        return <div class="m-5 flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
        <div>
        <span class="font-medium">Error alert!: &nbsp;</span> <span className="text-yellow-300"> {error.message}</span>
        </div>
    </div>
    }

    // pagination
    const lastTodoIndex = currentPage * todosPerPage;
    const firstTodoIndex = lastTodoIndex - todosPerPage;
    // filter todos 
    const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(SearchTerm ? SearchTerm.toLowerCase() : '')

    );
    const currentTodos = filteredTodos.slice(firstTodoIndex, lastTodoIndex);
   
    return (             
   <>

    <TodoCreate/>
     <div class="relative  overflow-x-auto shadow-md rounded-lg m-10">
     <input
        type="text"
        className="p-1.5"
        value={SearchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos"
      />
     <button class="font-medium bg-gray-600 p-1.5 text-white mr-1 "  onClick={()=> setSearchTerm('')} >{!SearchTerm ? 'Search': 'Clear'} </button>
       <button class="font-medium  bg-blue-600 p-1.5 text-white mr-1 " disabled={isFetching} onClick={refetch} >Fresh </button>
        <small className="text-yellow-500 font-semi-bold">Last Update : {(new Date(dataUpdatedAt).toTimeString().substring(0,8))}</small>
        
        <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
            <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                Our Todos ({todos.length})
                <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of todos and more.</p>
            </caption>
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    
                    <th scope="col" class="px-6 py-3">
                        # Id
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Title
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Completed
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                    {   
                      currentTodos?.map((todo,key)=>{
                            return  <tr  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    
                                                <td key={key} class="px-6 py-4">
                                                    {todo.longId}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {todo.title}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <div class="flex items-center justify-center">
                                                       <TodoCompleted completed={todo.completed}/>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4">
                                                <Link to={`/todo/show/${todo.id}`} class="font-medium bg-green-600 p-1.5 text-white mr-1 ">View </Link>
                                                <Link to={`/todo/update/${todo.id}`} class="font-medium bg-blue-600 p-1.5 text-white mr-1 ">Edit </Link>
                                                <button data-id={todo.id}  onClick={handleDelete} class="font-medium bg-red-600 p-1.5 rounded-sm text-white  ">Delete</button>
                            
                                                </td>
                                    </tr>
                        })
                    }
                
                
            </tbody>
        </table>
       
       <ToastContainer  draggablePercent={60} />
   <div/> 


</div>
    <div className="my-5">
    <Pagination
                    totalTodos={todos.length}
                    todosPerPage={todosPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
    </div>
       
   </>
    );
}
 
export default TodoList;