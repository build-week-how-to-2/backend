const db = require('../database/dbConfig.js');

function getHowTos() {
    return db("howtos as h")
            .join('users as u', 'u.id', 'h.creator_id')
            .select("h.id", 'u.username as creator', 'h.name', 'h.body', 'h.img', 'h.cat', 'h.upvotes', 'h.downvotes')
}

function get(id) {
    return db("howtos as h")
    .join('users as u', 'u.id', 'h.creator_id')
    .where('h.id', id)
    .select("h.id", 'u.username as creator', 'h.name', 'h.body', 'h.img', 'h.cat', 'h.upvotes', 'h.downvotes')
}

function findBy(filter) {
    if(filter){
        return db("howtos")
            .where(filter);
    } else {
        return db("howtos");
    }
}

function creatorHowto(filter) {
    return db("howtos as h")
            .join("users as u", "u.id", "h.creator_id")
            .where(filter)
            .select("h.id", 'u.username as creator', 'h.name', 'h.body', 'h.img', 'h.cat', 'h.upvotes', 'h.downvotes')
}

async function addHowto(howto) {
    const [id] = await db("howtos").insert(howto, "id");
    return findBy({id});
}

async function updateHowto(howto, howtoId) {
    const foo = await db("howtos")
        .where("id", howtoId)
        .update(howto);
    return findBy({id: howtoId});
}

async function deleteHowto(id) {
    const foo = await db("howtos")
        .where("id", id)
        .del()
    return findBy({id: id});
}

module.exports = {
    get,
    getHowTos,
    findBy,
    addHowto,
    updateHowto,
    deleteHowto,
    creatorHowto
}