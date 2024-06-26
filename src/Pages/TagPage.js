import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Blogs from '../components/Blogs';
import Header from '../components/Header';
import Pagination from '../components/Pagination';


const TagPage = () => {

  const navigation = useNavigate();
  const location = useLocation();
  const tag = location.pathname.split("/").at(-1).replaceAll("-","");

  return (
    <div>
        <Header/>
        <div>
          <button  onClick={() => navigation(-1)}>
            back
          </button>

          <h2>
            Blogs Tagged <span>#{tag}</span>
          </h2>
        </div>

        <Blogs/>
        <Pagination/>

    </div>
  )
}

export default TagPage;
