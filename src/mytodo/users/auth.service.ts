import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  genToken(user) {
    return jwt.sign(user, process.env.SECRET, { expiresIn: '30m' });
  }

  genRefreshToken(user) {
    return jwt.sign(user, process.env.SECRET);
  }

  verifyToken(token) {
    return jwt.verify(token, process.env.SECRET);
  }
}
