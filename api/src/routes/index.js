const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Character, Occupation} = require('../db.js');
const axios = require('axios');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const infoapi = async () => {
    const obj = await axios.get('https://breakingbadapi.com/api/characters'); 
    const results = obj.data
     let arr= results.map(e => {
      e = {
        id: e.char_id,
        name:e.name,
        nickname:e.nickname,
        birthdate:e.birthday,
        status:e.status,  
        image:e.img, 
        occupation: e.occupation
      }
      return e
  });
 // console.log(arr)
  return arr; 
  }  


 //infoapi()
  
  
  
  
  
  const dbInfo = async () => {
    const charabd = await Character.findAll({
        include:{
          model: Occupation,
          attributes: ['name'],
          through : {
            attributes:[],
          },
        }
      });
       if(!charabd.length) {
        return []
      }
      else { 
        return charabd;
     }
  }
  
  const both = async () => {
    const myInfo = await infoapi()
    const db = await dbInfo()
    const unidos = db.concat(myInfo)
    return unidos;
  }
 
   
  
   
  router.get('/characters', async function(req, res) {
  
    let {name} = req.query;
    let all = await both()
  
      //SI NO TENGO QUERY
      if(!name) {
         // console.log(myInfo.length)
         console.log('todas las recetas ', all.length)
         return res.send(all)
         }
     //SI TENGO QUERY     
      else {
         const result= all.filter(e =>  {
              if(e.name.toLowerCase().includes(name.toLocaleLowerCase()) === true){
              return e
              }
          });
        //SI QUERY Q ME PASAN NO EXISTE
         if(result.length < 1) {
          return res.status(400).send('no existe receta con ese nombre')
        }
      //SI EXISTE y son mas de 9
        if(result.length > 6) {
         let arr= result.slice(0,6)
        //console.log(arr.length)
         return res.json(arr)
        }
       // console.log(result.length)
        return  res.json(result)
    }
  }); 


/*   [ ] GET /character/{idPersonaje}:
Obtener el detalle de un personaje en particular
Debe traer solo los datos pedidos en la ruta de detalle de personaje
Incluir las ocupaciones asociadas
*/
router.get('/character/:idPersonaje', async function(req, res) {
  /*  GET /recipes/{idReceta}:  */
   

let {idPersonaje} = req.params;
let all = await both()
console.log(idPersonaje)
const chara= all.filter(e => {
  if(e.id == idPersonaje) {
    return e;
  } });
 
   if(chara) { 
    return  res.json(chara)
   } 
  else {  return res.send('no existe character')}  

 });

/* [ ] GET /ocupaciones:
Obtener todas las ocupaciones posibles
En una primera instancia deberán obtenerlas desde la API externa y guardarlas en su propia base de datos y luego ya utilizarlas desde allí
 */
const p = async () => {
const info = await infoapi();
const exocc = info.map(e => e.occupation)
const occu = exocc.flat()

return occu
}

router.get('/occupations', async function(req, res) {
 let occupations = await p();
 for( var i = 0; i < occupations.length; i++ ){
      Occupation.findOrCreate({
       where: { name: occupations[i]}
    })
}
const occTypes = await Occupation.findAll()


return res.send(occTypes)
  }); 


/* [ ] POST /character
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de personaje por body
Crea un personaje en la base de datos  */
router.post('/characters',async function(req, res) {
  const {name, nickname, birthday,status, occupation,createdindb, image } = req.body;
  
      const charaCreated = await Character.create({
          name,
          nickname,
          birthdate:birthday ,
          status,
          image,
          createdindb
    }); 
  
    let occupationOndb= await Occupation.findAll({where: {
      name: occupation
    } })
    charaCreated.addOccupation(occupationOndb) 
  
    res.send('chara created'); 
  });


 
module.exports = router;
