import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({providedIn: 'root'})
export class AuthService {
    private apiUrl: string = 'http://localhost:3000/users';

    //private logueado = new BehaviorSubject<boolean>(this.isLoggedIn());
    private logueado = new BehaviorSubject<boolean>(false);
    estaLogueado = this.logueado.asObservable();  
    

    constructor(private http: HttpClient) { }

    login(username: string, password: string):Observable<boolean>{
        return this.http.get<Usuario[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
            map(users => {
                if (users.length > 0){
                    localStorage.setItem('isAuthenticated', 'true');
                    return true;
                }
                return false;
            })
        )
    }

    singup (username: string, password: string):Observable<Usuario[]>{
        return this.http.post<Usuario[]>(this.apiUrl, {username, password});
    }

    isLoggedIn (): boolean {
        return localStorage.getItem('isAuthenticated') === 'true';
    }

/*     isLoggedIn() :Observable<boolean>{
        return this.logueado.asObservable();
    } */

    logOut (): void {
        localStorage.removeItem('isAuthenticated')
    }
        
}