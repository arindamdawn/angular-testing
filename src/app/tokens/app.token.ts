import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export const BASE_URL = new InjectionToken<string>(environment.apiBaseUrl);
