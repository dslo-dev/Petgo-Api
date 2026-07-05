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

	// CREATE
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

	// FIND ALL
	it('should return all mascotas', async () => {
		const mascotas = [
			{ id: '1', nombre: 'Firulais' },
			{ id: '2', nombre: 'Luna' },
		];

		mockMascotaRepository.find.mockResolvedValue(mascotas);

		const result = await service.findAll();

		expect(result).toEqual(mascotas);
		expect(mockMascotaRepository.find).toHaveBeenCalledWith({
			where: {},
			relations: ['especie', 'raza', 'microchip'],
		});
	});

	it('should filter by usuarioId', async () => {
		const mascotas = [{ id: '1', creadoPor: 'u-1' }];

		mockMascotaRepository.find.mockResolvedValue(mascotas);

		const result = await service.findAll('u-1');

		expect(result).toEqual(mascotas);
		expect(mockMascotaRepository.find).toHaveBeenCalledWith({
			where: { creadoPor: 'u-1' },
			relations: ['especie', 'raza', 'microchip'],
		});
	});

	// FIND ONE
	it('should return one mascota by id', async () => {
		const mascota = { id: '1', nombre: 'Firulais' };

		mockMascotaRepository.findOne.mockResolvedValue(mascota);

		const result = await service.findOne('1');

		expect(result).toEqual(mascota);
		expect(mockMascotaRepository.findOne).toHaveBeenCalledWith({
			where: { id: '1' },
			relations: ['especie', 'raza', 'microchip'],
		});
	});

	// UPDATE
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
			.mockResolvedValueOnce(existingMascota) // first call in update
			.mockResolvedValueOnce(updatedMascota); // after update
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

	// DELETE
	it('should delete a mascota if owner', async () => {
		const mascota = { id: '1', creadoPor: 'user-1' };
		mockMascotaRepository.findOne.mockResolvedValue(mascota);
		mockMascotaRepository.delete.mockResolvedValue({ affected: 1 });

		const result = await service.remove('1', 'user-1');

		expect(mockMascotaRepository.delete).toHaveBeenCalledWith('1');
	});

	it('should throw if not owner on delete', async () => {
		const mascota = { id: '1', creadoPor: 'user-1' };
		mockMascotaRepository.findOne.mockResolvedValue(mascota);

		await expect(service.remove('1', 'user-2')).rejects.toThrow();
		expect(mockMascotaRepository.delete).not.toHaveBeenCalled();
	});

	it('should throw if mascota not found on delete', async () => {
		mockMascotaRepository.findOne.mockResolvedValue(null);

		await expect(service.remove('1', 'user-1')).rejects.toThrow(NotFoundException);
	});
});
