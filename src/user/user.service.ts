import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDTO } from 'src/auth/dto/RegisterDTO';
import { User } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { updateUserDTO } from './dto/usuario/updateUserDTO';
import { Role } from './entities/rol.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,

		@InjectRepository(Role)
		private readonly roleRepository: Repository<Role>,
	) {}

	async create(body: RegisterDTO) {
		try {
			const roles = await this.roleRepository.findBy({
				id: In(body.roleIds),
			});

			if (roles.length !== body.roleIds.length) {
				throw new BadRequestException('Uno o más roles no existen');
			}

			const userNew = this.userRepository.create({
				username: body.username,
				email: body.email,
				password: body.password,
				roles,
				profile: {
					avatar: body.profile.avatar,
					name: body.profile.name,
					lastname: body.profile.lastname,
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
