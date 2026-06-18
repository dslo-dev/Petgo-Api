import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { constants } from './constants';
import { TestAuthService } from './test-auth/test-auth.service';

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: constants.secret,
			signOptions: { expiresIn: '1d' },
		}),
	],
	providers: [AuthService, TestAuthService],
	controllers: [AuthController],
})
export class AuthModule {}
