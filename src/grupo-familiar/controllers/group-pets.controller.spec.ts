import { Test } from '@nestjs/testing';
import { GroupPetsController } from './group-pets.controller';
import { GroupPetsService } from '../services/group-pets.service';

describe('GroupPetsController', () => {
	let controller: GroupPetsController;

	const mockService = {
		agregarMascota: jest.fn(),
		listarMascotasDelGrupo: jest.fn(),
		removerMascota: jest.fn(),
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [GroupPetsController],
			providers: [{ provide: GroupPetsService, useValue: mockService }],
		}).compile();

		controller = module.get<GroupPetsController>(GroupPetsController);
		jest.clearAllMocks();
	});

	it('agregarMascota pasa grupoId, dto y CurrentUser', async () => {
		mockService.agregarMascota.mockResolvedValue({ id: 'gm-1' });
		const result = await controller.agregarMascota('g-1', { grupoId: 'g-1', mascotaId: 'm-1' }, 'user-1');
		expect(mockService.agregarMascota).toHaveBeenCalledWith({ grupoId: 'g-1', mascotaId: 'm-1' }, 'user-1');
	});

	it('listarMascotas pasa grupoId', async () => {
		mockService.listarMascotasDelGrupo.mockResolvedValue([]);
		await controller.listarMascotas('g-1');
		expect(mockService.listarMascotasDelGrupo).toHaveBeenCalledWith('g-1');
	});

	it('removerMascota pasa grupoId, mascotaId y CurrentUser', async () => {
		mockService.removerMascota.mockResolvedValue({ message: 'ok' });
		await controller.removerMascota('g-1', 'm-1', 'user-1');
		expect(mockService.removerMascota).toHaveBeenCalledWith('g-1', 'm-1', 'user-1');
	});
});
