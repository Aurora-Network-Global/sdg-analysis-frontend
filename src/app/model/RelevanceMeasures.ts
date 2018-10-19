export class RelevanceMeasures {

  constructor(public recall: number,
              public precision: number,
              public true_positives: number,
              public false_positives: number,
              public false_negatives: number,
              public number_of_test_entries: number,
              public total_number_of_query_results: number
  ) { }
}
