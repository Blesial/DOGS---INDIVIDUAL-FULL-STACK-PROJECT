import React from "react";
import notStyles from "./NotFound.module.css";

function NotFound() {
  
  return (
    <>
    <div className={notStyles.container}>
      <h1>Dog not found :( </h1>
  
     <div className={notStyles.img}> <img src='https://media.tenor.com/bN2IkZ5vzxIAAAAM/byuntear-meme.gif' alt='' /> </div>
  

    </div>
    </>

  );
}

export default NotFound;