import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/users.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/auth-email-login.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginLog } from '../auth/entity/login-logs.entity';
import { v4 as uuidv4 } from 'uuid';
import { SocialInterface } from 'src/social/interfaces/social.interface';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    @InjectRepository(LoginLog) private loginRepository: Repository<LoginLog>
  ) { }

  async validateLogin(
    loginDto: LoginDto,
    onlyAdmin: boolean,
  ): Promise<{ accessToken: string; refreshToken: string; user: User }> {
    let refreshToken;
    const user = await this.usersService.findOne({
      email: loginDto.email
    });

    if (user) {
      const salt = await bcrypt.genSalt();
      const isMatch = await bcrypt.compare(loginDto.password, user.password);

      const token = await this.jwtService.sign({
        id: user.id
      });

      const existAdminRefreshToken = await this.loginRepository.findOne({
        select: ["id"],
        relations: ["user"],
        where: {
          user: {
            id: user.id
          }
        }
      })
      if (!existAdminRefreshToken) {
        refreshToken = uuidv4()
        const saveToken = await this.loginRepository.save(
          await this.loginRepository.create({
            refreshToken: refreshToken,
            accessToken: token,
            user: {
              id: user.id
            },
            isValidate: true
          })
        )
      }
      else {
        refreshToken = await this.loginRepository.findOne({
          select: ["refreshToken"],
          where: {
            id: existAdminRefreshToken.id
          }
        })
        refreshToken = refreshToken.refreshToken
      }

      return {
        accessToken: token,
        refreshToken,
        user
      }
    }
  }

  async jwtVerify(header) {
    let token = header.split(" ")
    token = token[1];
    const data = await this.jwtService.verify(token);

    return data;
  }
  // async validateSocialLogin(
  //   authProvider: string,
  //   socialData: SocialInterface,
  // ): Promise<{ token: string; user: User }> {
  //   let user: User;
  //   const socialEmail = socialData.email?.toLowerCase();

  //   const userByEmail = await this.usersService.findOne({
  //     email: socialEmail,
  //   });

  //   user = await this.usersService.findOne({
  //     email: socialEmail,
  //   });

  //   if (user) {
  //     if (socialEmail && !userByEmail) {
  //       user.email = socialEmail;
  //     }
  //     await this.usersService.update(user.id, user);
  //   } else if (userByEmail) {
  //     user = userByEmail;
  //   } else {
  //     user = await this.usersService.create({
  //       email: socialEmail,
  //       firstName: socialData.firstName,
  //       lastName: socialData.lastName,
  //     });

  //     user = await this.usersService.findOne({
  //       id: user.id,
  //     });
  //   }

  //   const jwtToken = await this.jwtService.sign({
  //     id: user.id,
  //     email: user.email,
  //   });

  //   return {
  //     token: jwtToken,
  //     user,
  //   };
  // }

}

