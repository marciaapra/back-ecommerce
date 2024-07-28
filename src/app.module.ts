import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DBConnection } from './database/database';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    DBConnection.connect(),
    ProductModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
