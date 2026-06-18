import { IsUUID } from 'class-validator';

export class AceptarInvitacionDto {
	@IsUUID()
	invitacionId!: string;
}
