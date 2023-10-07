import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import TodoList from './components/Todo/TodoList';
import 'react-toastify/dist/ReactToastify.css';

// router
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import TodoUpdate from './components/Todo/TodoUpdate';
// router


// react query
import {QueryClientProvider ,QueryClient} from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import TodoShow from './components/Todo/TodoShow';

const queryClient =new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QueryClientProvider client={queryClient}>
       <ReactQueryDevtools initialIsOpen={false} />
    <BrowserRouter>
      <Routes>
        
          <Route path="/" element={<Layout/>}>
              <Route index element={<TodoList/>}/>
              <Route path={'/todo/show/:id'} element={<TodoShow/>}/>
              <Route path={'/todo/update/:id'} element={<TodoUpdate/>}/>
            
          </Route>
      
      </Routes>
    </BrowserRouter>
   </QueryClientProvider>
);

