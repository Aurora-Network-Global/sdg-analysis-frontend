import {QueryDefintions} from './QueryDefinitions';

export class Query {

  constructor(
      public title: string,
      public identifier: string,
      public description: string,
      public creator: string,
      public contributor: string,
      public date_modified: string,
      public licence: string,
      public licence_href: string,
      public query_definitions: QueryDefintions
  ) { }
}
