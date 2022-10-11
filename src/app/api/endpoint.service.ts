import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QueryStringParameters } from '../utils/query-string-parameters';
import { UrlBuilder } from '../utils/url-builder';

@Injectable({ providedIn: 'root' })
export class EndpointService {
  constructor() {}

  get apiBaseUrl() {
    return environment.apiBaseUrl || '';
  }

  createUrl(action: string, overRideBaseUrl?: string): string {
    let baseUrl = overRideBaseUrl ? overRideBaseUrl : this.apiBaseUrl;
    const urlBuilder: UrlBuilder = new UrlBuilder(baseUrl, action);
    return urlBuilder.toString();
  }

  /**
   * Generates endpoint url having path variables as well as query paramaters
   *
   * Eg; To create a endpoint url like API_HOSTNAME/questions?textOnly=true
   * use createUrlWithPathVariables('questions', (qs: QueryStringParameters) => {
      qs.push('textOnly', 1);
    } )
   */
  createUrlWithQueryParameters(
    action: string,
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void,
    overRideBaseUrl?: string
  ): string {
    let baseUrl = overRideBaseUrl ? overRideBaseUrl : this.apiBaseUrl;
    const urlBuilder: UrlBuilder = new UrlBuilder(baseUrl, action);
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }

  /**
   * Generates endpoint url having path variables
   *
   * Eg; To create a endpoint url like API_HOSTNAME/organization/{organizationId}
   * use createUrlWithPathVariables('organization', [organizationId] )
   */
  createUrlWithPathVariables(
    action: string,
    pathVariables: any[] = [],
    overRideBaseUrl?: string
  ): string {
    let encodedPathVariablesUrl = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(pathVariable)}`;
      }
    }

    let baseUrl = overRideBaseUrl ? overRideBaseUrl : this.apiBaseUrl;
    const urlBuilder: UrlBuilder = new UrlBuilder(
      baseUrl,
      `${action}${encodedPathVariablesUrl}`
    );
    return urlBuilder.url;
  }
  /**
   * Generates endpoint url having path variables as well as query paramaters
   *
   * Eg; To create a endpoint url like API_HOSTNAME/organization/{organizationId}/questions?textOnly=true
   * use createUrlWithPathVariables('organization', [organizationId], (qs: QueryStringParameters) => {
      qs.push('textOnly', 1);
    } )
   */
  createUrlWithPathVariablesAndQueryParams(
    action: string,
    pathVariables: any[] = [],
    queryStringHandler?: (queryStringParameters: QueryStringParameters) => void,
    overRideBaseUrl?: string
  ): string {
    let encodedPathVariablesUrl = '';
    // Push extra path variables
    for (const pathVariable of pathVariables) {
      if (pathVariable !== null) {
        encodedPathVariablesUrl += `/${encodeURIComponent(
          pathVariable.toString()
        )}`;
      }
    }
    let baseUrl = overRideBaseUrl ? overRideBaseUrl : this.apiBaseUrl;
    const urlBuilder: UrlBuilder = new UrlBuilder(
      baseUrl,
      `${action}${encodedPathVariablesUrl}`
    );
    // Push extra query string params
    if (queryStringHandler) {
      queryStringHandler(urlBuilder.queryString);
    }
    return urlBuilder.toString();
  }
}
