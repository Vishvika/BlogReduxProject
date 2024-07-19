import { createBrowserRouter , json, RouterProvider} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RootLayout from './pages/Root';
import { useEffect, useState } from 'react';
import HomePage from './pages/Home';
import { fetchBlogData } from './store/blog-actions';
import SelectedBlog from './components/SelectedBlog/SelectedBlog';
import BlogList from './components/BlogList';

let isInitial = true;

const router = createBrowserRouter([
  {path: '/',
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage />},
      { path: '/blog-list', element: <BlogList />},
      { path: '/blog/:blogId', element: <SelectedBlog />}     
    ]
  }
      
]);

function App() {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs)
  
  useEffect(() => {
    dispatch(fetchBlogData())
  }, [dispatch])

  useEffect(()=> {
    const sendBlogData = async () => {
      const response = await fetch('https://blog-app-redux-8eede-default-rtdb.asia-southeast1.firebasedatabase.app/list.json',
        { method: 'PUT',
          body: JSON.stringify(blogs),
        })

        if(!response.ok){
          throw new Error('Sending data failed')
        }
    }

    if(isInitial){
      isInitial = false;
      return;
    }
    sendBlogData();
  }, [blogs]);

  return (
   <RouterProvider router={router} />
  );
}

export default App;


