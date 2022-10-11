import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../tokens/app.token';
import { ApiService } from './api.service';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(
    private api: ApiService,
    private endpointService: EndpointService,
    @Inject(BASE_URL) private baseUrl: string
  ) {}

  fetchUserDepartments() {
    return this.endpointService.createUrl('departments', this.baseUrl);
  }
}
