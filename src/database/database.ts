import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

export class DBConnection {
  static connect = (): DynamicModule => {
    const dbUser = process.env.DB_USER;
    const dbPassword = process.env.DB_PASSWORD;
    const dbName = process.env.DB_NAME;
    const dbAppName = process.env.DB_APP_NAME;

    const url = `mongodb+srv://${dbUser}:${dbPassword}@clusterproject.z9qmktj.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbAppName}`;

    return MongooseModule.forRoot(url);
  };
}
