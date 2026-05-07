import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDTO } from 'src/auth/dto/RegisterDTO';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { updateUserDTO } from './dto/updateUserDTO';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}
	async create(body: RegisterDTO) {
		try {
			const userNew = this.userRepository.create(body);
			const user = await this.userRepository.save(userNew);
			return user;
		} catch (error) {
			console.error(error);
			throw new BadRequestException();
		}
	}
	async find(email: string) {
		const user = await this.userRepository.findOneBy({ email });
		return user;
	}

	async findOne(id: number) {
		const user = this.userRepository.findOne({
			where: { id },
			relations: { profile: true },
		});
		return user;
	}

	async update(body: updateUserDTO, id: number) {
		const existente = await this.userRepository.findOneBy({ id });
		if (!existente) {
			throw new BadRequestException('Usuario no existente');
		}
	}

	remove(id: number) {
		return id;
	}
	// validacion y extra
}
