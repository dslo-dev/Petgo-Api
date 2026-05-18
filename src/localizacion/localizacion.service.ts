import { Injectable } from '@nestjs/common';
import { CreateLocalizacionDto } from './dto/create-localizacion.dto';
import { UpdateLocalizacionDto } from './dto/update-localizacion.dto';

@Injectable()
export class LocalizacionService {
	create(createLocalizacionDto: CreateLocalizacionDto) {
		return 'This action adds a new localizacion';
	}

	findAll() {
		return `This action returns all localizacion`;
	}

	findOne(id: number) {
		return `This action returns a #${id} localizacion`;
	}

	update(id: number, updateLocalizacionDto: UpdateLocalizacionDto) {
		return `This action updates a #${id} localizacion`;
	}

	remove(id: number) {
		return `This action removes a #${id} localizacion`;
	}
}
