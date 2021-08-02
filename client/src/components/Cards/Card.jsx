import React from 'react';
import './Card.css'

function Card ({ name, image,  nickname}) {
 return (
    <div>
        <h3>{name}</h3>
        <h4>{nickname}</h4>
        <img className = 'pic'src={image} alt={"img"}/> 
    </div>
   
   
 )
}

export default Card