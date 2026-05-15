import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/LoginDTO';
import { UserService } from 'src/user/user.service';
import { createUserDTO } from 'src/user/dto/createUserDTO';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'node_modules/bcryptjs';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
	) {}
	// login
	async login(body: LoginDTO) {
		const user = await this.userService.find(body.email);
		if (!user) {
			throw new UnauthorizedException('Usuario Incorrecto o contraseña ');
		}
		const isValidPass = await bcrypt.compare(body.password, user.password);
		if (isValidPass) {
			const payload = {
				id: user.id,
				email: user.email,
			};
			return {
				username: user.username,
				user: user.email,
				access_token: await this.jwtService.signAsync(payload),
			};
		} else {
			throw new UnauthorizedException('Usuario Incorrecto o contraseña ');
		}
	}
	//regitro
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
