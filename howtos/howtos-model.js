const db = require('../database/dbConfig.js');

function getHowTos() {
    return db("howtos")
}

function getSteps(id) {
    return db('howtos as h')
        .join('steps as s', 's.howto_id', 'h.id')
        .where('h.id', id)
        .select("s.step_number", "s.name")
}

module.exports = {
    getHowTos,
    getSteps
}