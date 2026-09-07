import mongoose from "mongoose";


try {
  await mongoose.connect(process.env.MONGO_URI!, {
    dbName: 'ecommerce-db',
      });
  console.log('\x1b[35mMongoDB connected via Mongoose\x1b[0m');
} catch (error) {
  console.error('MongoDB connection error:', error);
  process.exit(1);
}


function envOrThrow(key: string){
    if(!process.env[key]){
        throw new Error(` ${key} is missing in .env`)
    }
    return process.env[key];
}
