import { PartialType } from '@nestjs/mapped-types';
import { CreateMicrochipDto } from './create-microchip.dto';

export class UpdateMicrochipDto extends PartialType(CreateMicrochipDto) {}
