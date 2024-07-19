import uiSlice from "./ui-slice";
import { blogsActions } from "./blog-list-slice";

export const fetchBlogData = () => {
    return async dispatch => {
        const fetchData = async () => {
            const response = await fetch('https://blog-app-redux-8eede-default-rtdb.asia-southeast1.firebasedatabase.app/list.json');

            if(!response.ok){
                throw new Error('Failed to fetch data');
            }

            const data = response.json();

            return data;

        }

        try{
            const blogData = await fetchData();
            dispatch(blogsActions.replaceList({
                blogItems: blogData.items || [],
            }))
            console.log(blogData);
        }
        catch(error){
            throw new Error("Failed to fetch data")
        }
    }
}
