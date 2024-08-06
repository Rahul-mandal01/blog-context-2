import React from 'react'
import Header from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Blogs from '../components/Blogs';

const CategoryPage = () => {

  const navigation = useNavigate();
  const location = useLocation();
  const category = location.pathname.split("/").at(-1);

  return (
    <div>
    
        <Header/>

        <div>

          <div className='mt-[100px] max-w-2xl flex items-center space-x-2 ml-4 md:mx-auto'>
            <button onClick={ () => navigation(-1)}
            className='border-2 border-gray-300 py-1 px-4 rounded-md hover:bg-gray-100 hover:border-gray-400'
            >
              Back
            </button>

            <h2 className='text-xl font-bold'>
              Blogs On <span className='underline'>{category}</span>
            </h2>
          </div>

          <div className="-mt-[80px]">
            <Blogs/>
          </div>
          <Pagination/>
        </div>

    </div>
  )
}

export default CategoryPage;
