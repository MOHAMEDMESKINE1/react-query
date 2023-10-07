import {useForm} from 'react-hook-form'
import TodoModel from '../../Models/TodoModel';
import TodoApi from '../../Api/TodoApi';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import customAxios from '../../Api/axios';
import { useMutation, useQueryClient } from 'react-query';

const TodoForm = ({isUpdate=false}) => {

    const queryClient = useQueryClient();

    const {register,handleSubmit,reset,formState:{errors,isValid,isSubmitSuccessful}} = useForm({
        defaultValues: async () => {
            if (isUpdate) {
                return await TodoApi.get(params.id)
            }
            return {}
        }
    });
    const params = useParams();
    const [todo,setTodo] = useState();
    // const notify = () => toast.success("Congrats !, Todo created ... ");

    const todoUpdateMutation  = useMutation((todo)=>{
        return TodoApi.update(todo)
    },{
        onSuccess : ()=>{
             queryClient.invalidateQueries('todos')
        }
    })
    const submitForm = (data)=>{

      const todo = new TodoModel(data.title,data.completed)

        if(isUpdate){
            const todo = new TodoModel(data.title,data.completed,data.id)
            // TodoApi.update(todo).then(window.history.back())
            
            todoUpdateMutation.mutate(todo)
            window.history.back()
            

        }else{
            TodoApi.create(todo).then(window.history.back())
        }
        // notify()
        reset();
       
        console.log("data sent");
    };

    useEffect(()=>{
        if(isUpdate){
            customAxios.get(params.id).then(response =>setTodo(response))
        }
    },[])
    return ( 
        <>
        {(isSubmitSuccessful ) &&  <div class="p-4 mb-4 text-sm text-green-800 shadow-md  bg-green-100 font-semibold broder  border-green-500 dark:text-green-400" role="alert">
                                    <span class="font-medium mx-2">Success !</span>Todo Created successfully</div>}
    
        <div className="container bg-white my-28 m-5 w-1/2 mx-auto border-2 rounded-md broder-blue-900 shadow-md shadow-slate-400 p-4">
                <h1 className="text-gray-900 font-bold">{isUpdate? 'Update': 'Create'} Todo</h1>

                <form onSubmit={handleSubmit(submitForm)}>
                    <div class="mb-6">
                        <label for="title"  class="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                        <input type="text"  {...register('title',{
                            required:{
                                value:true,
                                message : 'field required'
                            }
                        })} id="title"defaultValue={todo?.title}  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                        {errors.title && <small className="text-red-500 capitalize">{errors.title.message }</small>}
                    </div>
                    

                    <div class="flex items-start mb-6">
                        <div class="flex items-center h-5">
                        <input id="completed" defaultChecked={todo?.completed}  {...register('completed')} type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                        </div>
                        <label for="completed" class="ml-2 text-sm font-medium text-gray-900 ">Completed </label>
                    </div>

                        <button type="submit" disabled={!isValid} class="text-white shadow-blue-700 shadow-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isUpdate? 'Update': 'Create'} </button>
                </form>

        </div>
        <ToastContainer />
        </>
      
            
    
   );
}
 
export default TodoForm;