import { IsUUID } from 'class-validator';

export class RechazarInvitacionDto {
	@IsUUID()
	invitacionId!: string;
}
