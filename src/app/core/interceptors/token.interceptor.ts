import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, pipe, throwError } from 'rxjs';

export class TokenInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const headers = new HttpHeaders({
      'Autorization':"tokencillo"
    })
    //PRIMERA FORMA7

    let clonedRequest= req
    if (localStorage.getItem('token')) {
      clonedRequest= req.clone({
        setHeaders:{Authorization:localStorage.getItem('token')!}
      })
    }

    return next.handle(clonedRequest)

    //SEGUNDA FORMA
    // no es necesario el headers:headers
    const requestClone= req.clone({
      headers
    });
    return next.handle(requestClone)
    .pipe(
      catchError(this.manejaError)
    )

  }
  
  manejaError(error:HttpErrorResponse){
    console.log("sucedió un error");
    console.warn("error", error)
    return throwError(()=>Error("new custom error"))
  }

};

