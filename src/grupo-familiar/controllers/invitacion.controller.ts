import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { InvitacionService } from '../services/invitacion.service';
import { CreateInvitacionDto } from '../dto/invitacion/create-invitacion.dto';
import { CurrentUser } from '../../common/auth/current-user.decorator';

@ApiTags('Invitaciones')
@Controller('invitaciones')
export class InvitacionController {
	constructor(private readonly invitacionService: InvitacionService) {}

	@Post()
	@ApiOperation({ summary: 'Crear una invitación (solo dueño del grupo)' })
	@ApiResponse({ status: 201, description: 'Invitación creada' })
	crear(@Body() dto: CreateInvitacionDto, @CurrentUser('sub') usuarioId: string) {
		return this.invitacionService.crear(dto, usuarioId);
	}

	@Get('pendientes')
	@ApiOperation({ summary: 'Listar invitaciones pendientes del usuario autenticado' })
	@ApiResponse({ status: 200, description: 'Lista de invitaciones' })
	listarPendientes(@CurrentUser('sub') usuarioId: string) {
		return this.invitacionService.listarPorUsuario(usuarioId);
	}

	@Post(':id/aceptar')
	@ApiOperation({ summary: 'Aceptar una invitación (auto-crea miembro en el grupo)' })
	@ApiResponse({ status: 200, description: 'Invitación aceptada' })
	aceptar(@Param('id') id: string, @CurrentUser('sub') usuarioId: string) {
		return this.invitacionService.aceptar(id, usuarioId);
	}

	@Post(':id/rechazar')
	@ApiOperation({ summary: 'Rechazar una invitación' })
	@ApiResponse({ status: 200, description: 'Invitación rechazada' })
	rechazar(@Param('id') id: string, @CurrentUser('sub') usuarioId: string) {
		return this.invitacionService.rechazar(id, usuarioId);
	}
}
