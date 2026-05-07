import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/LoginDTO';
import { RegisterDTO } from './dto/RegisterDTO';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/login')
	login(@Body() loginUserDto: LoginDTO) {
		return this.authService.login(loginUserDto);
	}

	@Post('/register')
	registro(@Body() body: RegisterDTO) {
		return this.authService.registro(body);
	}
}
