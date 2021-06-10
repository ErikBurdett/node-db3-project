const db = require('../../data/db-config')
function find() { 

   return db("schemes as sc")
   .select("sc.*")
   .count("st.step_id as number_of_steps")
   .leftJoin("steps as st", "sc.scheme_id", "st.scheme_id")
   .groupBy("sc.scheme_id")
   .orderBy("sc.scheme_id", "asc")
}

function findById(scheme_id) { 
  const data = await db('schemes as sc')
    .leftJoin('steps as st', 'sc.scheme_id', 'st.scheme_id')
    .select('sc.scheme_name', 'st.*')
    .orderBy('st.step_number', 'asc')
    .where('sc.scheme_id', scheme_id)

    return {
      scheme_id: data[0].scheme_id,
      scheme_name: data[0].scheme_name,
      steps: [
        data.map(items => {
          return {
            step_id: items.step_id,
            step_number: items.step_number,
            instructions: items.instructions
          }
        })
      ]
    }


    }

function findSteps(scheme_id) { 
  
  
  return db("steps as st")
  .leftJoin("schemes as sc", "st.scheme_id", "sc.scheme_id")
  .where("st.scheme_id", scheme_id)
  .select("sc.scheme_name", "st.")
  .orderBy("st.step_number", "asc")
  
  
}

function add(scheme) { 
 
 return db("schemes").insert(scheme)
}

function addStep(scheme_id, step) { 
  
 const data = { scheme_id: scheme_id, ...step} 
  await db("steps").insert(data)

  return findSteps(scheme_id)
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  addStep,
}