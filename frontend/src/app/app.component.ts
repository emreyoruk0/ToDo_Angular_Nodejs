import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TodoModel } from './models/todo.model';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
  FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  apiUrl: string = 'http://localhost:5000/api';
  work = '';
  todos: TodoModel[] = [];
  updateModel: TodoModel = new TodoModel();

  constructor(
    private _http: HttpClient
  ){
    this.getAll();
  }

  // Tüm elemanları getirir
  getAll(){
    // get<TodoModel[]> ile TodoModel[] tipinde dizi döneceğini belirttik
    this._http.get<TodoModel[]>(this.apiUrl + "/getall").subscribe(res=>{
      this.todos = res;
    });
  }

  // Eleman eklemek için
  add(){
    let model = {"work": this.work};
    this._http.post<any>(this.apiUrl + "/add", model).subscribe(res=>{
      this.getAll(); // eklemeden sonra güncel listeyi getirir
    });
  }

  // Eleman silmek için
  delete(model: TodoModel){
    this._http.post<any>(this.apiUrl + "/delete", model).subscribe(res=>{
      this.getAll();
    });
  }


  // Güncellenecek elemanı almak için
  get(model: TodoModel){
    this.updateModel = {...model}; // referansı bağlanmasın sadece değerleri gitsin diye
  }

  // Güncelleme işlemi
  update(){
    this._http.post<any>(this.apiUrl + "/update", this.updateModel).subscribe(res=>{
      this.getAll();
    });
  }
}
