import mongoose from 'mongoose';
let connected = false;

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    let mongoDbUri = 'mongodb://myUser:myPassword@mongo/properties';

    //IF THERE IS PROBLEM, ADD USER
    // mongosh --username root --password example --authenticationDatabase admin
    // use properties;
    // db.createUser({
    //     user: "myUser",
    //     pwd: "myPassword",
    //     roles: [{ role: "readWrite", db: "properties" }]
    // });

    console.log(mongoDbUri);
    // If the database is already connected, don't connect again
    // if (connected) {
    //     console.log('MongoDB is already connected...');
    //
    //     return;
    // }

    // Connect to MongoDB
    try {
        await mongoose.connect(mongoDbUri);
        // const db = mongoose.connection.db;
        // const collections = await db.listCollections().toArray();
        //
        // console.log('Collections:', collections.map(c => c.name));

        connected = true;
        console.log('MongoDB connected...');
    } catch (error) {
        console.log('MongoDB not connected...');
        console.log(error);
    }
};

export default connectDB;