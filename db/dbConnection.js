import mongoose from 'mongoose'

const dbName = 'levelpro'

const dbConnect = async () => {
    try{
        const conn = await mongoose.connect(`${process.env.MONGO_DB_URI}/${dbName}`)
        console.log(`\x1b[1m\x1b[32mMONGO DB Connected Succesfuly To\x1b[0m \x1b[1m\x1b[34m${conn.connection.db.databaseName}\x1b[0m`);
    }
    catch(err){
        console.error(`Something Went Wrong to connect to ${dbName}` + err)
    }
}

export {dbConnect, dbName}