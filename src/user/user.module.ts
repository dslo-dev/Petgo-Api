import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileModule } from './profile/profile.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from './profile/entities/profile.entity';

@Module({
	imports: [ProfileModule, TypeOrmModule.forFeature([User, Profile])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
