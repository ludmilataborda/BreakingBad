import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharaDetails, getClear } from '../../actions/actions';

import { NavLink, useParams  } from 'react-router-dom';

function Detail () {
    const [loading, setLoading] = useState(false);
    const charaDet  = useSelector((state) => state.charaDeatil);
    const {idPersonaje} = useParams()
    const dispatch = useDispatch();

    useEffect(() => { 
        setLoading(true)
        dispatch(getCharaDetails(idPersonaje))  
        setLoading(false)      
        return () => dispatch(getClear())
    },[idPersonaje, dispatch]);
   console.log(charaDet)

   
if(loading === true) {
    return <h1>Loading...</h1>
  }
  return (
    <div className = 'recipe1'>
       
     <div className = 'tyb'>

      <NavLink to='/home' >
        <button className = 'b5'>all characters</button>
      </NavLink>
      </div> 
      
       {charaDet.length === 1 ? 
         <div> 
         <h2 className = 't4'>{charaDet[0].name}</h2> 
      <img className='pic2'  src={charaDet.image ? charaDet.image :'https://www.adherencia-cronicidad-pacientes.com/wp-content/uploads/2020/03/Recurso_comida_saludable-scaled.jpg'} alt="img"/>

 
       <div className = 'dietypes2'>
      {charaDet.occupation ?charaDet.occupation.map((f,i) =>  (f.name ? <p key = {i}>{f.name}</p>: <p key ={i}>{f}</p>)) : <> </>} 
      </div>  
        <div className ='scores'>
         {charaDet.nickname ? <h5> {charaDet.nickname}</h5> : <> </> }
         {charaDet.birthdate ? <h5> {charaDet.birthdate}</h5> : <> </> }
         {charaDet.status ? <h5> {charaDet.status}</h5> : <> </> }
      </div>  
        </div> 
      :<h1> Loading ...</h1>} 
   
    
  </div>

);
}

export default Detail