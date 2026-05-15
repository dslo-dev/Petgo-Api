import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, IsNumber, IsUrl } from 'class-validator';

export class CreateProfileDto {
	@IsOptional()
	@IsUrl()
	avatar?: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	name!: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(100)
	lastname!: string;

	@IsOptional()
	@IsBoolean()
	isActive?: boolean;

	@IsNumber()
	roleId!: number;
}
