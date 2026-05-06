import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	//prefijo global de la api
	app.setGlobalPrefix('api/v1');
	//habilitar los pipe
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
		}),
	);
	//configuracion del puerto
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
