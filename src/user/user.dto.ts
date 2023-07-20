import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    nickname: string;

    @IsOptional()
    @IsString()
    mbti: string
}