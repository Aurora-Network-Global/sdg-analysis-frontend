import {QueryDefintion} from './QueryDefintion';
import {QueryFilters} from './QueryFilters';

export class QueryDefintions {

  constructor(
    public query_definition: QueryDefintion[],
    public query_filters: QueryFilters,
    public syntax: string
  ) {}
}
