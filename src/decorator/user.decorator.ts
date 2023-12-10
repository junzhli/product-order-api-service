import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { IAuthJwtTokenContent } from "../interfaces/auth.interface";

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IAuthJwtTokenContent;
  },);