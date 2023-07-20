import { GroupModule } from './group/group.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    GroupModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
