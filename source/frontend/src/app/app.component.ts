import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {RequestComponent, RequestData} from "./components/request/request.component";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {routes} from "./services/routes";
import {environment} from '../environments/environment';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RequestComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public environment = environment;

  public createArticleData: RequestData = {id: {required: true}, description: {}};
  public readArticleData: RequestData = {id: {required: true}};
  public deleteArticleData: RequestData = {id: {required: true}};

  public getApplicationName: () => Observable<string>;
  public getCurrentUser: () => Observable<any>;
  public createArticle: (article: RequestData) => Observable<Object>;
  public readArticles: () => Observable<any[]>;
  public readArticle: (article: RequestData) => Observable<any>;
  public deleteArticle: (article: RequestData) => Observable<Object>;

  constructor(
    private httpClient: HttpClient,
  ) {
    this.getApplicationName = () => this.httpClient.get(routes.information.getApplicationName, {responseType: 'text'});
    this.getCurrentUser = () => this.httpClient.get(routes.user.getCurrentUser);
    this.createArticle = (article) => this.httpClient.post(routes.article.createArticle, article);
    this.readArticles = () => this.httpClient.get<any[]>(routes.article.readArticles);
    this.readArticle = (article) => this.httpClient.get<any>(`${routes.article.readArticle}/${article['id']}`);
    this.deleteArticle = (article) => this.httpClient.delete(`${routes.article.deleteArticle}/${article['id']}`);
  }
}