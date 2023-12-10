import { CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';
import { IAuthJwtTokenContent } from "../interfaces/auth.interface";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
    ) {}

    private readonly logger = new Logger(AuthGuard.name);
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const roles = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            this.logger.debug("token is empty");
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync<IAuthJwtTokenContent>(
                token,
            );
            if (!roles.includes(payload.roleId)) {
                this.logger.debug("assigned role doesn't match the route enforced rule");
                throw new UnauthorizedException();
            }
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
      }
}