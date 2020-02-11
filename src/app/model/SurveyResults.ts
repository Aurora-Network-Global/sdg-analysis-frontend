import {Judgement} from './Judgement';

export class SurveyResults {

  constructor(
    public session: string,
    public judgements: Judgement[],
    public unselected_keywords: string[],
    public selected_keywords: string[],
    public unselected_journals: string[],
    public selected_journals: string[],
    public suggested_journals: string[],
    public suggested_keywords: string[]
  ) {}
}
