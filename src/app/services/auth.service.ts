import { Usuario } from 'src/app/interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, forkJoin, map, Observable, switchMap } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl: string = 'http://localhost:3000/users';

    private logueado = new BehaviorSubject<boolean>(this.isLoggedIn());
    //private logueado = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private router: Router) { }

    /*     login(username: string, password: string):Observable<boolean>{
            return this.http.get<Usuario[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
                map(users => {
                    if (users.length > 0){
                        localStorage.setItem('isAuthenticated', 'true');
                        return true;
                    }
                    return false;
                })
            )
        } */

    //login con behabior subjetc
    login(username: string, password: string): Observable<boolean> {
        return this.http.get<Usuario[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
            map(users => {
                if (users.length > 0) {

                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('id', users[0].id);
                    this.logueado.next(true);
                    return true;
                }
                alert('Usuario o contraseña incorrectos');
                return false;
            })
        );
    }

    singup(username: string, password: string): Observable<Usuario[]> {
        const newUser = {
            username,
            password,
            favorites: [],
            watched: []
        }
        return this.http.post<Usuario[]>(this.apiUrl, newUser);
    }


    isLoggedIn(): boolean {
        return localStorage.getItem('isAuthenticated') === 'true';
    }


    logOut(): void {
        localStorage.removeItem('isAuthenticated');
        this.logueado.next(false);
    }


    addToFavorites(userId: string, movieId: number): Observable<any> {
        return this.http.get<Usuario>(`${this.apiUrl}/${userId}`).pipe(
            switchMap(user => {
                //const updatedFavorites = user.favorites || [];
                const updatedFavorites = user.favorites || [];

                if (!updatedFavorites.includes(movieId)) {
                    updatedFavorites.push(movieId);
                    console.log("Agregar a favoritos funciono");
                    alert('La pelicula se agrego a favoritos');
                } else {
                    alert('La pelicula ya se encuentra en favoritos');
                }
                return this.http.patch(`${this.apiUrl}/${userId}`, { favorites: updatedFavorites });
            })
        );
    }

    markAsWatched(userId: string, movieId: number): Observable<any> {
        return this.http.get<Usuario>(`${this.apiUrl}/${userId}`).pipe(
            switchMap(user => {
                //const updatedWatched = user.watched || [];
                const updatedWatched = user.watched;

                if (!updatedWatched.includes(movieId)) {
                    updatedWatched.push(movieId);
                    console.log('se pusheo correctamente');
                }
                return this.http.patch(`${this.apiUrl}/${userId}`, { watched: updatedWatched });
            })
        );
    }

    getUserFavorites(): Observable<Movie[]> {
        const userId = localStorage.getItem('id');
        return this.http.get<Usuario>(`${this.apiUrl}/${userId}`).pipe(
            switchMap(user => {
                const favoriteIds = user.favorites;
                const requests = favoriteIds.map(id => this.http.get<Movie>(`http://localhost:3000/movies/${id}`));
                console.log('favoritos ids: ' + favoriteIds);
                return forkJoin(requests);
            })
        );
    }


    eliminarDeFavs(userId: string, movieId: number): Observable<any> {
        return this.http.get<Usuario>(`${this.apiUrl}/${userId}`).pipe(
            switchMap(user => {
                let updatedFavorites = user.favorites || [];
                if (updatedFavorites.includes(movieId)) {

                    updatedFavorites = updatedFavorites.filter(id => id !== movieId);
                    console.log('Eliminar de favoritos funciono');
                    alert('La pelicula se elimino de favoritos');
                } else {
                    alert('La pelicula no se encuentra en favoritos');
                }
                return this.http.patch(`${this.apiUrl}/${userId}`, { favorites: updatedFavorites });
            }),
            catchError(error => {
                console.error('error:', error);
                return (error);
            })
        );
    }

    getUser(userId: string): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${userId}`);
    }

}