export class RelevanceMeasures {

  constructor(public recall: number,
              public precision: number,
              public number_test_entries: number,
              public number_test_entries_found: number,
              public number_sample_entries: number,
              public number_positive_sample_entries: number,
              public number_of_search_results: number
  ) { }
}
