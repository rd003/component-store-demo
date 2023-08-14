import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Movie } from "./movie.model";
import { Observable, delay } from "rxjs";
import { environment } from "../environments/environment.development";

@Injectable({ providedIn: "root" })
export class MovieService {
  private readonly baseUrl = environment.apiUrl + "/movies";
  private readonly http = inject(HttpClient);

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseUrl).pipe(delay(300));
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.baseUrl, movie).pipe(delay(300));
  }

  updateMovie(id: string, movie: Movie): Observable<Movie> {
    return this.http
      .patch<Movie>(`${this.baseUrl}/${id}`, movie)
      .pipe(delay(300));
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(delay(300));
  }
}
