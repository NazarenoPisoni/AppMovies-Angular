import { Usuario } from 'src/app/interfaces/usuario.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, EMPTY, forkJoin, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
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

    private favoritesUpdated = new BehaviorSubject<null | void>(null);
    private watchedUpdated = new BehaviorSubject<null | void>(null);

    get favoritesUpdated$() {
        return this.favoritesUpdated.asObservable();
    }


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
                    const user = users[0];
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('id', user.id);
                    localStorage.setItem('username', user.username);
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
        localStorage.removeItem('username');
        this.logueado.next(false);
    }


    addToFavorites(userId: string, movieId: number): Observable<any> {
        return this.http.get<Favoritas>(`${this.apiUrlFavoritas}/${userId}`).pipe(
            switchMap(favoritasData => {
                //const updatedFavorites = user.favorites || [];
                const updatedFavorites = favoritasData?.favoritas || [];

                if (!updatedFavorites.includes(movieId)) {
                    updatedFavorites.push(movieId);
                    alert('La pelicula se agrego a favoritos');
                } 
                return this.http.patch(`${this.apiUrlFavoritas}/${userId}`, { favoritas: updatedFavorites }).pipe(
                    tap(() => this.favoritesUpdated.next())
                );
            }),
            catchError(err => {
                // Si ocurre un 404, creamos un nuevo registro para este usuario
                if (err.status === 404) {
                    const newFavorite = {
                        id: userId,
                        favoritas: [movieId]
                    };
                    return this.http.post(`${this.apiUrlFavoritas}`, newFavorite).pipe(
                        tap(() => {
                          console.log('Nuevo registro de favoritos creado para el usuario:', newFavorite);
                          this.favoritesUpdated.next(); // Emitimos el evento
                        })
                      );
                }
                // Si no es un 404, lanzamos el error
                return throwError(() => err);
            })
        );
    }

    markAsWatched(userId: string, movieId: number): Observable<any> {
        return this.http.get<Vistas>(`${this.apiUrlVistas}/${userId}`).pipe(
            switchMap(vistasData => {
                //const updatedWatched = user.watched || [];
                const updatedWatched = vistasData?.vistas || [];

                if (!updatedWatched.includes(movieId)) {
                    updatedWatched.push(movieId);
                    console.log('se pusheo correctamente');
                } else {
                    console.log('La Pelicula ya esta marcada como vista');
                }
                return this.http.patch(`${this.apiUrlVistas}/${userId}`, { vistas: updatedWatched }).pipe(
                    tap(() => this.watchedUpdated.next())
                );
            }),
            catchError(err => {
                // Si ocurre un 404, creamos un nuevo registro para este usuario
                if (err.status === 404) {
                    const newWatched = {
                        id: userId,
                        vistas: [movieId]
                    };
                    return this.http.post(`${this.apiUrlVistas}`, newWatched).pipe(
                        tap(() => {
                          console.log('Nuevo registro de vistos creado para el usuario:', newWatched);
                          this.watchedUpdated.next(); // Emitimos el evento
                        })
                      );
                }
                // Si no es un 404, lanzamos el error
                return throwError(() => err);
            })
        );
    }

    getUserFavorites(userId: string): Observable<Movie[]> {
        return this.http.get<Favoritas>(`${this.apiUrlFavoritas}/${userId}`).pipe(
          switchMap(favoritasData => {
            const movieIds: number[] = favoritasData.favoritas || [];
            if (movieIds.length === 0) {
                return of([]);
            } // Obtén los IDs de las películas favoritas del usuario
            const requests = movieIds.map(movieId => 
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

    getUsername(): string | null {
        return localStorage.getItem('username');
    }

}