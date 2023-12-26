import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiteaService {
  private apiUrl = 'http://localhost:3000/api/v1'; // Assuming Gitea is running on http://localhost:3000
  private username = 'Sumanshu'; // Replace with your Gitea username
  private password = '798332813e8a474c3d034c44dff6fdc7adf7e427'; // Replace with your Gitea access token

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}`,
    });
  }

  getAllRepos(username:string){
    const url = `${this.apiUrl}/users/${username}/repos`
    return this.http.get(url, { headers: this.getHeaders() });
  }

  // Update the method in gitea.service.ts
getAllFiles(username: string, repo: string, path: string = ''): Observable<any> {
  const fullPath = path ? `/${path}` : '';
  const url = `${this.apiUrl}/repos/${username}/${repo}/contents${fullPath}`;
  return this.http.get(url, { headers: this.getHeaders() });
}
 

  getRepositoryInfo(owner: string, repo: string): Observable<any> {
    const url = `${this.apiUrl}/repos/${owner}/${repo}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  createRepository(repoName: string): Observable<any> {
    const url = `${this.apiUrl}/user/repos`;
    const body = { name: repoName };

    return this.http.post(url, body, { headers: this.getHeaders() });
  }

  getFileContent(username: string, repo: string, filePath: string): Observable<any> {
    const url = `${this.apiUrl}/repos/${username}/${repo}/contents/${filePath}`;

    return this.http.get(url, { headers: this.getHeaders() });
  }
}
