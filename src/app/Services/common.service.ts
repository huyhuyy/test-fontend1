import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  arrTask:[any] = localStorage.getItem('taskDB') == null ? [] : JSON.parse(localStorage.getItem('taskDB') || '{}');
  
  constructor() { }

  public pushData(data:any):void {
    this.arrTask.push(data)
    localStorage.setItem('taskDB',JSON.stringify(this.arrTask))
  }

  public getData():[] {
    let arr:any = []
    arr = localStorage.getItem('taskDB') == null ? [] : JSON.parse(localStorage.getItem('taskDB') || '{}');
    arr.sort((task1:any, task2:any) => {
      return <any>new Date(task1!.date) - <any>new Date(task2!.date);
    })
    console.log(arr)
    return arr;
  }

  public removeData(data:any):void {
    for(let i = 0; i<this.arrTask.length; i++) {
      if(this.arrTask[i].title == data) {
        this.arrTask.splice(i,1)
      }
    }
    localStorage.setItem('taskDB',JSON.stringify(this.arrTask))
  }

  public removeListData(listData:[]) {
    for(let data of listData) {
      for(let i = 0; i<this.arrTask.length; i++) {
        if(this.arrTask[i].title == data) {
          this.arrTask.splice(i,1)
        }
      }
    }
    localStorage.setItem('taskDB',JSON.stringify(this.arrTask))
  }

  public searchData(data:any) {
    let arr = this.getData();
    let searchList = arr.filter((task:any) => task!.title.indexOf(data) >= 0)
    return searchList;
  }

  public updateData(data:any) {
    var arr:any = this.getData();
    for(let i = 0; i<arr.length; i++) {
      if(data.value.id == i) {
        arr[i].title = data.value.title;
        console.log(arr[i].title)
        arr[i].desc = data.value.desc;
        arr[i].date = data.value.date;
        arr[i].piority = data.value.piority;
      }
    }
    localStorage.setItem('taskDB',JSON.stringify(arr))
  }

  
}
