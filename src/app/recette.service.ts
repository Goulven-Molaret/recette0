import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Receipe } from './receipe';
import { Observable, of } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
    })
  };

  private receipeUrl = 'http://localhost:3000/receipe';
  constructor(private http: HttpClient) { }

  getReceipes(): Observable<Receipe[]>{
    return this.http.get<Receipe[]>(this.receipeUrl)
  }
  getReceipe(id: String): Observable<Receipe>{
    return this.http.get<Receipe>(this.receipeUrl+"/"+id);
  }

  addReceipe(receipe: Receipe): Observable<Receipe> {
    return this.http.post<Receipe>(this.receipeUrl, receipe, this.httpOptions)
  }

  updateReceipe(id : String, receipe: Receipe): Observable<Receipe>{
    return this.http.put<Receipe>(this.receipeUrl+"/"+id, receipe, this.httpOptions)
  }

  deleteReceipe(id: String): Observable<{}>{
    return this.http.delete(this.receipeUrl+"/"+id, this.httpOptions)
  }

  searchReceipe(term :String): Observable<Receipe[]>{
    if(!term.trim()){
      return of([])
    }
    return this.http.get<Receipe[]>(this.receipeUrl+"/query/"+term)
  }
}
