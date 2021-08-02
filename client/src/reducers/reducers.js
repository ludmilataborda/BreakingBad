import { GET_CHARACTERS,GET_DETAIL,GET_NAMES, FILTER_STATUS, FILTER_CREATED, FILTER_SORT, OCCUPATIONS_TYPES,POST_CHARACTER } from "../actions/actions";
/* import { filDiets, sorts } from './functions.js' */

const initialState = {
   
    charaDeatil:{},
    characters:[],
     allCharacters:[],
     occupations:[]
  };
  

function rootReducer(state= initialState, action){
   switch(action.type) {
     case GET_CHARACTERS: return {
           ...state, 
           characters: action.payload, 
           allCharacters:action.payload
              
       }
       case OCCUPATIONS_TYPES: 
             return {
                 ...state,
                 occupations: action.payload 
      } 
      case GET_NAMES: return {
        ...state, 
        characters: action.payload,        
    }
      case GET_DETAIL: 
            return {
              ...state,
             charaDeatil: action.payload 
      }  
      case POST_CHARACTER: 
            return {
            ...state,
          }  
      case FILTER_STATUS:
        const allCharacters = state.allCharacters
        const statusFiltered = action.payload === 'All' ? allCharacters : allCharacters.filter(el => el.status === action.payload)
        return {
            ...state,
            characters: statusFiltered
        }
        case FILTER_CREATED:
            const statusFiltered2 = action.payload === 'created' ? state.allCharacters.filter(el => el.createdindb) : state.allCharacters.filter(el => !el.createdindb)
             return {
              ...state,
              characters: action.payload === 'All' ? state.allCharacters : statusFiltered2
            }
        case FILTER_SORT:
                const sorts = (str, arr) => {
                  if(str === 'asc') {
                      return arr.sort((unaMascota, otraMascota) => unaMascota.name.localeCompare(otraMascota.name))
                  }
                 if(str === 'desc') {
                   return arr.sort((unaMascota, otraMascota) => otraMascota.name.localeCompare(unaMascota.name))    
                 }
                 };
                return {
                    ...state,
                    characters: sorts(action.payload, state.characters)
                }
         default: 
                  return state;
   }
}

export default rootReducer;