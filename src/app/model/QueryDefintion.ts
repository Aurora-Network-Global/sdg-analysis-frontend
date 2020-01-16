import {QueryLine} from './QueryLine';
import {QueryFilters} from './QueryFilters';

export class QueryDefintion {

  constructor(
    public query_lines: QueryLine[],
    public identifier: string,
    public descriptions: string[],
    public query_filters: QueryFilters
  ) {}
}
