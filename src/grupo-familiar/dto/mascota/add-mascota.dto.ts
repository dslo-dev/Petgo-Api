import { IsUUID } from 'class-validator';

export class AddMascotaDto {
	@IsUUID()
	grupoId!: string;

	@IsUUID()
	mascotaId!: string;
}
