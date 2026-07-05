import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { InvitacionService } from './invitacion.service';
import { Invitacion } from '../entities/invitacion.entity';
import { GrupoFamiliar } from '../entities/grupo-familiar.entity';
import { MiembroGrupo } from '../entities/miembro-grupo.entity';
import { Estado, Rol } from '../../common/Enums';

describe('InvitacionService', () => {
	let service: InvitacionService;

	const mockInvitacionRepository = {
		create: jest.fn(),
		save: jest.fn(),
		findOne: jest.fn(),
		find: jest.fn(),
	};

	const mockGrupoRepository = {
		findOne: jest.fn(),
	};

	const mockMiembroRepository = {
		create: jest.fn(),
		save: jest.fn(),
		findOne: jest.fn(),
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				InvitacionService,
				{ provide: getRepositoryToken(Invitacion), useValue: mockInvitacionRepository },
				{ provide: getRepositoryToken(GrupoFamiliar), useValue: mockGrupoRepository },
				{ provide: getRepositoryToken(MiembroGrupo), useValue: mockMiembroRepository },
			],
		}).compile();

		service = module.get<InvitacionService>(InvitacionService);
		jest.clearAllMocks();
	});

	describe('crear', () => {
		it('crea invitación si es el dueño del grupo', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: 'g-1', propietarioId: 'user-1' });
			mockInvitacionRepository.create.mockReturnValue({ id: 'inv-1', usuarioId: 'user-2' });
			mockInvitacionRepository.save.mockResolvedValue({ id: 'inv-1' });

			const result = await service.crear({ grupoId: 'g-1', usuarioId: 'user-2' }, 'user-1');
			expect(result).toEqual({ id: 'inv-1' });
		});

		it('lanza NotFoundException si el grupo no existe', async () => {
			mockGrupoRepository.findOne.mockResolvedValue(null);
			await expect(service.crear({ grupoId: 'x', usuarioId: 'u-2' }, 'u-1')).rejects.toThrow(NotFoundException);
		});

		it('lanza BadRequestException si no es el dueño', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: 'g-1', propietarioId: 'user-1' });
			await expect(service.crear({ grupoId: 'g-1', usuarioId: 'user-2' }, 'otro-user')).rejects.toThrow(BadRequestException);
		});
	});

	describe('aceptar', () => {
		it('crea miembro y marca invitación como INACTIVO', async () => {
			const invitacion = {
				id: 'inv-1',
				usuarioId: 'user-2',
				estado: Estado.ACTIVO,
				grupo: { id: 'g-1' },
			};

			mockInvitacionRepository.findOne.mockResolvedValue(invitacion);
			mockMiembroRepository.create.mockReturnValue({ id: 'm-1' });
			mockMiembroRepository.save.mockResolvedValue({ id: 'm-1' });
			mockInvitacionRepository.save.mockResolvedValue({ ...invitacion, estado: Estado.INACTIVO });

			await service.aceptar('inv-1', 'user-2');
			expect(mockMiembroRepository.create).toHaveBeenCalledWith(
				expect.objectContaining({ usuarioId: 'user-2', rol: Rol.MIEMBRO }),
			);
			expect(mockInvitacionRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({ estado: Estado.INACTIVO }),
			);
		});

		it('lanza BadRequestException si la invitación no pertenece al usuario', async () => {
			mockInvitacionRepository.findOne.mockResolvedValue({ id: 'inv-1', usuarioId: 'user-2' });
			await expect(service.aceptar('inv-1', 'otro-user')).rejects.toThrow(BadRequestException);
		});

		it('lanza NotFoundException si la invitación no existe', async () => {
			mockInvitacionRepository.findOne.mockResolvedValue(null);
			await expect(service.aceptar('x', 'user-1')).rejects.toThrow(NotFoundException);
		});
	});

	describe('rechazar', () => {
		it('marca la invitación como INACTIVO', async () => {
			mockInvitacionRepository.findOne.mockResolvedValue({ id: 'inv-1', usuarioId: 'user-2', estado: Estado.ACTIVO });
			mockInvitacionRepository.save.mockResolvedValue({ id: 'inv-1', estado: Estado.INACTIVO });

			const result = await service.rechazar('inv-1', 'user-2');
			expect(mockInvitacionRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({ estado: Estado.INACTIVO }),
			);
		});

		it('lanza BadRequestException si no pertenece al usuario', async () => {
			mockInvitacionRepository.findOne.mockResolvedValue({ id: 'inv-1', usuarioId: 'user-2' });
			await expect(service.rechazar('inv-1', 'otro')).rejects.toThrow(BadRequestException);
		});
	});

	describe('listarPorUsuario', () => {
		it('retorna invitaciones activas del usuario', async () => {
			const invitaciones = [{ id: 'inv-1', usuarioId: 'user-1', estado: Estado.ACTIVO, grupo: { id: 'g-1' } }];
			mockInvitacionRepository.find.mockResolvedValue(invitaciones);

			const result = await service.listarPorUsuario('user-1');
			expect(result).toEqual(invitaciones);
			expect(mockInvitacionRepository.find).toHaveBeenCalledWith(
				expect.objectContaining({ where: { usuarioId: 'user-1', estado: Estado.ACTIVO } }),
			);
		});
	});
});
