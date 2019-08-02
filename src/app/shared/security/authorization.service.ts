import { Injectable } from '@angular/core';
import { Role } from './security.model';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthorizationService {
  isAccessAllowedTo(role: Role): Observable<boolean> {
    return of(role === Role.Admin);
  }
}
