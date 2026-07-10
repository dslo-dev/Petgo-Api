import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

import { GrupoFamiliarService } from './grupo-familiar.service';
import { GrupoFamiliar } from '../entities/grupo-familiar.entity';
import { MiembroGrupo } from '../entities/miembro-grupo.entity';
import { Rol, Estado } from '../../common/Enums';

describe('GrupoFamiliarService', () => {
	let service: GrupoFamiliarService;

	const mockGrupoRepository = {
		create: jest.fn(),
		save: jest.fn(),
		find: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
	};

	const mockMiembroRepository = {
		create: jest.fn(),
		save: jest.fn(),
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				GrupoFamiliarService,
				{ provide: getRepositoryToken(GrupoFamiliar), useValue: mockGrupoRepository },
				{ provide: getRepositoryToken(MiembroGrupo), useValue: mockMiembroRepository },
			],
		}).compile();

		service = module.get<GrupoFamiliarService>(GrupoFamiliarService);
		jest.clearAllMocks();
	});

	describe('create', () => {
		it('crea el grupo con el usuario autenticado como dueño y miembro DUENO', async () => {
			const dto = { nombre: 'Familia Test' };

			const grupoCreado = { id: 'grupo-1', nombre: 'Familia Test', propietarioId: 'user-1', creadoPor: 'user-1', miembros: [], invitaciones: [], mascotas: [] };
			const duenoCreado = { id: 'm-1', usuarioId: 'user-1', rol: Rol.DUENO };

			mockGrupoRepository.create.mockReturnValue(grupoCreado);
			mockGrupoRepository.save.mockResolvedValue(grupoCreado);
			mockMiembroRepository.create.mockReturnValue(duenoCreado);
			mockMiembroRepository.save.mockResolvedValue(duenoCreado);
			mockGrupoRepository.findOne.mockResolvedValue({
				...grupoCreado,
				miembros: [duenoCreado],
				invitaciones: [],
				mascotas: [],
			});

			const result = await service.create(dto as any, 'user-1');

			expect(mockGrupoRepository.create).toHaveBeenCalledWith(
				expect.objectContaining({ propietarioId: 'user-1', creadoPor: 'user-1' }),
			);
			expect(mockMiembroRepository.create).toHaveBeenCalledWith(
				expect.objectContaining({ usuarioId: 'user-1', rol: Rol.DUENO }),
			);
			expect(result.propietarioId).toBe('user-1');
		});
	});

	describe('update', () => {
		it('actualiza el grupo si es el dueño', async () => {
			const grupo = { id: '1', propietarioId: 'user-1', nombre: 'Viejo', miembros: [], invitaciones: [], mascotas: [] };
			mockGrupoRepository.findOne.mockResolvedValue(grupo);
			mockGrupoRepository.update.mockResolvedValue({ affected: 1 });

			await service.update('1', { nombre: 'Nuevo' }, 'user-1');
			expect(mockGrupoRepository.update).toHaveBeenCalledWith('1', { nombre: 'Nuevo' });
		});

		it('lanza BadRequestException si no es el dueño', async () => {
			mockGrupoRepository.findOne.mockResolvedValue({ id: '1', propietarioId: 'user-1' });
			await expect(service.update('1', { nombre: 'Nuevo' }, 'otro-user')).rejects.toThrow(BadRequestException);
		});
	});

	describe('remove', () => {
		it('aplica soft delete si es el dueño', async () => {
			const grupo = { id: '1', propietarioId: 'user-1', estado: Estado.ACTIVO };
			mockGrupoRepository.findOne.mockResolvedValue(grupo);
			mockGrupoRepository.save.mockResolvedValue({ ...grupo, estado: Estado.ELIMINADO });

			await service.remove('1', 'user-1');
			expect(mockGrupoRepository.save).toHaveBeenCalledWith(
				expect.objectContaining({ estado: Estado.ELIMINADO }),
			);
		});
	});
});
