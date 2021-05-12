import { join } from 'path';

// Nest.js
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule, } from '@nestjs/graphql';

// App
import { ProfileModule } from './gapi/profile/profile.module';
import { TaskModule } from './gapi/task/task.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import configuration from './config/configuration';
@Module({
  controllers: [ AppController ],
  imports: [   
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
      load: [configuration],
    }),
    ProfileModule,
    TaskModule,
    AuthModule,
    UsersModule,
    GraphQLModule.forRoot({
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },    
      installSubscriptionHandlers: true,
      // typePaths: ['./**/*.gql'],
      // definitions: {
      //   path: Path.join(process.cwd(), './types/graphql.ts'),
      //   outputAs: 'class'
      // },
      autoSchemaFile: join(process.cwd(), './src/schema.gql'),
    }),

  ],
})
export class AppModule {}