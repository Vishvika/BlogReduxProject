import BlogList from "../components/BlogList";
import { useSelector } from "react-redux";
import NewBlog from "../components/NewBlog/NewBlog";


function HomePage(){
    const showDisplay = useSelector(state => state.ui.displayIsVisible)

    return (<div>
       {showDisplay && <NewBlog />}
       <BlogList /> 
    </div>)
}

export default HomePage;