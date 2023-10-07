import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import TodoModel from "../../Models/TodoModel";
import TodoApi from "../../Api/TodoApi";

const TodoCreate = () => {
    const [todo,setTodo] = useState();

    const queryClient = useQueryClient();
    
    const {
        register,
        handleSubmit,
        reset,
        formState:{
            errors,
            isValid,
            isSubmitSuccessful
        }
    } = useForm();
    
    const todoCreateMutation  = useMutation((todo)=>{
        return TodoApi.create(todo)
    },{
        onSuccess : ()=>{
             queryClient.invalidateQueries('todos')
        }
    })

    const submitForm = (data)=>{

            
            const todo = new TodoModel(data.title,data.completed)
            todoCreateMutation.mutate(todo)

            console.log("data sent");
            reset()
      };
  
    return (  

        <>
        {(isSubmitSuccessful ) &&  <div class="p-4 mb-4 text-sm text-white shadow-md  bg-green-700 font-semibold broder  border-green-500 " role="alert">
                                    <span class="font-medium mx-2">Success !</span>Todo Created successfully</div>}
    
        <div className="container bg-white my-20 m-5 w-1/2 mx-auto border-2 rounded-md broder-blue-900 shadow-md shadow-slate-400 p-4">
                <h1 className="text-gray-900 font-bold">Create Todo</h1>

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

                        <button type="submit" disabled={!isValid} class="text-white shadow-blue-700 shadow-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create </button>
                </form>

        </div>
        </>
    );
}
 
export default TodoCreate

