import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
	@IsOptional()
	avatar!: string;

	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsString()
	@IsNotEmpty()
	lastname!: string;
}
