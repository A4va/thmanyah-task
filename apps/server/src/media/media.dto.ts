import { IsNumber, IsOptional, IsString } from 'class-validator';

export class searchMediaDto {
  @IsString()
  term: string;

  @IsOptional()
  @IsNumber()
  limit: number;
}
