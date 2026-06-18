import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { updateUserDTO } from './dto/usuario/updateUserDTO';
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: updateUserDTO) {
		return this.userService.update(updateUserDto, +id);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	}
}
