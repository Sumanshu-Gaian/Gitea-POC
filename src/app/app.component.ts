import { Component } from '@angular/core';
import { GiteaService } from './gitea.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'gitea';
  repoName: string = '';
  filePath: string = '';
  fileContent: string = '';
  createdRepoMessage: string = '';
  fetchedFileContent: string = '';
  username:string = '';
  allRepos:any = '';
  allFiles: any = '';
  currentPath: string = '';

  constructor(private giteaService: GiteaService) {}

  createRepository(): void {
    this.giteaService.createRepository(this.repoName).subscribe({
      next: (response) => {
        this.createdRepoMessage = `Repository "${this.repoName}" created successfully!`;
      },
      error: (error) => {
        console.error('Error creating repository:', error);
        this.createdRepoMessage = 'Error creating repository. Check the console for details.';
      }
    });
  }

  fetchFileContent(path: any): void {
    this.giteaService.createRepository(this.repoName).subscribe({
      next: (response) => {
        this.createdRepoMessage = `Repository "${this.repoName}" created successfully!`;
      },
      error: (error) => {
        console.error('Error creating repository:', error);
        this.createdRepoMessage = 'Error creating repository. Check the console for details.';
      }
    });
  }

  fetchAllRepos(){
    this.giteaService.getAllRepos(this.username).subscribe({
      next:(response)=>{
        this.allRepos = response;
        console.log(response)
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }

  fetchAllFiles(){
    this.giteaService.getAllFiles(this.username, this.repoName, this.filePath).subscribe({
      next:(response)=>{
        this.allFiles = response;
        console.log(response)
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }


  fetchFolderContent(path: any) {
    this.giteaService.getFileContent(this.username, this.repoName, this.filePath).subscribe({
      next:(response)=>{
        this.allFiles = response;
        console.log(response)
      },
      error:(error)=>{
        console.error(error);
      }
    })
  }
  

  DiveIn(file: any): void {
    if (file.type === 'file') {
      // It's a file, fetch file data or perform the desired action
      this.giteaService.getAllFiles(this.username, this.repoName, file.path).subscribe({
        next: (response) => {
          // Handle the response for fetching file content
          console.log(response);
        },
        error: (error) => {
          console.error('Error fetching file content:', error);
        }
      });
    } else if (file.type === 'dir') {
      this.giteaService.getFileContent(this.username, this.repoName, file.path).subscribe({
        next: (response)=>{
          console.log(response);
        },
        error: (error)=>{
          console.error("Error fetching files for this folder");
        }
      });
    }
  }
  
  

}


