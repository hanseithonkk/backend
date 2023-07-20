import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGroupDto } from './dto/group.dto';

@Injectable()
export class GroupService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    /**
     * 모임을 만듭니다.
     */
    async create(
        userId: number,
        data: CreateGroupDto
    ) {

    }
}
