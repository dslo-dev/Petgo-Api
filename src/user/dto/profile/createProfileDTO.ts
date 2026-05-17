import { IsNotEmpty, IsOptional, IsString, MaxLength, IsUrl, ValidateNested, IsObject } from 'class-validator';
import { Role } from 'src/user/entities/role.entity';
import { Type } from 'class-transformer';
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

	@ValidateNested()
	@Type(() => Role)
	@IsObject()
	role!: Role;
}
