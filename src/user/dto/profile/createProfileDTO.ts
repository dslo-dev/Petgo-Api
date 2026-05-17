import { IsNotEmpty, IsOptional, IsString, MaxLength, IsUrl, IsArray, IsInt, ArrayNotEmpty } from 'class-validator';

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

	@IsArray()
	@ArrayNotEmpty()
	@IsInt({ each: true })
	roleIds!: number[];
}
