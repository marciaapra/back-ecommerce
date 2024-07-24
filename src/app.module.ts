import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './modules/products/products.module';
import { DBConnection } from './database/database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DBConnection.connect(), ProductsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
