import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from './Services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listTask:any;
  count = 0;
  show = false;

  //lấy dữ liệu từ form
  public myForm = this.formBuilder.group({
    'title': ['', [Validators.required]],
    'desc': [''],
    'date': [(new Date()).toISOString().substring(0,10)],
    'piority': ['normal']
  })

  public updateForm = this.formBuilder.group({
    'title': ['', [Validators.required]],
    'desc': [''],
    'date': [(new Date()).toISOString().substring(0,10)],
    'piority': ['normal'],
    'id': ['']
  })

  public formCheck = this.formBuilder.group({
      checkArray: this.formBuilder.array([])
  })

  constructor(
    private common: CommonService,
    private formBuilder: FormBuilder
  ) {}

  //lấy danh sách task ban đầu
  public ngOnInit(): void {
    this.listTask = this.common.getData();
    console.log(this.listTask)
  }

  //thêm task và cập nhật lại danh sách
  public onSubmit() {
    console.log(this.myForm.valid)
    this.common.pushData(this.myForm.value)
    this.listTask = this.common.getData();
  }

  removeTask(data:any) {
    this.common.removeData(data);
    this.listTask = this.common.getData();
  }

  search(data:any) {
    this.listTask = this.common.searchData(data.target.value);
  }

  //update

  showDetail(data:any,n:any) {
    this.updateForm.setValue({title: data.title,desc: data.desc,date: data.date,piority: data.piority,id: n})
  }

  update() {
    this.common.updateData(this.updateForm)
    this.listTask = this.common.getData();
  }

  //check box
  onChange(event:any) {
    const checkArray: FormArray = this.formCheck.get('checkArray') as FormArray;
    let isChecked = event.target.checked;
    if(isChecked){
      this.count++;
      checkArray.push(new FormControl(event.target.value))
    }else{
      this.count--;
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == event.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

    this.show = this.count>0 ? true : false
  }

  removeList() {
    console.log(this.formCheck.value.checkArray)
    this.common.removeListData(this.formCheck.value.checkArray)
    this.listTask = this.common.getData();
  }
}
