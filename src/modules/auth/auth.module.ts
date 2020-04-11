import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { KaKao } from "./kakao.entity";

@Module({
    imports:[TypeOrmModule.forFeature([KaKao])],
    controllers:[AuthController],
    providers:[ AuthService, JwtStrategy ]
})
export class AuthModule {}