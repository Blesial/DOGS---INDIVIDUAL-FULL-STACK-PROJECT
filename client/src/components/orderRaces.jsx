import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { orderRace } from "../actions";

export default function OrderRaces () {
const [order, setOrder] = useState();
const dispatch = useDispatch();

useEffect(() => {
    dispatch(orderRace(order))
}, [order, dispatch])

console.log()
const handleChange = (e) => {
    setOrder(e.target.value)
}

    return (
        <div>
            <hr></hr>
 <p>Select Order :</p>
<label 
htmlFor="Ascending"
>
    Ascending
</label>
<input
type='radio'
id="Ascending"
value='Ascending'
name='order'
onChange={handleChange}
defaultChecked

/>

<label 
htmlFor="Descending"
>
    Descending
</label>
<input
type='radio'
id="Descending"
value='Descending'
name='order'
onChange={(e) => {setOrder(e.target.value)}}
/>
        </div>
    )
}
