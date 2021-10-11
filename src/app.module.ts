import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: ".env",
    isGlobal: true
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    // Use useFactory, useClass, or useExisting
    // to configure the ConnectionOptions.
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get<string>(DB_HOST),
      port: +configService.get<number>(DB_PORT),
      username: configService.get<string>(DB_USER),
      password: configService.get<string>(DB_PASSWORD),
      database: configService.get<string>(DB_DATABASE),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    
    // connectionFactory receives the configured ConnectionOptions
    // and returns a Promise<Connection>.
    // connectionFactory: async (options) => {
    //   const connection = await createConnection(options);
    //   return connection;
    // },
  }),
  ProductModule

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
