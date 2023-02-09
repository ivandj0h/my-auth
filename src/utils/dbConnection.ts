import * as mongoose from "mongoose";
import config from "config";

const dbURI = `mongodb://${config.get('dbName')}:${config.get('dbPassword')}@localhost:6000/mydb?authSource=admin`;
const dbConnection = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB...');
    } catch (error: any) {
        console.log(error.message);
        setTimeout(dbConnection, 5000);
    }
}

export default dbConnection;