const TodoCompleted = ({completed}) => {
    return (  

        <>
         {
            completed ?
            <div class="h-3.5 w-3.5 rounded-full  bg-green-500 mr-2"></div> 
            :
            <div class="h-3.5 w-3.5  rounded-full bg-red-500 mr-2"></div> 
        }

        </>
    );
}
 
export default TodoCompleted;