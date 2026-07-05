import { Test } from '@nestjs/testing';
import { InvitacionController } from './invitacion.controller';
import { InvitacionService } from '../services/invitacion.service';

describe('InvitacionController', () => {
	let controller: InvitacionController;

	const mockService = {
		crear: jest.fn(),
		listarPorUsuario: jest.fn(),
		aceptar: jest.fn(),
		rechazar: jest.fn(),
	};

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [InvitacionController],
			providers: [{ provide: InvitacionService, useValue: mockService }],
		}).compile();

		controller = module.get<InvitacionController>(InvitacionController);
		jest.clearAllMocks();
	});

	it('crear pasa dto y CurrentUser', async () => {
		mockService.crear.mockResolvedValue({ id: 'inv-1' });
		const result = await controller.crear({ grupoId: 'g-1', usuarioId: 'u-2' }, 'user-1');
		expect(mockService.crear).toHaveBeenCalledWith({ grupoId: 'g-1', usuarioId: 'u-2' }, 'user-1');
	});

	it('listarPendientes pasa CurrentUser', async () => {
		mockService.listarPorUsuario.mockResolvedValue([]);
		await controller.listarPendientes('user-1');
		expect(mockService.listarPorUsuario).toHaveBeenCalledWith('user-1');
	});

	it('aceptar pasa id y CurrentUser', async () => {
		mockService.aceptar.mockResolvedValue({ message: 'ok' });
		const result = await controller.aceptar('inv-1', 'user-2');
		expect(mockService.aceptar).toHaveBeenCalledWith('inv-1', 'user-2');
	});

	it('rechazar pasa id y CurrentUser', async () => {
		mockService.rechazar.mockResolvedValue({ message: 'ok' });
		await controller.rechazar('inv-1', 'user-2');
		expect(mockService.rechazar).toHaveBeenCalledWith('inv-1', 'user-2');
	});
});
