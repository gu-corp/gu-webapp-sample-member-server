import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { FirebaseAuthStrategy } from "./passport/firebase.strategy";
// import { LocalStrategy } from "./passport/local.strategy";

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'firebase' })],
  providers: [FirebaseAuthStrategy],
  exports: [PassportModule],
  controllers: [],
})
export class AuthModule { }