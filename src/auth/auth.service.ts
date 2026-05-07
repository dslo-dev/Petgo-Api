import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/LoginDTO';
import { UserService } from 'src/user/user.service';
import { createUserDTO } from 'src/user/dto/createUserDTO';
import bcrypt from 'node_modules/bcryptjs';
@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async login(body: LoginDTO) {
		const user = await this.userService.find(body.email);
		if (!user) {
			throw new BadRequestException('Usuario Incorrecto');
		}
		const isValidPass = await bcrypt.compare(user.password, body.password);
		if (isValidPass) {
			const payload = {
				id: user.id,
				email: user.email,
			};
			
		}
		return body;
	}

	async registro(body: createUserDTO) {
		const user = await this.userService.find(body.email);
		if (user) {
			throw new BadRequestException('usuario existente');
		}
		const newPassword = await bcrypt.hash(body.password, 10);
		const newUser = { ...body, password: newPassword };
		const created = await this.userService.create(newUser);
		return {
			id: created.id,
			email: created.email,
		};
	}
}
