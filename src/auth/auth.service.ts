import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  //validate user for login
  async validateUser(email: string, pass: string): Promise<any> {
    const user:any = await this.usersService.findOne(email,pass);
   console.log("ppppppppp",user.password,pass)
    const isMatch = await bcrypt.compare(pass, user.password);
    console.log("isMatch",isMatch)
    if (isMatch) {
     return user
    }
    return null;
  }

  async login(user: any) {
    const payload = {name:user.name, email: user.email, id: user.id,createdAt:user.createdAt };

    return {
      access_token: this.jwtService.sign(payload),
      payload
    };
  }
}