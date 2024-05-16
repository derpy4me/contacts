const mongodb = require("../utilities/database");

const getSevenFieldsDb = async () => {
    const sevenFields = "sevenFields";
    return mongodb.getDb(sevenFields);
};

const getAll = async () => {
    try {
        const db = await getSevenFieldsDb();
        return await db.find({}).toArray();
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const getOne = async (id) => {
    try {
        const db = await getSevenFieldsDb();
        const sevenField = await db.findOne({id: id});
        console.log(sevenField);
        return sevenField;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const createSevenFields = async (id, sevenFields) => {
    try {
        const db = await getSevenFieldsDb();
        const response = await db.insertOne({id, ...sevenFields});
        console.log(response);
        return await getOne(id);
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const updateSevenFields = async (id, sevenFields) => {
    try {
        const oldSevenFields = await getOne(id);
        for (const key in sevenFields) {
            if (sevenFields[key] !== oldSevenFields[key] && sevenFields[key] !== undefined && sevenFields[key] !== null) {
                oldSevenFields[key] = sevenFields[key];
            }
        }
        const db = await getSevenFieldsDb();
        const response = await db.replaceOne({id: id}, {...oldSevenFields});
        console.log(response);
        if (response.modifiedCount > 0) {
            return await getOne(id);
        } else {
            return null;
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const deleteSevenFields = async (id) => {
    try {
        const db = await getSevenFieldsDb();
        const response = await db.deleteOne({id: id});
        console.log(response);
        return response.deletedCount > 0;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {
    getAll,
    getOne,
    createSevenFields,
    updateSevenFields,
    deleteSevenFields,
};
