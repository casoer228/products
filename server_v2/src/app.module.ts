import { Module } from '@nestjs/common';
import Controllers from './controllers';
import Providers from './providers';
import Entities from './entities';
import * as ormconfig from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature(Entities)
  ],
  controllers: Controllers,
  providers: Providers,
})
export class AppModule {}
