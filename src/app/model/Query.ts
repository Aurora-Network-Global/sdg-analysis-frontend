export class Query {

  constructor(
      private affiliation_id: string,
      private author_id: string,
      private author_name: string,
      private subject: string,
      private title: string,
      private topic: string,
      private start_year: string,
      private end_year: string
  ) { }
}
