import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
export interface modal {
  name: string
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getData() {
    const obj = [];
    const decodeToken = localStorage.getItem('authToken');
    const uuid = decodeToken.substring(8, 36);
    return this.http.get('/s',{
    }).pipe(
      map((res: any) => {
        res.data.forEach(element => {
          if (uuid == element.id) {
            obj.push(element);
          }
        });
        return obj
      })
    );
  }

  getDocument() {
    return this.http.get('/getrecord').pipe(
      map(r => r)
    );
  }

  getByID(id) {
    return this.http.get('/find' + `/${id}`).pipe(
      map(r => r)
    );
  }

  createEmployee(data) {
    const data1 = {
      name: data.name,
      role: data.role.viewValue,
      image: data.image
    }
    return this.http.post(`/post`, data1).pipe(
      map(r => r)
    );
  }

  updateEmployee(data, id: string) {
    const data1 = {
      name: data.name,
      role: data.role.viewValue,
      image: data.image
    }
    return this.http.put(`/${id}`, data1).pipe(
      map(r => r)
    );
  }

  deleteEmployee(id: string) {
    return this.http.delete(`/${id}`).pipe(
      map(r => r)
    );
  }

  sortProduct(id: number) {
    return this.http.get( '/sort' + `/${id}`).pipe(
      map(r => r)
    );
  }

  saveDocument(data) {
    return this.http.post(`/saverecord`, { data: data }).pipe(
      map(r => r)
    );
  }

  deleteRecord(id: string) {
    return this.http.delete('/remove' + `/${id}`).pipe(
      map(r => r));
  }

}
