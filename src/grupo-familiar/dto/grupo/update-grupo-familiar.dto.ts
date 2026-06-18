import { PartialType } from '@nestjs/mapped-types';
import { CreateGrupoFamiliarDto } from './create-grupo-familiar.dto';

export class UpdateGrupoFamiliarDto extends PartialType(CreateGrupoFamiliarDto) {}
