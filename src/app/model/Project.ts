export class Project {

  public isQueryDefined = false;
  public isDataCollected = false;
  public isDataCollecting = false;
  public isEidsCollected = false;
  public isEidsCollecting = false;
  public isTestdata = false;
  public isEidslist = false;
  public isIndexPresent = false;
  public isScivalData = false;

  constructor(public name: string,
              public project_id: string) {
  }
}
