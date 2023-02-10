import React from "react";
import { useState } from "react";

export default function OrderRaces () {
const [order, setOrder] = useState();

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
onChange={(e) => {setOrder(e.target.value)}}
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
