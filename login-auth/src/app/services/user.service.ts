import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment.prod';
import { map, catchError } from 'rxjs/operators';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Constant } from '../model/constant.model';
import { Token } from '../model/token.model';
import { routes } from '../auth/auth-routing.module';

const url_base = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  private user!: User;
  private token: Token = new Token(false , '', '');

  get headers(){
    return {
      headers:{
        'content-type': 'application/json'
      }
    }
  }  
 

  constructor(private http: HttpClient) { }

  private users: User[]= [];


  getUsers(): Observable<User[]>{

      return of(this.users);
  }

  registerUser(userRegister : RegisterForm ): Observable<boolean>{
     
     const url = `${url_base}/register`
     return this.http.post(url, userRegister, this.headers)
                .pipe(
                  map( (resp: any) =>{
                       
                     this.user = resp as User; 
                     localStorage.setItem(Constant.TOKEN, this.user.token || '');
                     return true
                  }),
                  catchError(error => {
                       
                    return of(false);
                  })
                  );
  }

  validateUser(validateUser: any ): Observable<Token>{
      
    const url = `${ url_base }/validate`;
    return this.http.post(url, validateUser, this.headers)
               .pipe(
                   map( (resp: any) =>{
                    this.token = resp as Token;               
                    return this.token;
                   }),
                   catchError(error => of(this.token))
               );
  }

  validateToken(): Observable<boolean> {

      const tokenToValidate = localStorage.getItem(Constant.TOKEN);

      if(tokenToValidate){
      
        const url = `${url_base}/validate/token`;
        let formData: any = new FormData();
        formData.append("token", tokenToValidate)
      
        return this.http.post(url, formData)
                   .pipe(
                        map( (resp: any ) =>{
                           const{name, email , password='', role, image, google, token} = resp;
                           this.user = new User(name, email, password, role, image, google, token);
                           localStorage.setItem(Constant.TOKEN , this.user.token || '');
                           return true;
                     }), 
                     catchError(error => of(false))
                   );
      }else {
         return of(false);
      }
    
  }

  closeSession(){

     localStorage.removeItem(Constant.REMEMBER_USER);
     localStorage.removeItem(Constant.TOKEN);
  }

  get currentUser(): User { return this.user;}
  
}
