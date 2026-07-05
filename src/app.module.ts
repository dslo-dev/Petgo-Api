import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LocalizacionModule } from './localizacion/localizacion.module';
import { GrupoFamiliarModule } from './grupo-familiar/grupo-familiar.module';
import { MascotasModule } from './mascotas/mascotas.module';
import { JwtAuthGuard } from './common/auth/jwt-auth.guard';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory: (config: ConfigService) => ({
				type: 'postgres',
				host: config.get<string>('DB_HOST'),
				port: parseInt(config.get<string>('DB_PORT') ?? '5433', 10),
				username: config.get<string>('DB_USER'),
				password: config.get<string>('DB_PASSWORD'),
				database: config.get<string>('DB_NAME'),
				autoLoadEntities: true,
				synchronize: true,
			}),
		}),
		UserModule,
		AuthModule,
		LocalizacionModule,
		GrupoFamiliarModule,
		MascotasModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{ provide: APP_GUARD, useClass: JwtAuthGuard },
	],
})
export class AppModule {}
