import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { blogsActions } from '../../store/blog-list-slice';
import { useState } from 'react';
import { uiActions } from '../../store/ui-slice';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { storage } from '../firebase-setup/firebase';
import Modal from '../Modal/Modal';

function NewBlog(){
    const dispatch = useDispatch();
    const title = useRef('');
    const content = useRef('');
    const modalRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);

    // if(enteredContent.trim() === "" || enteredTitle.trim() === "" 
    // ||  !selectedFile 
    // ){
    //     modal.current.open();
    // }
   

    const addBlogHandler = async () => {
        const enteredTitle = title.current?.value;
        const enteredContent = content.current?.value;

        if(!enteredContent.trim() || !enteredTitle.trim() || !selectedFile){
            modalRef.current.open();
            return;
        }

        let imageUrl = "";

        if(selectedFile){
            const storageRef = ref(storage, `images/${selectedFile.name}`)
            await uploadBytes(storageRef, selectedFile);
            imageUrl = await getDownloadURL(storageRef);
        }
              
        dispatch(blogsActions.addBlog({
                enteredTitle,
                enteredContent,
                imageUrl,
        }))

        title.current.value = "";
        content.current.value = "";
        setSelectedFile(null);
        
        dispatch(uiActions.toggleDisplay())
    }
    

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        setSelectedFile(file);
    }
    
    return (
    <>
       <Modal ref={modalRef} >
        <h2>Error</h2>
        <p>Make sure you enter a value in all fields</p>
       </Modal>
        <div className='new-blog-container'>  
            <h1>Create a new Blog!</h1>
            <div className='new-blog-form'>
                <div className='left'>   
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title' ref={title} placeholder='Enter Title'/>
                    <label htmlFor="content">Blog</label>
                    <textarea id='content' ref={content} placeholder="Start writing your blog" />
                </div>
            <div className='right'>
                    <div className="image-container">

                        <input type='file' id="img" accept='image/*' onChange={handleFileChange} />
                    {/* {!selectedFile && 
                    <div>
                        <label htmlFor="img">Select an image: </label>
                        <input type="file" id="img" accept="image/*" onChange={handleFileChange}/>
                    </div>}
        
                    {selectedFile && ( 
                    <div>
                        <p>Selected file: {selectedFile.name}</p>
                        <img src={URL.createObjectURL(selectedFile)} alt="Selected Image" />
                    </div>
                    )}  */}
                    </div>
                </div>
            </div> 

            <menu className='menu'>
                <li>
                    <button className='btn' onClick={addBlogHandler}>Save</button>
                </li>
                <li>
                <button className='btn'  >Cancel</button>
                </li>
            </menu> 
        </div>
    </>
    )
}

export default NewBlog;