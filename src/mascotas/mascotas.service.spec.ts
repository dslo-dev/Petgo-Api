import { Test } from '@nestjs/testing';
import { MascotasService } from './mascotas.service';
import { getRepositoryToken } from '@nestjs/typeorm';
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

		const mascotaMock = { id: '1', ...dto };

		mockMascotaRepository.create.mockReturnValue(mascotaMock);
		mockMascotaRepository.save.mockResolvedValue(mascotaMock);

		const result = await service.create(dto as any);

		expect(result).toEqual(mascotaMock);
		expect(mockMascotaRepository.create).toHaveBeenCalledWith(dto);
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
		expect(mockMascotaRepository.find).toHaveBeenCalled();
	});

	// FIND ONE
	it('should return one mascota by id', async () => {
		const mascota = { id: '1', nombre: 'Firulais' };

		mockMascotaRepository.findOne.mockResolvedValue(mascota);

		const result = await service.findOne('1');

		expect(result).toEqual(mascota);
		expect(mockMascotaRepository.findOne).toHaveBeenCalledWith({
			where: { id: '1' },
		});
	});

	// UPDATE
	it('should update a mascota', async () => {
		const updateDto = { nombre: 'Nuevo nombre' };

		const updatedMascota = {
			id: '1',
			nombre: 'Nuevo nombre',
		};

		mockMascotaRepository.update.mockResolvedValue({ affected: 1 });
		mockMascotaRepository.findOne.mockResolvedValue(updatedMascota);

		const result = await service.update('1', updateDto as any);

		expect(result).toEqual(updatedMascota);
		expect(mockMascotaRepository.update).toHaveBeenCalledWith('1', updateDto);
	});

	// DELETE
	it('should delete a mascota', async () => {
		mockMascotaRepository.delete.mockResolvedValue({ affected: 1 });

		const result = await service.remove('1');

		expect(mockMascotaRepository.delete).toHaveBeenCalledWith('1');
	});
});
