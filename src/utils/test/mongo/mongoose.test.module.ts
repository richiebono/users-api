import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) => MongooseModule.forRootAsync({
  useFactory: async () => {
    mongod = await MongoMemoryServer.create();
    const mongoUri = await mongod.getUri();
    return {
      uri: mongoUri,
      ...options,
    }
  },
});

export const closeInMongodConnection = async () => {
    await mongoose.connection.close()
    await mongod.stop();
  
}