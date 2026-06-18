import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDTO } from './dto/usuario/updateUserDTO';

import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	@ApiOperation({ summary: 'Obtener usuario por ID' })
	@ApiParam({ name: 'id', description: 'ID del usuario' })
	@ApiResponse({ status: 200, description: 'Usuario encontrado' })
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Actualizar usuario' })
	@ApiParam({ name: 'id', description: 'ID del usuario' })
	@ApiResponse({ status: 200, description: 'Usuario actualizado' })
	update(@Param('id') id: string, @Body() updateUserDto: updateUserDTO) {
		return this.userService.update(updateUserDto, +id);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Eliminar usuario' })
	@ApiParam({ name: 'id', description: 'ID del usuario' })
	@ApiResponse({ status: 200, description: 'Usuario eliminado' })
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
