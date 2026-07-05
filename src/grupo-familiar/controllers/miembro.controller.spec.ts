import { Test } from '@nestjs/testing';
import { MiembroController } from './miembro.controller';
import { MiembroService } from '../services/miembro.service';

describe('MiembroController', () => {
	let controller: MiembroController;

	const mockService = {
		agregarMiembro: jest.fn(),
		obtenerMiembrosPorGrupo: jest.fn(),
		cambiarRol: jest.fn(),
		expulsar: jest.fn(),
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [MiembroController],
			providers: [{ provide: MiembroService, useValue: mockService }],
		}).compile();

		controller = module.get<MiembroController>(MiembroController);
		jest.clearAllMocks();
	});

	it('agregarMiembro pasa dto y CurrentUser', async () => {
		const dto = { grupoId: 'g-1', usuarioId: 'u-2', rol: 'CUIDADOR' };
		mockService.agregarMiembro.mockResolvedValue({ id: 'm-1' });
		const result = await controller.agregarMiembro(dto as any, 'user-1');
		expect(mockService.agregarMiembro).toHaveBeenCalledWith(dto, 'user-1');
	});

	it('obtenerMiembros pasa grupoId', async () => {
		mockService.obtenerMiembrosPorGrupo.mockResolvedValue([]);
		await controller.obtenerMiembros('g-1');
		expect(mockService.obtenerMiembrosPorGrupo).toHaveBeenCalledWith('g-1');
	});

	it('cambiarRol pasa dto y CurrentUser', async () => {
		mockService.cambiarRol.mockResolvedValue({ id: 'm-1', rol: 'CUIDADOR' });
		await controller.cambiarRol({ miembroId: 'm-1', rol: 'CUIDADOR' as any }, 'user-1');
		expect(mockService.cambiarRol).toHaveBeenCalledWith({ miembroId: 'm-1', rol: 'CUIDADOR' }, 'user-1');
	});

	it('expulsar pasa id y CurrentUser', async () => {
		mockService.expulsar.mockResolvedValue({ message: 'ok' });
		await controller.expulsar('m-1', 'user-1');
		expect(mockService.expulsar).toHaveBeenCalledWith('m-1', 'user-1');
	});
});
