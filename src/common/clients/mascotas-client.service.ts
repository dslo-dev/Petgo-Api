import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MascotasClientService {
	private baseUrl: string;

	constructor(private readonly config: ConfigService) {
		this.baseUrl = config.get<string>('MASCOTAS_MS_URL') ?? 'http://localhost:3003';
	}

	async obtenerMascota(id: string): Promise<{ id: string; nombre: string; especie: string } | null> {
		try {
			const response = await fetch(`${this.baseUrl}/api/v1/mascotas/${id}`);
			if (!response.ok) return null;
			return response.json();
		} catch {
			return null;
		}
	}

	async validarMascotaExiste(id: string): Promise<boolean> {
		const mascota = await this.obtenerMascota(id);
		return mascota !== null;
	}

	async obtenerMascotasPorIds(ids: string[]): Promise<Array<{ id: string; nombre: string; especie: string }>> {
		try {
			const response = await fetch(`${this.baseUrl}/api/v1/mascotas`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ids }),
			});
			if (!response.ok) return [];
			return response.json();
		} catch {
			return [];
		}
	}
}
