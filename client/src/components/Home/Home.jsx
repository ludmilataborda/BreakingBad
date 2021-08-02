
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters,filterByStatus, filterByDb, sortNames, getNames } from '../../actions/actions';
import { Link } from 'react-router-dom';
import Card from '../Cards/Card';
import Pagination from '../pagination/Pagination';

function Home() {
 const [input, setInput]= useState('') 

 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage] = useState(6);
 const [orden, setOrden]= useState('')


 const allCha = useSelector ((state) => state.characters)
 const dispatch = useDispatch()

    useEffect (()=>{
        dispatch(getCharacters());
    },[dispatch])

 const indexOfLastPost = currentPage * postsPerPage;
 const indexofFirstPost = indexOfLastPost - postsPerPage;
 let currentPosts = allCha.slice(indexofFirstPost, indexOfLastPost);
 const paginate = pageNumber => setCurrentPage(pageNumber);

 function handleChange(e){
   setInput(e.target.value)
    }
const handleSubmit =  function (e) {
    e.preventDefault();
   dispatch(getNames(input)); 
     }

 function handleClick(e){
    e.preventDefault();
    dispatch(getCharacters());
    }
 function handlefilterSatus(e) {
     dispatch(filterByStatus(e.target.value))
 }
 function handleCreated(e) {
     dispatch(filterByDb(e.target.value))
 }
 function handleSort (e){
    e.preventDefault();
    dispatch(sortNames(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
 }
    
  return (
    <div className="App">

      <h1> Breaking Bad App</h1>
      <button onClick={e=> {handleClick(e)}}>
          All Characters
         </button>

        <div>
        <div className = 'searchAndButt'> 
         <Link to='/post'>
             <button className = 'b1'> Create your own character</button>
        </Link>
           
           
        <form onSubmit={handleSubmit} >
            <label className = 'l1'>Search by name: </label>
            <input
              className= 'i1'
              name='name'
              type= 'text'
              value={input}
              onChange={handleChange}
              placeholder='name'
            />
          <button className ='b2' type="submit">Search</button> 
          
       </form> 
        </div> 
       </div>
   
      <select onChange={e => handleSort(e)}>
          <option value= 'asc'>Ascendente</option>
          <option value= 'desc'>Descendente</option>
      </select>
    
      <select onChange= {e=> handlefilterSatus(e)}>
          <option value='All'>Todos</option>
          <option value='Alive'>Vivo</option>
          <option value='Deceased'>Muerto</option>
          <option value='Unknown'>Desconocido</option>
          <option value='Presumed dead'>Probablemente muerto</option>
      </select>

      <select onChange= {e=> handleCreated(e)}>
          <option value='All'>Todos</option>
          <option value= 'created'>Creados</option>
          <option value='api'>Existente</option>
      </select> 

      <div className = 'all'>
         {currentPosts?.map((c) => {
        return (
          <fragment className='cartas'>
            <Link to={"/home/" + c.id}>
              <Card name={c.name} image={c.image} nickname={c.nickname}  key={c.id} />
            </Link>
          </fragment>
        );
            })} 
              </div>
              <div>
      <Pagination postsPerPage ={postsPerPage} totalPosts = {allCha.length} paginate={paginate}/> 
    </div>
    </div>
  );
 
}

export default Home;

/* 
Ruta principal: debe contener

[ ] Input de búsqueda para encontrar personajes por nombre
[ ] Área donde se verá el listado de personajes. Deberá mostrar su:
Imagen
Nombre
Nickname
[ ] Botones/Opciones para filtrar por status y por personaje existente o agregado por nosotros
[ ] Boton/Opcion para ordenar tanto ascendentemente como descendentemente los personajes por orden alfabético
[ ] Paginado para ir buscando y mostrando los siguientes personajes */