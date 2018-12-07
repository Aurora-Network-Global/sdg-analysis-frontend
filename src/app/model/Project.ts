export class Project {

  public is_query_defined = false;
  public is_query_run = false;
  public is_testdata = false;
  public is_scivaldata_uploaded = false;
  public is_eidslist = false;
  public is_index_present = false;

  constructor(public name: string,
              public project_id: string) {
  }
}
