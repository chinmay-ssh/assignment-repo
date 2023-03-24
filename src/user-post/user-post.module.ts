import { Module } from '@nestjs/common';
import { UserPostService } from './user-post.service';
import { UserPostController } from './user-post.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserPost } from './entities/user-post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AnonymousStrategy } from 'src/auth/strategies/anonymous.strategy';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([UserPost]), AuthModule],
  controllers: [UserPostController],
  providers: [UserPostService],
  exports: [UserPostService],
})
export class UserPostModule { }
