import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ResourceService } from 'src/app/services/resource.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { YEAR, BRANCH } from 'src/app/enums/enum';
import {marked} from 'marked';
import * as moment from 'moment';

@Component({
  selector: 'app-resource-page',
  templateUrl: './resource-page.component.html',
  styleUrls: ['./resource-page.component.scss']
})
export class ResourcePageComponent implements OnInit {
  YEAR: any = YEAR; 
  BRANCH: any = BRANCH;
  addResource: FormGroup;
  convertedMarkDown = '';
  updateResourcePage : boolean = false;
  resource: any = [];
  author: string = '';
  date: any;

  permission: boolean = false;


  yearArray  = [
    {value: '1', active: false},
    {value: '2', active: false},
    {value: '3', active: false},
    {value: '4', active: false}
  ];

  branchArray = [
    {value: 'cse', active: false},
    {value: 'ece', active: false},
    {value: 'mech', active: false},
    {value: 'it', active: false}
   ];

  constructor(
    private formBuilder : FormBuilder, 
    private resourceService : ResourceService,
    private router : ActivatedRoute, 
    private authService : AuthService,
    private _router: Router,
  ) {
     this.addResource = this.formBuilder.group({
      title: ['', Validators.required], 
      year: ['', Validators.required], 
      branch: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getData();
  }

  getFormattedDate(date: any) {
    const formattedDate = moment(date).format('DD-MMM'); 
    const newFormattedDate = formattedDate.replace('-', ' '); 
    this.date = newFormattedDate;
}

  getData() {
    let resourceId = this.router.snapshot.params['id'];
    this.resourceService.getResource(resourceId).subscribe((res : any) => {
      if(res.success) {
        const data = res.data[0]; 
        const user = this.authService.getUser();
        this.getFormattedDate(res.data[0].date);
        this.permission = data.user._id === user ? true : false;
        this.convertedMarkDown = marked(data.description);
        this.resource = data; 
        this.author = data.user.name;
        this.addResource = this.formBuilder.group({
          title: data.title, 
          year: data.year.toString(), 
          branch: data.branch, 
          description: data.description
        })
      }
    })
  }


  year(year: number) : any {
    if (year === 1) return "st";
    if (year === 2) return "nd";
    if (year === 3) return "rd";
    if (year === 4) return "th";
  }

  onSubmit() {
    let resourceId = this.router.snapshot.params['id'];
    this.resourceService.updateResource(resourceId,  this.addResource.value).subscribe((res: any) => {
      if(res.success) {
        this.getData();
        this.updateResourcePage = false;
      }
    })
  }

  deleteResource() {
    let resourceId = this.router.snapshot.params['id']; 
    this.resourceService.deleteResource(resourceId).subscribe((res: any) => {
      if(res.success) {
        this._router.navigate(['']);
      }
    })
  }
  
}