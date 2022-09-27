import { Component, VERSION } from '@angular/core';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  percentDone: number = 0;
  uploadSuccess: boolean = false;
  files: any[] = [];
  constructor(
    private http: HttpClient,
    ) { }
    
  version = VERSION
  ngOnInit() {
    this.getFiles()
  }

  basicUploadSingle(file: any){
    const formData = new FormData();
    formData.append("file", file[0]);
    this.http.post('http://localhost:8080/upload', formData)
      .subscribe(event => {  
        console.log('done')
      })
  }

  upload(event: any){
    const element = event.currentTarget as HTMLInputElement;
    let fileList = element.files;
    if (fileList) {
      console.log("FileUpload -> files", fileList);
    }
    this.basicUploadSingle(fileList);
  }

  getFiles() {
    this.http.get('http://localhost:8080/files')
      .subscribe(res => {
        this.files = this.convert(res);
      })
  }

  convert(res: any) {
    let response = JSON.stringify(res);
    return JSON.parse(response);
  }

  download(file: any) {
    this.http.get(file.url, {
      responseType: 'blob'
    }).subscribe(blob => {
      const a = document.createElement('a')
      const objectUrl = URL.createObjectURL(blob)
      a.href = objectUrl
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(objectUrl);
    })
  }
}
