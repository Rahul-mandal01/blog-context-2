import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Blogs from '../components/Blogs';
import Header from '../components/Header';
import Pagination from '../components/Pagination';


const TagPage = () => {

  const navigation = useNavigate();
  const location = useLocation();
  const tag = location.pathname.split("/").at(-1);

  return (
    <div>
        <Header/>
        <div className='mt-[100px] max-w-2xl mx-auto flex items-center space-x-2'>
          <button  onClick={() => navigation(-1)}
          className='border-2 border-gray-300 py-1 px-4 rounded-md '>
            Back
          </button>

          <h2 className='text-xl font-bold'>
            Blogs Tagged <span className='underline text-blue-700'>#{tag}</span>
          </h2>
        </div>
        
        <div className="-mt-[80px]">
          <Blogs/>
        </div>

        <Pagination/>

    </div>
  )
}

export default TagPage;
