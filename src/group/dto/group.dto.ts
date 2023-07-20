import { ArrayMaxSize, ArrayMinSize, IsArray, IsDate, IsNumber, IsString, Length, Min } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupDto {
    @IsString()
    @Length(2, 30)
    @ApiProperty({ description: '모임 제목' })
    title: string

    @IsString()
    @ApiProperty({ description: '모임 위치' })
    location: string

    @Type(() => Date)
    @IsDate()
    @ApiProperty({ description: '모임 날자' })
    meetingDate: Date

    @IsString()
    @Length(2)
    @ApiProperty({ description: '모임 내용' })
    content: string

    @IsString()
    @Length(2)
    @ApiProperty({ description: '모임 중요 내용 like `참여하기 전에 꼭 읽어주세요!`' })
    important: string

    @IsNumber()
    @Min(2)
    @ApiProperty({ description: '최대 모임 인원' })
    maxUser: number
}

export class InvolveDto {
    @IsString()
    @Length(2)
    @ApiProperty({ description: '모임 참여 메시지' })
    comment: string
}

export class LocationDto {
    @IsString()
    @ApiProperty({ description: '모임 위치' })
    location: string
}