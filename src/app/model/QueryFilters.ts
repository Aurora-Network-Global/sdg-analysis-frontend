import {Timerange} from './Timerange';
import {QueryFilter} from './QueryFilter';

export class QueryFilters {

  constructor(
    public query_filters: QueryFilter[],
    public timerange: Timerange
  ) {}
}
