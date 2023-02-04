import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ResourceService } from 'src/app/services/resource.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { YEAR, BRANCH } from 'src/app/enums/enum';
import {marked} from 'marked';

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

  constructor(
    private formBuilder : FormBuilder, 
    private resourceService : ResourceService,
    private router : ActivatedRoute, 
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

  getData() {
    let resourceId = this.router.snapshot.params['id'];
    this.resourceService.getResource(resourceId).subscribe((res : any) => {
      if(res.success) {
        this.convertedMarkDown = marked(res.data.description);
        this.resource = res.data; 
        this.addResource.patchValue(res.data);
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
