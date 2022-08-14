import { Component, OnInit, Input } from '@angular/core';
import { HandleDataService } from '../../../common/services/Data/handle-data.service';
import { ApiCallsService } from '../../../common/services/ApiCalls/ApiCalls.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { SecurityCheckService } from '../../../common/services/Data/security-check.service';
import { handleFunction } from 'src/app/common/services/functions/handleFunctions';
import 'jspdf-autotable';
import * as  jsPDF from 'jspdf';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  public examlist;
  public showExamTable=false;
  public myFormGroup: FormGroup;
  public examDone=false;
  public reportData;
  constructor(
    public handledata: HandleDataService,
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public securityCheck: SecurityCheckService, 
    public handlefunction: handleFunction,) {
  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      type: '',
      limit: 0,
      testName:''
    });
  }

  getExam({ value, valid }: { value: [{}], valid: boolean }){
    value['tablename'] = ''
    value['method'] = 'TamilGetExam'
    value['limit'] = parseInt(value['limit'])
    this.apiCallservice.handleData_New_python('tamilinfo', 1, value, 1)
    .subscribe((res: any) => {
      this.examlist=res.Data;
      res.Data.length>0?this.showExamTable=true:this.showExamTable=false;
  });
  }

  submitTest(){
    if(confirm('Are you sure to submit the test??')){
    let value={}
    let arr=[]
    let tempObj={};
    for(let i=0;i<this.examlist.length;i++){
      tempObj['_id']=this.examlist[i]._id
      tempObj['value']=(<HTMLInputElement>document.getElementById(this.examlist[i]._id)).value
      arr.push(tempObj);
      tempObj={}
    }
    value['tablename'] = ''
    value['method'] = 'TamilSubmitExam'
    value['Data']=arr;
    this.apiCallservice.handleData_New_python('tamilinfo', 1, value, 1)
    .subscribe((res: any) => {
      this.reportData=res.Data;
      alert('Report Downloading Please Check once done!');
      this.downloadAvailable();
    });
  }
  }

  downloadAvailable(){//threshhold is 295
    let data=this.reportData;
    let correctMarks = this.reportData.filter(r=>{return r.remark == 'Correct'}).length;
    let totalMarks = this.reportData.length
      let pager=1;
       var doc = new jsPDF()
       doc.setFontSize('25');
       doc.setFontType('bold');
       doc.text('Exam Report : '+this.myFormGroup.value.testName, 15, 15)//partyname
       doc.setFontSize('10');
       doc.text(String(pager), 180, 5)//pageno
       doc.text('Marks : '+correctMarks+'/'+totalMarks, 180, 10)//pageno
       pager=pager+1;
       doc.setFontSize('25');
       doc.setLineWidth(0.5);
       doc.line(0, 20, 210, 20);//line after main header
       //headers
       doc.setFontSize('10');
       let y = 24;
       let starty = 24;
       doc.text('Sr', 2, y)//partyname
       doc.text('Word', 8, y)//partyname
       doc.text('Translation', 36, y)//partyname
       doc.text('Answer', 99, y)//partyname
       doc.text('Remark', 162, y)//partyname
       //headers
       doc.line(0, 25, 210, 25);//line after header
   
       //vertical lines
       doc.line(7, 20, 7, 25);//srno
       doc.line(33, 20, 33, 25);//date
       doc.line(97, 20, 97, 25);//date
       doc.line(160,20,160,25)
       //vertical lines
       let startforI=0;
       y = y + 6;
       startforI=0;
       for (let i = startforI; i < data.length; i++) {
   
         if(y>276){
          doc.line(7, starty, 7, y-4);//srno
          doc.line(33, starty, 33, y-4);//date 
          doc.line(97, starty, 97, y-4);//date
          doc.line(160,starty,160,y-4);
           y=24;
           y=y+6;
       starty = 24;
           doc.addPage();
           doc.setFontSize('25');
       doc.setFontType('bold');
       doc.text('Exam Report : '+this.myFormGroup.value.testName, 15, 15)//partyname
       doc.setFontSize('10');
      //  doc.text(this.handleF.getDateddmmyy(this.date1)+' to '+this.handleF.getDateddmmyy(this.date2), 165, 19)//date
       doc.text(String(pager), 180, 5)//pageno
       pager=pager+1;
       doc.setFontSize('25');
       doc.setLineWidth(0.5);
       doc.line(0, 20, 210, 20);//line after main header
       //headers
       doc.setFontSize('10');
       doc.text('Sr', 2, y-6)//partyname
       doc.text('Word', 8, y-6)//partyname
       doc.text('Translation', 36, y-6)//partyname
       doc.text('Answer', 99, y-6)//partyname
       doc.text('Remark',162,y-6)
       //headers
       doc.line(0, 25, 210, 25);//line after header
   
       //vertical lines
       doc.line(7, 20, 7, 25);//srno
       doc.line(33, 20, 33, 25);//date
       doc.line(97, 20, 97, 25);//date
       doc.line(160,20,160,25)
       //vertical lines
       }
       doc.text(this.handlefunction.generate2DigitNumber(String(i+1)), 2, y-1)//partyname
        doc.text(data[i]['tamilWord'], 8, y-1)//partyname
        doc.text(data[i]['translation'], 34, y-1)//Name
        doc.text(data[i]['value'], 99, y-1)//Namet
doc.text(data[i]['remark'],162,y-1)
         doc.line(0, y, 210, y);//line after header
         y = y + 5;
       }
  //vertical lines//getting applied for every loop, make it happen once only
  doc.line(7, starty, 7, y-5);//srno
          doc.line(33, starty, 33, y-5);//date 
          doc.line(97, starty, 97, y-5);//date
          doc.line(160,starty,160,y-5)
  //vertical lines
       doc.save('Exam-Report.pdf')
     }

}
