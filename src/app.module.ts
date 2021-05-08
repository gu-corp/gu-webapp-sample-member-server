import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProfileModule } from './gapi/profile/profile.module';
import { TaskModule } from './gapi/task/task.module';
import { join } from 'path';
import { DateScalar } from '~/common/scalars/date.scalar';

@Module({
  imports: [
    ProfileModule,
    TaskModule,
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