import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof localStorage !== 'undefined') { // Check if localStorage exists
    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({
        setHeaders: {
          token: token
        },
      });
    }
  }
  return next(req);
};
