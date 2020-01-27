import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from 'ngx-webstorage';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor{
    constructor(private $localstorage: LocalStorageService){

    }

    intercept(req: HttpRequest<any>,
                next: HttpHandler): Observable<HttpEvent<any>>{
    const token = this.$localstorage.retrieve("authenticationToken");
    console.log('jwt token ' + token);
    if(token)
    {
        const cloned = req.clone({
            headers: req.headers.set("Authentication","Bearer " + token)
        });
        return next.handle(cloned);
    }
    else
    {
        return next.handle(req);
    }
    }
}