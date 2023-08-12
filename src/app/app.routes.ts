import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "counter",
    loadComponent: () =>
      import("./counter/counter.component").then((a) => a.CounterComponent),
  },

  {
    path: "person",
    loadComponent: () =>
      import("./person/person.component").then((a) => a.PersonComponent),
  },
  {
    path: "movies",
    loadComponent: () =>
      import("./movie/movie.component").then((a) => a.MovieComponent),
  },
];
