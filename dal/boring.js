const mongodb = require("../utilities/database");


const getBoringDb = async () => {
    const boringCollection = "boring";
    return mongodb.getDb(boringCollection);
};

const getAll = async () => {
    try {
        const db = await getBoringDb();
        return await db.find({}).toArray();
    } catch (err) {
        console.error(err);
    }
};

const getOne = async (id) => {
    try {
        const db = await getBoringDb();
        const contact = await db.findOne({id: id});
        console.log(contact);
        return contact;
    } catch (err) {
        console.error(err);
    }
};

const createBoring = async (id, boring) => {
    const db = await getBoringDb();
    const response = await db.insertOne({id, ...boring});
    console.log(response);
    return await getOne(id);
};

const updateBoring = async (id, boring) => {
    const oldBoring = await getOne(id);
    for (const key in boring) {
        if (boring[key] !== oldBoring[key] && boring[key] !== undefined && boring[key] !== null) {
            oldBoring[key] = boring[key];
        }
    }
    const db = await getBoringDb();
    const response = await db.replaceOne({id}, {...oldBoring});
    console.log(response);
    if (response.modifiedCount > 0) {
        return await getOne(id);
    } else {
        return null;
    }
};

const deleteBoring = async (id) => {
    const db = await getBoringDb();
    const response = await db.deleteOne({id: id});
    console.log(response);
    return response.deletedCount > 0;
};

module.exports = {
    getAll,
    getOne,
    createBoring,
    updateBoring,
    deleteBoring,
};
