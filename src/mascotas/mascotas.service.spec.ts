import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { MascotasService } from './mascotas.service';
import { Mascota } from './entities/mascota.entity';

describe('MascotasService', () => {
	let service: MascotasService;

	const mockMascotaRepository = {
		create: jest.fn(),
		save: jest.fn(),
		find: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				MascotasService,
				{
					provide: getRepositoryToken(Mascota),
					useValue: mockMascotaRepository,
				},
			],
		}).compile();

		service = module.get<MascotasService>(MascotasService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should create a mascota', async () => {
		const dto = {
			nombre: 'Firulais',
			peso: 10,
			sexo: 'M',
			nacimiento: '2020-01-01',
			especieId: 'uuid-especie',
			razaId: 'uuid-raza',
			microchipCodigo: '12345',
		};

		const mascotaMock = { id: '1', ...dto, creadoPor: 'user-1' };

		mockMascotaRepository.create.mockReturnValue(mascotaMock);
		mockMascotaRepository.save.mockResolvedValue(mascotaMock);

		const result = await service.create(dto as any, 'user-1');

		expect(result).toEqual(mascotaMock);
		expect(mockMascotaRepository.create).toHaveBeenCalledWith({ ...dto, creadoPor: 'user-1' });
		expect(mockMascotaRepository.save).toHaveBeenCalled();
	});

	it('should update a mascota if owner', async () => {
		const updateDto = { nombre: 'Nuevo nombre' };

		const existingMascota = {
			id: '1',
			creadoPor: 'user-1',
			nombre: 'Original',
		};

		const updatedMascota = {
			...existingMascota,
			nombre: 'Nuevo nombre',
		};

		mockMascotaRepository.findOne
			.mockResolvedValueOnce(existingMascota)
			.mockResolvedValueOnce(updatedMascota);
		mockMascotaRepository.update.mockResolvedValue({ affected: 1 });

		const result = await service.update('1', updateDto as any, 'user-1');

		expect(result).toEqual(updatedMascota);
		expect(mockMascotaRepository.update).toHaveBeenCalledWith('1', updateDto);
	});

	it('should throw if not owner on update', async () => {
		const mascota = { id: '1', creadoPor: 'user-1' };
		mockMascotaRepository.findOne.mockResolvedValue(mascota);

		await expect(service.update('1', {} as any, 'user-2')).rejects.toThrow();
		expect(mockMascotaRepository.update).not.toHaveBeenCalled();
	});

	it('should throw if mascota not found on delete', async () => {
		mockMascotaRepository.findOne.mockResolvedValue(null);

		await expect(service.remove('1', 'user-1')).rejects.toThrow(NotFoundException);
	});
});
