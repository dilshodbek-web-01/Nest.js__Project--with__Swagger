import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  @Inject() private readonly jwtService: JwtService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let tokenId = request.headers.authorization;

    if (!tokenId) {
      throw new UnauthorizedException();
    }

    try {
      if (tokenId.startsWith('Bearer ')) {
        tokenId = tokenId.substr('Bearer '.length);
      }
      await this.jwtService.verifyAsync(tokenId);
    } catch (e) {
      throw new UnauthorizedException();
    }

    const decodeToken = await this.jwtService.decode(tokenId);

    if (!decodeToken) {
      throw new UnauthorizedException();
    }
    request.userInfo = decodeToken;
    // console.log('decodeToken -> ', decodeToken);
    return true;
  }
}
