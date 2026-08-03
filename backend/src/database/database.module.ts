import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow<string>('database.uri'),
        dbName: configService.getOrThrow<string>('database.dbName'),
        autoIndex: configService.get<string>('app.env') !== 'production',
      }),
    }),
  ],
})
export class DatabaseModule {}
