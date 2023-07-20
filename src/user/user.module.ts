import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
    imports: [],
    controllers: [
        UserController,
    ],
    providers: [
        PrismaService,
        UserService
    ],
})
export class UserModule { }
