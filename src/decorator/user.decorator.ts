import { createParamDecorator } from "@nestjs/common";
import { IAuthJwtTokenContent } from "src/interfaces/auth.interface";

export const User = createParamDecorator((data, req) => {
    return req.user as IAuthJwtTokenContent;
  });