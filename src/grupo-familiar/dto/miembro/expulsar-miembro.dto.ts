import { IsUUID } from 'class-validator';

export class ExpulsarMiembroDto {
	@IsUUID()
	miembroId!: string;
}
