import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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
	//Habilitar el CORS
	app.enableCors({
		origin: 'http://localhost:3001',
		credentials: true,
	});

	//Integracion de Swagger
	const config = new DocumentBuilder()
		.setTitle('Petgo API')
		.setDescription('Documentación de la API')
		.setVersion('1.0')
		.addBearerAuth() // habilitacion del JWT
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup('api/docs', app, document);
	//configuracion del puerto
	await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
