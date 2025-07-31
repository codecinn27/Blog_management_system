import { Injectable } from '@nestjs/common';
import { AuthService } from './../auth.service';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwt-payload';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private configService: ConfigService,
        private authService: AuthService,
    ){
        const jwtSecret = configService.get<string>('jwt.secret');
        if (!jwtSecret) {
            throw new Error('JWT secret is not defined in configuration');
        }
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
            ignoreExpiration: false,
        });
    }

    async validate(payload: AuthJwtPayload){
        const {userId} = payload.sub;
        console.log({ userId});

        const jwtUser = this.authService.validateJwtUser(userId);
        console.log({jwtUser});
        return jwtUser;
    }
}