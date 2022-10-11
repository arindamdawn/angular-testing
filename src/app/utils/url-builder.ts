import { QueryStringParameters } from './query-string-parameters';
/**
 * This class uses the QueryStringParameters class to generate the final API endpoint
 */
export class UrlBuilder {
  public url: string;
  public queryString: QueryStringParameters;
  constructor(
    private baseUrl: string,
    private action: string,
    queryString?: QueryStringParameters
  ) {
    this.url = [baseUrl, action].join('/');
    this.queryString = queryString || new QueryStringParameters();
  }
  public toString(): string {
    const qs: string = this.queryString ? this.queryString.toString() : '';
    return encodeURI(qs ? `${this.url}?${qs}` : this.url);
  }
}
