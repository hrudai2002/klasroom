import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  api_url = 'http://localhost:5000/resource/'; 
  
  constructor(
    private http: HttpClient
  ) { }

  getAllResources() {
    return this.http.get(this.api_url);
  }

  addResource(data: any) {
    return this.http.post(this.api_url, data);
  }

  getResource(id : any) {
    return this.http.get(this.api_url + `${id}`);
  }


  updateResource(id: any, data : any) {
    return this.http.patch(this.api_url + `${id}`, data);
  }

  deleteResource(id: any) {
    return this.http.delete(this.api_url + `${id}`);
  }
}
