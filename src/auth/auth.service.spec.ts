import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';

jest.mock('bcryptjs');

const mockUserService = { find: jest.fn(), create: jest.fn() };
const mockJwtService = { signAsync: jest.fn() };

describe('AuthService', () => {
	let service: AuthService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				AuthService,
				{ provide: UserService, useValue: mockUserService },
				{ provide: JwtService, useValue: mockJwtService },
			],
		}).compile();

		service = module.get<AuthService>(AuthService);
		jest.clearAllMocks();
	});

	it('login devuelve token si el usuario existe', async () => {
		mockUserService.find.mockResolvedValue({ id: 1, email: 'a@a.com', nombreUsuario: 'Juan', contraseña: 'hash' });
		(bcrypt.compare as jest.Mock).mockResolvedValue(true);
		mockJwtService.signAsync.mockResolvedValue('mi_token');

		const result = await service.login({ email: 'a@a.com', password: 'password123' });

		expect(result.access_token).toBe('mi_token');
	});

	it('login falla si el usuario no existe', async () => {
		mockUserService.find.mockResolvedValue(null);

		await expect(service.login({ email: 'noexiste@a.com', password: 'password123' })).rejects.toThrow(
			UnauthorizedException,
		);
	});

	it('registro crea el usuario correctamente', async () => {
		mockUserService.find.mockResolvedValue(null);
		(bcrypt.hash as jest.Mock).mockResolvedValue('hash123');
		mockUserService.create.mockResolvedValue({ email: 'nuevo@a.com' });

		const result = await service.registro({
			nombreUsuario: 'Juan',
			email: 'nuevo@a.com',
			contraseña: 'password123',
			roles: [1],
			perfil: {} as any,
		});

		expect(result).toEqual({ email: 'nuevo@a.com' });
	});

	it('registro falla si el usuario ya existe', async () => {
		mockUserService.find.mockResolvedValue({ email: 'existe@a.com' });

		await expect(
			service.registro({
				nombreUsuario: 'Juan',
				email: 'existe@a.com',
				contraseña: 'password123',
				roles: [1],
				perfil: {} as any,
			}),
		).rejects.toThrow(BadRequestException);
	});
});
