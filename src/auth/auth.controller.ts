import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/LoginDTO';
import { RegisterDTO } from './dto/RegisterDTO';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../common/auth/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('/login')
	@ApiOperation({ summary: 'Inicio de Sesion' })
	login(@Body() loginUserDto: LoginDTO) {
		return this.authService.login(loginUserDto);
	}

	@Public()
	@Post('/registro')
	@ApiOperation({ summary: 'Crear una cuenta nueva' })
	registro(@Body() body: RegisterDTO) {
		return this.authService.registro(body);
	}
}
