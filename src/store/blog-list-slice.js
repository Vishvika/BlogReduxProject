import { createSlice } from "@reduxjs/toolkit";
import { CardTitle } from "react-bootstrap";

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogItems: [],
    },
    reducers: {
        replaceList(state, action){
            state.blogItems = action.payload.blogItems; 
        },
        addBlog(state, action){
            const newBlogItem = action.payload;
            console.log(newBlogItem);

            state.blogItems.push({
                id: Math.random().toString(),
                title: newBlogItem.enteredTitle,
                content: newBlogItem.enteredContent,
                imageUrl: newBlogItem.imageUrl,
                // img: newBlogItem.selectedFile,
                })
        },
        removeBlog(state, action){
            const id = action.payload;
            state.blogItems = state.blogItems.filter((blogItem) => blogItem.id !== id)
        },
        updateBlog(state, action){
            const updatedBlog = action.payload;
            const existingBlog = state.blogItems.find((blog) => String(blog.id) === updatedBlog.id);
            if(existingBlog){
                existingBlog.title = updatedBlog.enteredTitle;
                existingBlog.content = updatedBlog.enteredContent;
                existingBlog.imageUrl = updatedBlog.imageUrl;                
            }

        }
    }
}
)
export const blogsActions = blogsSlice.actions;

export default blogsSlice;