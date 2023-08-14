import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Movie } from "./movie.model";
import { Person } from "../person/person.model";
import { trigger } from "@angular/animations";
import { Observable, exhaustMap, switchMap, tap } from "rxjs";
import { MovieService } from "./movie.service";
import { Injectable, inject } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

type actionType = "Add" | "Update";
interface MovieState {
  movies: readonly Movie[];
  loading: boolean;
  error: HttpErrorResponse | null;
  action: actionType;
}

Injectable();
export class MovieStore extends ComponentStore<MovieState> {
  constructor() {
    super({
      movies: [],
      loading: false,
      error: null,
      action: "Add",
    });
  }

  movieService = inject(MovieService);

  //selectors
  private readonly movies$ = this.select((s) => s.movies);
  private readonly loading$ = this.select((s) => s.loading);
  private readonly error$ = this.select((s) => s.error);
  private readonly action$ = this.select((s) => s.action);

  // Viewmodel
  readonly vm$ = this.select({
    movies: this.movies$,
    loading: this.loading$,
    error: this.error$,
    action: this.action$,
  });

  // private methods
  private readonly setLoading = this.updater((state) => ({
    ...state,
    loading: true,
  }));

  private readonly setError = this.updater(
    (state, error: HttpErrorResponse) => ({
      ...state,
      loading: false,
      error: error,
    })
  );

  // adding Movie[] to the state
  private readonly addMovies = this.updater((state, movies: Movie[]) => ({
    ...state,
    loading: false,
    movies,
  }));

  private readonly addMovieToState = this.updater((state, movie: Movie) => ({
    ...state,
    loading: false,
    movies: [...state.movies, movie],
  }));

  private readonly updateMovieState = this.updater((state, movie: Movie) => ({
    ...state,
    loading: false,
    movies: state.movies.map((m) => (m.id === movie.id ? movie : m)),
  }));

  private readonly deleteMovieFromState = this.updater((state, id: string) => ({
    ...state,
    loading: false,
    movies: state.movies.filter((m) => m.id != id),
  }));

  //public methods
  readonly setAction = this.updater((state, action: actionType) => ({
    ...state,
    action,
  }));

  //effects

  readonly loadMovies = this.effect<void>((trigger$) => {
    return trigger$.pipe(
      tap((_) => this.setLoading()),
      exhaustMap(() =>
        this.movieService.getMovies().pipe(
          tapResponse(
            (apiResponse) => {
              this.addMovies(apiResponse);
            },
            (error: HttpErrorResponse) => this.setError(error)
          )
        )
      )
    );
  });

  readonly createMovie = this.effect<Movie>((movie$: Observable<Movie>) => {
    return movie$.pipe(
      tap((_) => this.setLoading()),
      switchMap((movie) =>
        this.movieService.addMovie(movie).pipe(
          tapResponse(
            (apiResponse: Movie) => {
              this.addMovieToState(apiResponse);
            },
            (error: HttpErrorResponse) => this.setError(error)
          )
        )
      )
    );
  });

  readonly updateMovie = this.effect<Movie>((movie$: Observable<Movie>) => {
    return movie$.pipe(
      tap((_) => this.setLoading()),
      switchMap((movie) =>
        this.movieService.updateMovie(movie.id, movie).pipe(
          tapResponse(
            (apiResponse: Movie) => {
              this.updateMovieState(apiResponse);
            },
            (error: HttpErrorResponse) => this.setError(error)
          )
        )
      )
    );
  });

  readonly deleteMovie = this.effect<string>((id$: Observable<string>) => {
    return id$.pipe(
      tap((_) => this.setLoading()),
      switchMap((id) =>
        this.movieService.deleteMovie(id).pipe(
          tapResponse(
            (_) => {
              this.deleteMovieFromState(id);
            },
            (error: HttpErrorResponse) => this.setError(error)
          )
        )
      )
    );
  });
}
