const db = require('../database/dbConfig.js');

function getHowTos() {
    return db("howtos")
}

function findBy(filter) {
    if(filter){
        return db("howtos")
            .where(filter);
    } else {
        return db("howtos");
    }
}

function getSteps(id) {
    return db('howtos as h')
        .join('steps as s', 's.howto_id', 'h.id')
        .where('h.id', id)
        .select("s.step_number", "s.name")
}

async function addHowto(howto) {
    const [id] = await db("howtos").insert(howto, "id");
    return findBy({id});
}

module.exports = {
    getHowTos,
    getSteps,
    findBy,
    addHowto
}