import { ArgsType, Field, Int } from '@nestjs/graphql';
import { PaginationArgs } from './pagination.args';

@ArgsType()
export class ListProfileArgs extends PaginationArgs {
}
