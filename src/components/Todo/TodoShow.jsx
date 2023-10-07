import { Link, useParams } from "react-router-dom";
import {useQuery,useQueryClient} from 'react-query'
import TodoApi from "../../Api/TodoApi";
import TodoCompleted from "./TodoCompleted";

const TodoShow = () => {
    
    const {id} = useParams();
    const queryClient  =  useQueryClient();
    const {data:todo, isLoading,error,isError} = useQuery(['todo',parseInt(id)], ()=>TodoApi.get(id),{
        onError : (error) => {console.log(error);},
        staleTime:50000,
        initialData :() => {

            console.log(queryClient.getQueriesData('todos'));

            const todoData  = queryClient.getQueriesData('todos')?.data;
            return todoData?.find(todoItem => todoItem.id === parseInt(id))
        }
    })




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


return ( <>

                <div className="container  flex justify-center items-center m-5">
              
                    <div className="mx-auto">
                        <Link    to={"/"} class="font-medium w-full bg-blue-600 p-1.5 text-white mr-1 "  >Back  </Link>

                        <h1 className="text-green-200 text-2xl">Todo Details : </h1>
                        <hr className="text-gray-500 mb-2"  />
                        <div  class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">#ID : {id}    </h5>
                            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{todo.title} <TodoCompleted completed={todo?.completed} className="text-white" />  </h5>
                           

                        </div>
                       
                        
                    </div>

                </div>
    </> );
}
 
export default TodoShow;