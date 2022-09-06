import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../interfaces/activity';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private url = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Activity> {
    return this.http.get<Activity>(this.url + 'all');
  }

  addActivity(newActivity: Activity): Observable<Activity> {
    return this.http.post<Activity>(this.url + 'new', newActivity);
  }

  deleteActivity(id: Number): Observable<any> {
    return this.http.delete<any>(this.url + 'delete/' + id);
  }

  getOne(id: Number): Observable<Activity> {
    return this.http.get<Activity>(this.url + id);
  }

  editActivity(id: Number, activity: Activity): Observable<any> {
    return this.http.put<any>(this.url + 'edit/' + id, activity);
  }
}
