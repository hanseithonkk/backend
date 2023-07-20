import { GroupService } from './group.service';
import { GroupController } from './group.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Module({
    imports: [],
    controllers: [
        GroupController,
    ],
    providers: [
        PrismaService,
        GroupService,
    ],
})
export class GroupModule { }
