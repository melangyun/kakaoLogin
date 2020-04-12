import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const AuthUser = createParamDecorator(( data: string, ctx: ExecutionContext ) => { 
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    return data ? user && user[data] : user;
});