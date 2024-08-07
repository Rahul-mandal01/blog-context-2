import "./App.css";
import {Routes, Route,useSearchParams, useLocation} from "react-router-dom"
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import Home from "./Pages/Home";
import CategoryPage from "./Pages/CategoryPage";
import BlogPage from "./Pages/BlogPage";
import TagPage from "./Pages/TagPage";




function App() {
  const { fetchBlogPosts } = useContext(AppContext);

  const [searchParams] = useSearchParams();

  const location = useLocation();


  useEffect(() => {

    const page = searchParams.get("page") ?? 1;

    if(location.pathname.includes("tags")){
      // iska matlab tag wala page show krna hai
      const tag = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), tag);

    }

    else if(location.pathname.includes("categories")){
      const category = location.pathname.split("/").at(-1).replaceAll("-"," ");
      fetchBlogPosts(Number(page), null , category);
    }

    else{
      fetchBlogPosts(Number(page));
    } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, location.search]); 

  return (

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/blog/:blogId" element={<BlogPage/>} />
      <Route path="/tags/:tag" element={<TagPage/>} />
      <Route path="/categories/:category" element={<CategoryPage/>} />
    </Routes>

  );
}

export default App;
