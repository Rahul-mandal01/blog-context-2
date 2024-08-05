import React, { useState, useContext, useEffect } from 'react'
import Header from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import BlogDetails from '../components/BlogDetails';


const BlogPage = () => {
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigation = useNavigate();
  const {loading, setLoading} = useContext(AppContext);

  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs(){
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
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
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <div  >
        <Header/>
        <div className='mt-[100px] mb-6 max-w-2xl mx-auto'>
            <button onClick={() => navigation(-1)}
            className='border-2 border-gray-300 py-1 px-4 rounded-md '
            >Back
            </button>
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
                  <BlogDetails post={blog}/>
                  <h2
                   className='max-w-2xl mx-auto mt-12 font-bold text-3xl mb-8' 
                   > Related Blogs </h2>
                  {
                    relatedBlogs.map( (post) =>(
                      <div key={post.id} className='my-4'>
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