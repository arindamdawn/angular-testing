import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BrowserStorageService } from '../api/storage.service';

/**
 * A middleware which intercepts all network requests and attaches authorization header
 */
@Injectable({ providedIn: 'root' })
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private storageService: BrowserStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokens = {
      accessToken: this.storageService.get('access_token'),
      idToken: this.storageService.get('id_token'),
    };

    const authenticatedUrls = [environment.usersBaseUrl];
    if (
      authenticatedUrls.filter((url) => request.url.includes(url)).length === 1
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokens.idToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
