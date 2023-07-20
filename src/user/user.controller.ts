import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(
        private readonly UserService: UserService
    ) { }

    @Post()
    async createUser(
        @Body()
        data: CreateUserDto
    ) { return await this.UserService.create(data) }

    @Get(':nickname')
    async getUser(
        @Param('nickname')
        nickname: number
    ) { return await this.UserService.get(nickname) }
}
