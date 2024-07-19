import { useDispatch, useSelector } from "react-redux";
import DateInput from "../DateInput"
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react"
import { blogsActions } from "../../store/blog-list-slice";
import { storage } from "../firebase-setup/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import './selected-blog.css';

function SelectedBlog(){
    const [isEditing, setIsEditing] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    const { blogId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const blogs = useSelector(state => state.blogs.blogItems);
    
    const blog = blogs.find((blog) => (blogId === String(blog.id)));
    const title = useRef(blog?.title)
    const content = useRef(blog?.content)

    // useEffect(() => {
    //     if(blog){
    //         title.current.value = blog.title;
    //         content.current.value = blog.content;
    //     }
    // }, [blog])

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
    }
    const updateBlogHandler = async () => {
        setIsEditing(false);
        let imageUrl = blog.imageUrl;

        if(selectedFile){
            const storageRef = ref(storage, `images/${selectedFile.name}`)
            await uploadBytes(storageRef, selectedFile);
            imageUrl = await getDownloadURL(storageRef);
        }

        dispatch(blogsActions.updateBlog({
            id: blogId,
            enteredTitle: title.current.value,
            enteredContent: content.current.value,
            imageUrl: imageUrl,
        },{}))
        console.log(blogs);

    }

    const removeBlogHandler = () => {
        console.log(blog.id)
        dispatch(blogsActions.removeBlog(blog.id))
        navigate('/blog-list')
    }


    // if(!blog){
    //     return <p></p>
    // }
    if(isEditing){
    return(
    
    <div className='edit-blog-container'>
            <h1>Edit Blog</h1>
            <div className='edit-blog-form'>
                <div className='left'>
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title' ref={title} defaultValue={blog.title} />
                    <label htmlFor="content">Content</label>
                    <textarea id='content' ref={content} defaultValue={blog.content} />
                </div>
                <div className="right">
                    <div className="image-container">
                        {blog.imageUrl && (
                            <div>
                                <p>Current Image:</p>
                                <img src={blog.imageUrl} alt="Blog Image" />
                            </div>
                        )}
                        <label htmlFor="img">Select a new image:</label>
                        <input type="file" id="img" accept="image/*" onChange={handleFileChange}/>
                    </div>
                </div>
        
                </div> 
                    <menu className='menu'>
                        <li>
                            <button className='btn' onClick={updateBlogHandler}>Save</button>
                        </li>
                        <li>
                            <button className='btn' onClick={() => setIsEditing(false)}>Cancel</button>
                        </li>
                    </menu>
                </div>
            );
        }
        else{
    return(
        <main class="container">
            <div class="row g-5">
                <div class="col-md-8">
                    <article class="blog-post">
                        <h2 class="display-5 link-body-emphasis mb-1">{blog.title}</h2>
                        <p class="blog-post-meta">
                            <DateInput />
                        </p>
                        <p>{blog.content}</p>           
                    </article>
                </div>

                <div class="col-md-4">
                    <div class="position-sticky" style={{ top: "2em"}}>
                        <div class="p-4 mb-3 bg-body-tertiary rounded">
                            <h4 class="fst-italic">Image</h4>
                            <div class="mb-0">
                            {blog.imageUrl && (
                                <div>
                                   <img src={blog.imageUrl} alt="Blog Image" />
                                </div>
                            )}
                        </div>
                        <div className="button-container">
                            <button className="btn btn-danger" onClick={removeBlogHandler} > Delete </button>
                            <button className="btn btn-warning"onClick={() => setIsEditing(true)} > Update </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
       </main>
    )
        }
        }
         
        export default SelectedBlog;