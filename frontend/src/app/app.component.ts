import { Component, OnInit } from '@angular/core';
import { TodoModel } from './models/todo.model';
import { HttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared/shared.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isUpdate: boolean = false;
  apiUrl: string = 'http://localhost:5000/api';
  workForAdd: TodoModel = new TodoModel();
  todos: TodoModel[] = [];
  updateModel: TodoModel = new TodoModel();

  constructor(
    private _http: HttpClient,
    private _toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.getAll();
  }

  // Tüm elemanları getirir -> http://localhost:5000/api/getall adresine get isteği atar
  getAll(){
    // get<TodoModel[]> ile istek sonucunda TodoModel[] tipinde dizi döneceğini belirttik
    this._http.get<TodoModel[]>(this.apiUrl + "/getall").subscribe(res=>{
      this.todos = res; // res -> istek sonucunda dönen veri
    });
  }

  // Eleman eklemek için -> http://localhost:5000/api/add adresine post isteği atar
  add(){
    let model = {
        "work": this.workForAdd.work,
        "isCompleted": this.workForAdd.isCompleted
      };

    if(model.work == "") {
      this._toastr.error("Boş eleman eklenemez!");
      return;
    }

    // Aynı isimde elemanın/işin eklenmesini engeller
    if (this.todos.some(todo => todo.work === model.work)) {
      this._toastr.error("Bu iş zaten listenizde var!");
      return;
    }

    this._http.post<any>(this.apiUrl + "/add", model).subscribe(res=>{
      this.getAll(); // eklemeden sonra güncel listeyi getirir
    });
    this.workForAdd = new TodoModel(); // ekleme işleminden sonra input alanını temizler
  }

  // Eleman silmek için -> http://localhost:5000/api/delete adresine post isteği atar
  delete(model: TodoModel){
    this._http.post<any>(this.apiUrl + "/delete", model).subscribe(res=>{
      this.getAll();
    });
  }


  // Güncellenecek elemanı almak için
  getElementForUpdate(model: TodoModel){
    this.updateModel = {...model}; // referansı bağlanmasın sadece değerleri gitsin diye
  }

  // Güncelleme işlemi için -> http://localhost:5000/api/update adresine post isteği atar
  update(){
    this._http.post<any>(this.apiUrl + "/update", this.updateModel).subscribe(res=>{
      this.getAll();
    });
  }
}

