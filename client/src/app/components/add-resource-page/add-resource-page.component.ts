import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';
import { ResourceResponse } from 'src/app/interfaces/resource-response.interface';
import { YEAR, BRANCH } from 'src/app/enums/enum';

@Component({
  selector: 'app-add-resource-page',
  templateUrl: './add-resource-page.component.html',
  styleUrls: ['./add-resource-page.component.scss']
})
export class AddResourcePageComponent implements OnInit {
  YEAR: any = YEAR; 
  BRANCH: any = BRANCH;
  addResource: FormGroup;

  constructor(
    private formBuilder : FormBuilder, 
    private resourceService : ResourceService,
    private router : Router
  ){
    this.addResource = this.formBuilder.group({
      title: ['', Validators.required], 
      year: ['', Validators.required], 
      branch: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.resourceService.addResource(this.addResource.value).subscribe((res: any) => {
      let resourceResponse = res as ResourceResponse; 
      if(resourceResponse.success) {
        this.router.navigate(['']);
      }
    })
  }
}
