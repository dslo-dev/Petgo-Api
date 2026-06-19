import { Test } from '@nestjs/testing';
import { MascotasController } from './mascotas.controller';
import { MascotasService } from './mascotas.service';

describe('MascotasController', () => {
  let controller: MascotasController;

  const mockMascotasService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [MascotasController],
      providers: [
        {
          provide: MascotasService,
          useValue: mockMascotasService,
        },
      ],
    }).compile();

    controller = module.get<MascotasController>(MascotasController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // CREATE
  it('should create a mascota', async () => {
    const dto = { nombre: 'Firulais' };
    const resultMock = { id: '1', nombre: 'Firulais' };

    mockMascotasService.create.mockResolvedValue(resultMock);

    const result = await controller.create(dto as any);

    expect(result).toEqual(resultMock);
    expect(mockMascotasService.create).toHaveBeenCalledWith(dto);
  });

  // FIND ALL
  it('should return all mascotas', async () => {
    const data = [{ id: '1' }];

    mockMascotasService.findAll.mockResolvedValue(data);

    const result = await controller.findAll();

    expect(result).toEqual(data);
    expect(mockMascotasService.findAll).toHaveBeenCalled();
  });

  // FIND ONE
  it('should return one mascota', async () => {
    const mascota = { id: '1' };

    mockMascotasService.findOne.mockResolvedValue(mascota);

    const result = await controller.findOne('1');

    expect(result).toEqual(mascota);
    expect(mockMascotasService.findOne).toHaveBeenCalledWith('1');
  });

  // UPDATE
  it('should update a mascota', async () => {
    const dto = { nombre: 'Nuevo' };
    const updated = { id: '1', nombre: 'Nuevo' };

    mockMascotasService.update.mockResolvedValue(updated);

    const result = await controller.update('1', dto as any);

    expect(result).toEqual(updated);
    expect(mockMascotasService.update).toHaveBeenCalledWith('1', dto);
  });

  // DELETE
  it('should remove a mascota', async () => {
    mockMascotasService.remove.mockResolvedValue({ deleted: true });

    const result = await controller.remove('1');

    expect(result).toEqual({ deleted: true });
    expect(mockMascotasService.remove).toHaveBeenCalledWith('1');
  });
});
