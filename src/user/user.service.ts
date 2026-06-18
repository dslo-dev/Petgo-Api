import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDTO } from 'src/auth/dto/RegisterDTO';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { updateUserDTO } from './dto/usuario/updateUserDTO';
import { Rol } from './entities/rol.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(Usuario)
		private readonly userRepository: Repository<Usuario>,

		@InjectRepository(Rol)
		private readonly roleRepository: Repository<Rol>,
	) {}

	async create(body: RegisterDTO) {
		try {
			const roles = await this.roleRepository.findBy({
				id: In(body.roles),
			});

			if (roles.length !== body.roles.length) {
				throw new BadRequestException('Uno o más roles no existen');
			}

			const userNew = this.userRepository.create({
				nombreUsuario: body.nombreUsuario,
				email: body.email,
				contraseña: body.contraseña,
				roles,
				perfil: {
					avatar: body.perfil.avatar,
					nombre: body.perfil.nombre,
					appat: body.perfil.appat,
					apmat: body.perfil.apmat,
					nacimiento: body.perfil.nacimiento,
					contacto: {
						telefonoPrincipal: body.perfil.contacto.telefonoPrincipal,
						telefonoSegundario: body.perfil.contacto.telefonoSegundario,
						email: body.perfil.contacto.email,
					},
				},
			});

			return await this.userRepository.save(userNew);
		} catch (error) {
			console.error(error);
			throw new BadRequestException('Error al crear usuario');
		}
	}

	async find(email: string) {
		return await this.userRepository.findOneBy({ email });
	}

	async findOne(id: number) {
		return await this.userRepository.findOne({
			where: { id },
		});
	}

	async update(body: updateUserDTO, id: number) {
		const existente = await this.userRepository.findOneBy({ id });

		if (!existente) {
			throw new BadRequestException('Usuario no existente');
		}

		return existente;
	}

	remove(id: number) {
		return id;
	}
}
