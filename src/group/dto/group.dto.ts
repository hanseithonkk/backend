import { ArrayMaxSize, ArrayMinSize, IsArray, IsDate, IsString, Length } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGroupDto {
    @IsString()
    @Length(2, 30)
    @ApiProperty({ description: '모임 제목' })
    title: string

    @IsArray()
    @IsString({ each: true })
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @ApiProperty({ description: '모임 위치' })
    location: string[]

    @Type(() => Date)
    @IsDate()
    @ApiProperty({ description: '모임 날자' })
    meetingDate: Date

    @IsString()
    @Length(2)
    @ApiProperty({ description: '게시글 내용' })
    content: string

    @IsString()
    @Length(2)
    @ApiProperty({ description: '게시글 중요 내용 like `참여하기 전에 꼭 읽어주세요!`' })
    important: string
}