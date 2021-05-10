import { Module } from '@nestjs/common';
import { GraphQLModule, } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ProfileModule } from './gapi/profile/profile.module';
import { TaskModule } from './gapi/task/task.module';
import { join } from 'path';
import { DateScalar } from '~/common/scalars/date.scalar';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import * as ApolloErrors from 'apollo-server-errors';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { FirebaseAdminModule } from '@tfarras/nestjs-firebase-admin';
import * as path from 'path';

@Module({
  controllers: [ AppController ],
  imports: [   
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