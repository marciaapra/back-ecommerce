import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

export class DBConnection {
  static connect = (): DynamicModule => {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    return TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      synchronize: true,
      autoLoadEntities: true,
      entities: [join(__dirname, '/../**/**.entity{.ts,.js}')],
      migrations: ['dist/database/migrations/*{.ts,.js}'],
      migrationsRun: true,
    });
  };
}
