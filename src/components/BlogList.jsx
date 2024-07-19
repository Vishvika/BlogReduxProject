import { Link } from "react-router-dom"
import DateInput from "./DateInput";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import { useOutletContext } from "react-router-dom";  

export default function BlogList(){
    const [searchQuery] = useOutletContext();

    const dispatch = useDispatch();
    const blogs = useSelector(state => state.blogs.blogItems);

    console.log(blogs);

    const filteredBlogs = blogs.filter((blog) => blog.title?.toLowerCase().includes(searchQuery?.toLowerCase())) 
    console.log(filteredBlogs)

    function handleToggle(){
        dispatch(uiActions.toggleDisplay());
    }

    return <div>
        <h2>Your Blogs:</h2>
        {/* <div className="blog-list-buttons">
                <button onClick={handleToggle}>+ New Blog</button>
        </div> */}
        <ul className="blog-list">
              {filteredBlogs.map((blog) => {
                return(
                    <li key={blog.id}>                           
                        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" >
        <div class="col p-4 d-flex flex-column position-static" height="250">
          <strong class="d-inline-block mb-2 text-primary-emphasis">World</strong>
          <h3 class="mb-0">{blog.title}</h3>
          <div class="mb-1 text-body-secondary">
              <DateInput />
          </div>
          <p class="card-text mb-auto" style={
            {
                maxHeight: "60px",
                overflow: "hidden"
            }
          }>{blog.content}</p>
          <Link as={Link} to={`/blog/${blog.id}`} class="icon-link gap-1 icon-link-hover stretched-link">
            Continue reading
          </Link>
        </div>
<div className="col-auto d-none d-lg-block">
  {blog.imageUrl && (
    <img
      src={blog.imageUrl}
      className="bd-placeholder-img"
    //   style={{}}
      alt="Placeholder Image"
    />
  )}

</div>

 
      </div>
                    </li>
                )                    
              })}
            </ul>
    </div>}
