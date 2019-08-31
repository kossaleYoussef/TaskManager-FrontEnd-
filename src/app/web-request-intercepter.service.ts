import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebRequestIntercepterService implements HttpInterceptor{

  constructor(private auth: AuthService) { }

  refreshingAccessToken: boolean;

  accessTokenRefreshed: Subject<any>= new Subject();

  intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<any>{
    request = this.addAuthHeader(request);
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err);
        if(err.status === 401){
          // we are unautorized
          return this.refreshAccessToken().pipe(switchMap(() => {
            request = this.addAuthHeader(request);
            return next.handle(request);
          })
          ,catchError((err: any) => {
            console.log(err);
            this.auth.logout();
            return empty();
          }))
        }
        return throwError(err);
      })
    );
  }

  refreshAccessToken(){
    if(this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          observer.next();
          observer.complete();
        })
      })
    }else{
      this.refreshingAccessToken = true;
      return this.auth.getNewAccessToken().pipe(tap(() => {
        this.refreshingAccessToken = false;
        this.accessTokenRefreshed.next();
        console.log('Access token refreshed !');
      }));
    }
  }

  addAuthHeader(req: HttpRequest<any>){
    // get access token
    const token = this.auth.getAccessToken();
    if(token) {
      return req.clone({
        setHeaders: {
          'x-access-token': token
        }
      });
    }
    return req;
  }
}
