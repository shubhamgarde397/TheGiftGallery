import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { getFullApi } from './getFullApi.service';
import { handleFunction } from '../functions/handleFunctions';
import {
  CognitoUser, CognitoUserPool,
  CognitoUserSession, AuthenticationDetails
} from 'amazon-cognito-identity-js'
import { BehaviorSubject, Observable } from 'rxjs';
import { SecurityCheckService } from '../Data/security-check.service';
import { Router } from '@angular/router';
import { ObsServiceService } from '../Data/obs-service.service';
import { HandleDataService } from '../Data/handle-data.service';

const PoolData = {
  UserPoolId: 'ap-south-1_ZzgcCts3f',
  ClientId: '7bkru6bi0c03bm2280b38tv5da'
}
const userPoolData = new CognitoUserPool(PoolData);


@Injectable()
export class ApiCallsService {
  private authService = new BehaviorSubject('false');
  public authSuccess = this.authService.asObservable();
  public headerPost: HttpHeaders;
  public URL = '';
  public username;
  public typeofuser=3;

  constructor(public hs: HandleDataService, public httpClient: HttpClient, public securityCheck: SecurityCheckService, public obs: ObsServiceService, public getfullapi: getFullApi, public handlefunction: handleFunction, public security: SecurityCheckService, public router: Router) {
    this.username = this.securityCheck.username
    this.typeofuser=this.securityCheck.typeofuser;
  }

  handleData_New_python(api, apiCall, formBody = {}, code) {
    formBody['user'] = 'shubham';
    formBody['typeofuser'] = '1';
    formBody['todayDate']=this.handlefunction.createDate(new Date());
    this.headerPost = new HttpHeaders();
    this.headerPost.append('Content-Type', 'application/json');
    this.URL = this.getfullapi.getFullAPI(api);
    switch (apiCall) {
      case 1: return this.httpClient.post(this.URL, formBody, { headers: this.headerPost }).pipe(map((res) => res));

    }
  }



}
