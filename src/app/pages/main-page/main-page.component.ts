import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../common/services/Data/handle-data.service';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  public myFormGroup: FormGroup;
  public date=new Date();
  public add=0;
  public wordslist;
  public showTable=false;
  public reportName='';
  public reportData='';
  constructor(
    public handledata: HandleDataService,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService, 
    public handlefunction: handleFunction,
    public router:Router) {
  }


  ngOnInit() {

    this.myFormGroup = this.formBuilder.group({
      type: '',
      tamilWord: '',
      group: '',
      SW: '',
      RI: '',
      lotAZ: '',
      lot09: '',
      proficiency: '',
      translation: '',
      png: '',
      pastParticle:'',
      preParticle: '',
      fParticle: '',
      pastExample:'',
      preExample: '',
      fExample: ''
    });
}

fetchData(){
  let value={};
  value['tablename'] = ''
  value['method'] = 'TamilDisplay'
  this.apiCallservice.handleData_New_python('tamilinfo', 1, value, 1)
    .subscribe((res: any) => {
      this.wordslist=res.Data;
      this.showTable=res.Data.lenght>0?true:false;
      
  });

}

addF(data){
this.add=data;
}
storeTurnBookData({ value, valid }: { value: [{}], valid: boolean }) {
  value['tablename'] = ''
  value['method'] = 'TamilAdd'
  this.apiCallservice.handleData_New_python('tamilinfo', 1, value, 1)
    .subscribe((res: any) => {
alert(res.Status)
  this.myFormGroup.patchValue({tamilWord:''});
  this.myFormGroup.patchValue({group: ''});
  this.myFormGroup.patchValue({SW: ''});
  this.myFormGroup.patchValue({RI: ''});
  this.myFormGroup.patchValue({lotAZ: ''});
  this.myFormGroup.patchValue({lot09: ''});
  this.myFormGroup.patchValue({proficiency: ''});
  this.myFormGroup.patchValue({translation: ''});
  this.myFormGroup.patchValue({png: ''});
  this.myFormGroup.patchValue({pastParticle:''});
  this.myFormGroup.patchValue({preParticle: ''});
  this.myFormGroup.patchValue({fParticle: ''});
  this.myFormGroup.patchValue({pastExample:''});
  this.myFormGroup.patchValue({preExample: ''});
  this.myFormGroup.patchValue({fExample: ''});
  });

}
}
