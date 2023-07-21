import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateGroupDto, InvolveDto } from './dto/group.dto';
import { LocationUtil } from './utils/location';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GroupService {
    locations = new LocationUtil(
        this.configService.get<string>('NCP_MAP_ACCESS_KEY'),
        this.configService.get<string>('NCP_MAP_SECRET_KEY')
    )

    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService
    ) { }

    /**
     * 모임을 만듭니다.
     */
    async create(
        nickname: string,
        data: CreateGroupDto
    ) {
        const { id } = await this.prisma.user.findUniqueOrThrow({
            where: { nickname: nickname }
        })
        const location = await this.locations.reverseGeocode(data.location)

        return await this.prisma.meeting.create({
            data: {
                title: data.title,
                userId: id,
                content: data.content,
                important: data.important,
                locationString: location,
                location: data.location,
                maxUser: data.maxUser,
                meetingDate: data.meetingDate,
                users: {
                    create: [
                        {
                            userId: id,
                            comment: null
                        },
                    ]
                }
            }
        })
    }

    async all() {
        return await this.prisma.meeting.findMany({
            include: {
                users: {
                    include: {
                        user: true
                    }
                },
                likes: true,
                user: true
            },
            orderBy: {
                id: 'desc'
            }
        })
    }

    async calcelInvolve(
        nickname: string,
        groupId: number
    ) {
        const { id } = await this.prisma.user.findUniqueOrThrow({
            where: { nickname: nickname }
        })

        await this.prisma.meetingJoin.deleteMany({
            where: { userId: id, meetingId: groupId }
        })
    }

    async involve(
        nickname: string,
        groupId: number,
        data: InvolveDto
    ) {
        const { id } = await this.prisma.user.findUniqueOrThrow({
            where: { nickname: nickname }
        })
        const ext = await this.prisma.meetingJoin.findFirst({
            where: {
                user: { nickname: nickname },
                meetingId: groupId
            }
        })
        if (ext) return ext

        return await this.prisma.meetingJoin.create({
            data: {
                userId: id,
                meetingId: groupId,
                comment: data.comment
            }
        })
    }

    // async deleteInvolve(
    //     nickname: string,
    //     groupId: number,
    // ) {
    //     const { id } = await this.prisma.user.findUniqueOrThrow({
    //         where: { nickname: nickname }
    //     })

    //     return await this.prisma.meetingJoin.delete({
    //         where: {
    //             userId: id,
    //             meetingId: groupId
    //         }
    //     })
    // }

    async location(
        nickname: string,
        meetingId: number,
        location: string
    ) {
        const { id } = await this.prisma.user.findUniqueOrThrow({
            where: { nickname: nickname }
        })
        const ext = await this.prisma.meetingLocation.findFirst({
            where: { userId: id, meetingId: meetingId }
        })

        if (ext) return ext

        return await this.prisma.meetingLocation.create({
            data: {
                userId: id,
                meetingId: meetingId,
                location
            }
        })
    }

    async getLocations(
        meetingId: number,
    ) {
        return await this.prisma.meetingLocation.findMany({
            where: {
                meetingId: meetingId
            }
        })
    }

    async myMeeting(
        nickname: string,
    ) {
        const { id } = await this.prisma.user.findUniqueOrThrow({
            where: { nickname: nickname }
        })

        const now = Date.now()

        const asdfg = await this.prisma.meeting.findMany({
            where: {
                users: {
                    some: { userId: id }
                }
            },
            include: {
                users: {
                    include: {
                        user: true
                    }
                },
                likes: true,
                user: true
            },
        })

        asdfg.sort((a, b) =>
            Math.abs(now - a.meetingDate.getTime()) -
            Math.abs(now - b.meetingDate.getTime())
        )

        return asdfg
    }
}
