import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Res,
  Req,
  Get,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: CreateUserDto): Promise<any> {
    try {
      const user = await this.userService.create(registerDto);
      return {
        message: 'Registration successful',
        user,
      };
    } catch (error) {
      return { message: 'Registration failed', error: error.message };
    }
  }

  @Post('login')
  async login(
    @Body() userData: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.userService.validateUser(userData);

    if (!accessToken) {
      throw new BadRequestException('Invalid credentials. Please try again.');
    }

    response.cookie('access_token', accessToken, { httpOnly: true });
    return { message: 'Success', access_token: accessToken };
  }

  @Get('get')
  async User(@Req() request: Request) {
    try {
      if (request.cookies && request.cookies['jwt']) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
          throw new UnauthorizedException();
        }
        const user = await this.userService.getOne({ id: data['id'] });
        console.log(user, 'userr');
        const { password, ...result } = user;
        return result;
      } else {
        return 'No jwt cookie found';
      }
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return {
      message: 'success',
    };
  }
}
