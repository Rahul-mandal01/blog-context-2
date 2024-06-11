import React, { useState, useContext, useEffect } from 'react'
import Header from '../components/Header';
import Blogs from '../components/Blogs';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { baseUrl } from '../baseUrl';
import BlogDetails from '../components/BlogDetails';


const BlogPage = () => {

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigation = useNavigate();
  const {loading, setLoading} = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs(){
    setLoading(true);
    let url = `${baseUrl}?blogId=${blogId}`;
    try{
      const res = await fetch(url);
      const data = await res.json();
      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);

    }

    catch{
        console.log("An error occurred while fetching the blog post with the specified ID. Please ensure the blog ID is correct and try again. If the problem persists, contact support for assistance.");
        setBlog(null);
        setRelatedBlogs([]);
    }

    setLoading(false);

  }


  useEffect( () =>{
    if(blogId){
      fetchRelatedBlogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <div>
        <Header/>
        <div>
            <button onClick={() => navigation(-1)} >
              back
            </button>
            <Blogs/>
        </div>

        {
          loading ? 
          (
            <div>
              <p>Loading</p>
            </div>
          ):
            blog ?
            (
                <div>
                  <BlogDetails post={blog} />
                  <h2> Related Blogs </h2>
                  {
                    relatedBlogs.map( (post) =>(
                      <div key={post.id}>
                        <BlogDetails post = {post} />
                      </div>

                    ))
                  }
                </div>
            ):
            (<div>
              No Blog Found
            </div>)  
        }
    </div>

  )
}

export default BlogPage;
