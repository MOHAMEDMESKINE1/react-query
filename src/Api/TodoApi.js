import customAxios from "./axios"

export default {
    // [GET]
    get:async (id)=>{

        const data = await  customAxios.get(`/${id}`)

        return data.data
    },
    // [GET]
    getAll :async ()=>{

       return await  customAxios.get('/')

        // return data.data
    },
   // [POST]

    create : async (todo)=> {

       return   await customAxios.post('/',todo)
    },
    // [UPDATE]
    update :async (todo)=> {

        return   await customAxios.put(`/${todo.id}`,todo)
     },

    // [DELETE] /:id
    delete : async (id)=> {

       return   await customAxios.delete(`/${id}`)

    },
  
}