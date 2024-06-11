import React from 'react'
import Header from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import Pagination from '../components/Pagination';
import Blogs from '../components/Blogs';

const CategoryPage = () => {

  const navigation = useNavigate();
  const location = useLocation;
  const category = location.pathname.split("/").at(-1);

  return (
    <div>
    
        <Header/>

        <div>
          <button onClick={ () => navigation(-1)}>
            back
          </button>

          <h2>
            Blogs On <span>{category}</span>
          </h2>
          <Blogs/>
          <Pagination/>
        </div>

    </div>
  )
}

export default CategoryPage;
