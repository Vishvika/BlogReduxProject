import { useState, useEffect } from "react";

export default function DateInput(){
const [date, setDate] = useState();

useEffect(()=>{
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setDate(formattedDate); 
},[])

return <div>
    <p onChange={(e)=>setDate(e.target.value)}>{date} </p>
    {/* <label htmlFor="date">today: </label>
    <input type="date" id="date" ref={ref}  /> */}
</div>
}
