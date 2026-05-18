import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
	@IsNotEmpty()
	@IsNumberString()
	id!: number;

	@IsOptional()
	@IsString()
	nombre!: string;
}
