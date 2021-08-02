import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOccupations, postsCharatoBack } from '../../actions/actions';
//import axios from 'axios';
import { NavLink, useHistory } from 'react-router-dom';
import './Post.css'



/*  function validate(input) { 
  let errors = {};
  if (!input.name) {
    errors.name = 'Name is required';
    //                     
  }

  if (!input.dishResume) {
    errors.dishResume = 'Summary is required';
  } 
  return errors;
}; */


function Post() {

 const dispatch = useDispatch();
 const history = useHistory()
 const [input, setInput] = useState({
    name: '',
    nickname:'',
    birthday:'',
    status:'',
    image:'',
    createdindb: true,
    occupation:[]
  });

/*   const [errors, setErrors] = useState({}) */

 
 useEffect(() => {
       dispatch(getOccupations())        
  },[dispatch]);

let occ = useSelector((state) => state.occupations);



  function handleChange(e) { 
  setInput({...input, 
    [e.target.name]: e.target.value});

 //setErrors(validate({...input,[e.target.name]: e.target.value}));
} 

 /* const handleOnChange = (position) => {
  let updatedCheckedState = checkedState.map((item, index) =>
    index === position ? !item && input.dietType.push(index) : item
  ); */
/*     setCheckedState(updatedCheckedState); */

function handleCheck(e) {
  if (e.target.checked){
    setInput({
        ...input,
        status: e.target.value
    })
}
}
function handleSelect(e){
  setInput({
      ...input,
      occupation: [...input.occupation,e.target.value]
  })
}
function handleSubmit(e) {
  e.preventDefault() 
  console.log(input)
 dispatch(postsCharatoBack(input))  
 alert("Personaje creado!!")
    setInput({
        name:" ",
        nickname: '',
        birthdate: '',
        status: '',
        image: '',
        occupation:[]  
    }) 
    history.push('/home')
}
 /*  if(loading) {
      return <h2>Loading...</h2>
  } */

    return (
      <div className='post'>

        <div className = 'h1yb'>
           <NavLink to='/home' >
            <button className = 'b5'>BACK</button>
            </NavLink>
            <h2 className = 't6'>Fill to create your own character</h2>
         </div>

          
             <form onSubmit={(e)=>handleSubmit(e)}>
             <div className= 'form'>

         
              <div className = 'v1'> 
             <label >Name: </label> 
             <input
              className = 'z1'
           /*      className = {errors.name ? 'danger' : 'z1'} */
			        	name='name'
                type= 'text'
			        	value={input.name}
			    	   onChange={(e)=>handleChange(e)}
			    	    placeholder='Recipe Name'
		         />
            {/*   {errors.name && (<p className="danger">{errors.name}</p>)} */}
             </div>
             
              <div className = 'v3'>
              <label>Nickname:</label> 
                 <input
                /*    className = {errors.dishResume ? 'danger' : 'z3'} */
                   className = 'z3'
                   type= 'text'
				           name='nickname'
				           value={input.nickname}
				           onChange={(e)=>handleChange(e)}
			          	 placeholder='nickname'
		              />
                 {/*   {errors.dishResume && (<p className="danger">{errors.dishResume}</p>)} */}
             </div>

             <div className = 'v4'>
            <label>Birthday</label> 
              <input
                className ='z4'
                type= 'text'
			        	name='birthday'
			    	    value={input.birthday}
				        onChange={(e)=>handleChange(e)}
				        placeholder='birthday'
		         	/>
            </div>

            <div className = 'v5'>
            <label>status:</label> 
                <label><input
                    type="checkbox"
                    name="Alive"
                    value= "Alive"
                    onChange={(e)=>handleCheck(e)}
                    />Alive</label>

                <label><input
                    type="checkbox"
                    name="Deceased"
                    value= "Deceased"
                    onChange={(e)=>handleCheck(e)}
                    />Deceased</label>

                <label><input
                    type="checkbox"
                    name="Unknown"
                    value= "Unknown"
                    onChange={(e)=>handleCheck(e)}
                    />Unknown</label>

                  <label><input
                    type="checkbox"
                    name="Presumed dead"
                    value= "Presumed dead"
                    onChange={(e)=>handleCheck(e)}
                    />Presumed dead</label>
		      </div>

          <div className = 'v6'>
            <label>Image:</label> 
		     	<input
           className='z6'
			   	   name='image'
			      	value={input.image}
			        onChange={(e)=>handleChange(e)}
			   	   placeholder='image'
			        />
             </div>
  
             {/* <div className = 'v2'>
            <label>Status: </label>
               <ul className="u8">
                  {diets.map((e , index) => {
               return (
                      <div >
                <li className='listd1' key={index +1}>
     */}
              {/*   <input
               type="checkbox"
                id={index}
                name={e.name}
                value={e.name}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)} 
                  />
             <label htmlFor={`custom-checkbox-${index}`}>{e.name}</label>
                   </li>
                 </div>
                   );
               })}
              </ul>
              </div> */}
              <select onChange={(e) => handleSelect(e)}>
               {occ.map((o) => (
                   <option value={o.name}>{o.name}</option>
                ))}
                </select>
                <ul><li>{input.occupation.map(el => el + " ,")}</li></ul>

            <button className='b8' type="submit">send</button>  
			  </div> 
          </form> 
         

        </div>

    );
}
export default Post;  