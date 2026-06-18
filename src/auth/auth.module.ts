import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './constants';

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: constants.secret,
			signOptions: { expiresIn: '1d' },
		}),
	],
	providers: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
