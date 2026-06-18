import { IsUUID } from 'class-validator';

export class CreateInvitacionDto {
	@IsUUID()
	grupoId!: string;

	@IsUUID()
	usuarioId!: string;
}
