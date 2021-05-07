import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ProfileModule } from './profile/profile.module';
import { join } from 'path';
import { DateScalar } from '~/common/scalars/date.scalar';

@Module({
  imports: [
    ProfileModule,
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