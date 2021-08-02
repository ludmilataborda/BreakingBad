import axios from "axios";

export const GET_CHARACTERS = 'GET_CHARACTERS';
export const GET_DETAIL ='GET_DETAIL';
export const FILTER_STATUS = 'FILTER_STATUS';
export const FILTER_CREATED = 'FILTER_CREATED';
export const FILTER_SORT = 'FILTER_SORT'; 
export const OCCUPATIONS_TYPES = 'OCCUPATION_TYPES';
export const POST_CHARACTER = 'POST_CHARACTER'
export const GET_NAMES = 'GET_NAMES';



export  function getCharacters() {
    return (dispatch) => {
       axios.get('http://localhost:3001/characters').then((response) => {
      dispatch({type: GET_CHARACTERS, payload: response.data});     
      });
     }
    }

 export function getNames(name) {
       return (dispatch) => {
        return axios.get("http://localhost:3001/characters?name="+name)
            .then((response) => {
                dispatch({ type: GET_NAMES, payload:response.data });
            });
    }
 };
 
 export  function getCharaDetails(idPersonaje) {
    return (dispatch) => {
       axios.get('http://localhost:3001/character/'+idPersonaje).then((response) => {
      dispatch({type: GET_DETAIL, payload: response.data});     
      });
     }
    }
export function getClear() {
    return {
        type: GET_DETAIL, payload: []
    }
}

export function filterByStatus(value) {
    return { type:FILTER_STATUS, 
             payload:value }
}
export function filterByDb(value) {
    return { type:FILTER_CREATED, 
             payload:value }
}
 export function sortNames(order) {
    return {
        type: FILTER_SORT,
        payload: order
    }
} 

export function getOccupations() {
    return (dispatch) => {
        return axios.get("http://localhost:3001/occupations")
          .then((response) => {
              dispatch({type: OCCUPATIONS_TYPES, payload:response.data});
          });
    }
};

export function postsCharatoBack(value) {
    return async function(dispatch) {
       const response= await axios.post('http://localhost:3001/characters', value)
          return response 
    }
}
