import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  api_url = 'http://localhost:5000/resource/'; 
  user = this.authService.getUser();

  constructor(
    private http: HttpClient, 
    private authService : AuthService
  ) { }
  
    
  getAllResources() {
    return this.http.get(this.api_url);
  }

  getFilteredResources(query: any) {
    return this.http.post(this.api_url + 'filter', query)
  }

  addResource(data: any) {
    return this.http.post(this.api_url, {...data, user: this.user});
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
