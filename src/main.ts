import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	//prefijo global de la api
	app.setGlobalPrefix('api/v1');
	//habilitar los pipe
	app.useGlobalPipes();
	//configuracion del puerto
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
