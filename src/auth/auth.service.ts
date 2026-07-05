import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDTO } from './dto/LoginDTO';
import { UserService } from 'src/user/user.service';
import { createUserDTO } from 'src/user/dto/usuario/createUserDTO';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
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
		const isValidPass = await bcrypt.compare(body.password, user.contraseña);
		if (isValidPass) {
			const payload = {
				sub: user.id,
				id: user.id,
				email: user.email,
			};
			return {
				nombreUsuario: user.nombreUsuario,
				email: user.email,
				access_token: await this.jwtService.signAsync(payload),
			};
		} else {
			throw new UnauthorizedException('Usuario Incorrecto o contraseña ');
		}
	}
	//regitro
	async registro(body: createUserDTO) {
		//validacion
		const user = await this.userService.find(body.email);
		if (user) {
			throw new BadRequestException('usuario existente');
		}
		//hash contraseña
		const newPassword = await bcrypt.hash(body.contraseña, 10);
		const newUser = { ...body, contraseña: newPassword };
		//creacion
		const created = await this.userService.create(newUser);
		return {
			email: created.email,
		};
	}
}
