import { Usuario } from 'src/app/interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, EMPTY, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { Router } from '@angular/router';
import { Favoritas } from '../interfaces/favoritas.interface';
import { Vistas } from '../interfaces/vistas.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiKey: string = '02319fe9ef3d0c1d5fefc135738475bb';
    private apiUrl = 'http://localhost:3000/users';
    private apiUrlFavoritas: string = 'http://localhost:3000/favoritas';
    private apiUrlVistas: string = 'http://localhost:3000/vistas';


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
            password
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
        return this.http.get<Favoritas>(`${this.apiUrlFavoritas}/${userId}`).pipe(
            switchMap(favoritas => {
                //const updatedFavorites = user.favorites || [];
                const updatedFavorites = favoritas.favoritas || [];

                if (!updatedFavorites.includes(movieId)) {
                    updatedFavorites.push(movieId);
                    console.log("Agregar a favoritos funciono");
                    alert('La pelicula se agrego a favoritos');
                    return this.http.patch(`${this.apiUrlFavoritas}/${userId}`, { favoritas: updatedFavorites });
                } else {
                    alert('La pelicula ya se encuentra en favoritos');
                    return EMPTY;
                }
            })
        );
    }

    markAsWatched(userId: string, movieId: number): Observable<any> {
        return this.http.get<Vistas>(`${this.apiUrlVistas}/${userId}`).pipe(
            switchMap(vistasData => {
                //const updatedWatched = user.watched || [];
                const updatedWatched = vistasData.vistas || [];

                if (!updatedWatched.includes(movieId)) {
                    updatedWatched.push(movieId);
                    console.log('se pusheo correctamente');
                } else {
                    console.log('La Pelicula ya esta marcada como vista');
                }
                return this.http.patch(`${this.apiUrlVistas}/${userId}`, { vistas: updatedWatched });
            })
        );
    }

    getUserFavorites(userId: string): Observable<Movie[]> {
        return this.http.get<Favoritas[]>(`${this.apiUrlFavoritas}?userId=${userId}`).pipe(
          switchMap(favoritasData => {
            const movieIds = favoritasData[0]?.favoritas || []; // Obtén los IDs de las películas favoritas del usuario
            const requests: Observable<Movie>[] = movieIds.map(movieId => 
              this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${this.apiKey}`)
            ); // Solicita los detalles de cada película a The Movie DB u otra API externa
            return forkJoin(requests); // Combina las respuestas en un array de objetos Movie
          })
        );
      }
      
      getUserWatchedWithDetails(userId: string): Observable<Movie[]> {
        return this.http.get<Vistas>(`${this.apiUrlVistas}/${userId}`).pipe(
            switchMap(vistasData => {
                const watchedIds: number[] = vistasData.vistas || [];
                if (watchedIds.length === 0) {
                    console.log('No hay películas vistas para este usuario.');
                    return of([]); // Devuelve un array vacío si no hay películas vistas
                }
                // Reemplaza con la API correcta para obtener detalles de las películas
                const requests = watchedIds.map(id => 
                    this.http.get<Movie>(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`)
                );
                return forkJoin(requests);
            })
        );
    }
    


    eliminarDeFavs(userId: string, movieId: number): Observable<any> {
        return this.http.get<Favoritas>(`${this.apiUrlFavoritas}/${userId}`).pipe(
            switchMap(user => {
                let updatedFavorites: number[] = user.favoritas || [];
                if (updatedFavorites.includes(movieId)) {

                    updatedFavorites = updatedFavorites.filter(id => id !== movieId);
                    console.log('Eliminar de favoritos funciono');
                    alert('La pelicula se elimino de favoritos');
                } else {
                    alert('La pelicula no se encuentra en favoritos');
                }
                return this.http.patch(`${this.apiUrlFavoritas}/${userId}`, { favoritas: updatedFavorites });
            }),
            catchError(error => {
                console.error('Error eliminando de favoritos:', error);
                return (error);
            })
        );
    }

    getUser(userId: string): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/${userId}`);
    }

}