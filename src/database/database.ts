import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

export class DBConnection {
  static connect = (): DynamicModule => {
    const { DB_USER, DB_PASSWORD, DB_NAME, DB_APP_NAME } = process.env;

    const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@clusterproject.z9qmktj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=${DB_APP_NAME}`;

    return MongooseModule.forRoot(url);
  };
}
