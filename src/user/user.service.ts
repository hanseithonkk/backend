import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(data: CreateUserDto) {
        return await this.prisma.user.upsert({
            where: { nickname: data.nickname },
            update: {},
            create: {
                nickname: data.nickname,
                mbti: "",
                picture: null,
            },
        })
    }

    async get(nickname: number) {
        return await this.prisma.user.findUniqueOrThrow({
            where: { id: nickname }
        })
    }
}
