import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateGroupDto, InvolveDto, LocationDto } from './dto/group.dto';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
    constructor(
        private readonly groupService: GroupService
    ) { }

    @Post()
    async create(
        @Query('nickname')
        nickname: string,
        @Body()
        data: CreateGroupDto
    ) { return await this.groupService.create(nickname, data) }

    @Get()
    async getAll() { return await this.groupService.all() }

    @Get('my')
    async myGroup(
        @Query('nickname')
        nickname: string,
    ) { return await this.groupService.myMeeting(nickname) }


    @Post(':groupId/involves')
    async involve(
        @Param('groupId', new ParseIntPipe())
        groupId: number,
        @Query('nickname')
        nickname: string,
        @Body()
        data: InvolveDto
    ) { return await this.groupService.involve(nickname, groupId, data) }

    @Delete(':groupId/involves')
    async removeInvolve(
        @Param('groupId', new ParseIntPipe())
        groupId: number,
        @Query('nickname')
        nickname: string,
    ) { return await this.groupService.calcelInvolve(nickname, groupId) }

    @Patch(':groupId/locations')
    async location(
        @Param('groupId', new ParseIntPipe())
        groupId: number,
        @Query('nickname')
        nickname: string,
        @Body()
        data: LocationDto
    ) { return await this.groupService.location(nickname, groupId, data.location) }

    @Get(':groupId/locations')
    async locations(
        @Param('groupId', new ParseIntPipe())
        groupId: number,
    ) { return await this.groupService.getLocations(groupId) }
}
