import { Test } from '@nestjs/testing';
import { GrupoFamiliarController } from './grupo-familiar.controller';
import { GrupoFamiliarService } from '../services/grupo-familiar.service';

describe('GrupoFamiliarController', () => {
	let controller: GrupoFamiliarController;

	const mockService = {
		create: jest.fn(),
		findAll: jest.fn(),
		findOne: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [GrupoFamiliarController],
			providers: [{ provide: GrupoFamiliarService, useValue: mockService }],
		}).compile();

		controller = module.get<GrupoFamiliarController>(GrupoFamiliarController);
		jest.clearAllMocks();
	});

	it('create pasa dto y CurrentUser', async () => {
		const dto = { nombre: 'Test' };
		mockService.create.mockResolvedValue({ id: 'g-1' });
		const result = await controller.create(dto as any, 'user-1');
		expect(result).toEqual({ id: 'g-1' });
		expect(mockService.create).toHaveBeenCalledWith(dto, 'user-1');
	});

	it('findAll llama al servicio con query opcional', async () => {
		mockService.findAll.mockResolvedValue([]);
		await controller.findAll('user-1');
		expect(mockService.findAll).toHaveBeenCalledWith('user-1');
	});

	it('findAll sin query llama al servicio sin argumentos', async () => {
		mockService.findAll.mockResolvedValue([]);
		await controller.findAll();
		expect(mockService.findAll).toHaveBeenCalledWith(undefined);
	});

	it('findOne llama al servicio con el id', async () => {
		mockService.findOne.mockResolvedValue({ id: 'g-1' });
		const result = await controller.findOne('g-1');
		expect(result).toEqual({ id: 'g-1' });
		expect(mockService.findOne).toHaveBeenCalledWith('g-1');
	});

	it('update pasa id, dto y CurrentUser', async () => {
		const dto = { nombre: 'Nuevo' };
		mockService.update.mockResolvedValue({ id: 'g-1' });
		const result = await controller.update('g-1', dto as any, 'user-1');
		expect(mockService.update).toHaveBeenCalledWith('g-1', dto, 'user-1');
	});

	it('remove pasa id y CurrentUser', async () => {
		mockService.remove.mockResolvedValue(undefined);
		await controller.remove('g-1', 'user-1');
		expect(mockService.remove).toHaveBeenCalledWith('g-1', 'user-1');
	});
});
