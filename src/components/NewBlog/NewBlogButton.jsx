import { useSelector, useDispatch } from "react-redux"
import { Button } from "react-bootstrap";
import { uiActions } from "../../store/ui-slice";

export default function NewBlogButton(){
    const dispatch = useDispatch();

    function handleToggle(){
        dispatch(uiActions.toggleDisplay());
    }


    return (
        <Button onClick={handleToggle} variant="outline-success">Create Blog</Button>
    )
}
