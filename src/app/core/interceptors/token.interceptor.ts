import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest= req;
    if (localStorage.getItem("tokenuser")) {
      console.log("tokenuser",localStorage.getItem("tokenuser"));
      
      clonedRequest= req.clone({
        setHeaders:{Authorization:localStorage.getItem("tokenuser")!}
      })
    }

    return next.handle(clonedRequest)
  }
};
