import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';
import { ResourceResponse } from 'src/app/interfaces/resource-response.interface';
import * as moment from 'moment';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})


export class HomePageComponent implements OnInit {
  resources: any = [];
  selectedValue: any;
  filterYear = [];
  filterBranch = [];
  searchTerm='';


   yearArray  = [
    {value: '1', active: false},
    {value: '2', active: false},
    {value: '3', active: false},
    {value: '4', active: false}
   ];
   branchArray : any = [
    {value: 'cse', active: false},
    {value: 'ece', active: false},
    {value: 'mech', active: false},
    {value: 'it', active: false}
   ];

   yearTags = ['00', 'st', 'nd', 'rd', 'th']
   
  constructor(
    private router : Router,
    private resourceService : ResourceService
  ){}

  ngOnInit(): void {
    this.resourceService.getAllResources().subscribe((res: any) => {
      let resourceResponse = res as ResourceResponse;
      if(resourceResponse.success){
        this.resources = resourceResponse.data; 

        for(let data of this.resources) {
          const date = this.resources.date; 
          const formattedDate = moment(date).format('DD-MMM'); 
          const newFormattedDate = formattedDate.replace('-', ' ');
          data['formattedDate'] = newFormattedDate;
        }
      }
    });
  }

  onYearFilterChange() {
    let params = {
      year: this.filterYear,
      branch: this.filterBranch
    }
  
    this.resourceService.getFilteredResources(params).subscribe((res : any) => {
      if(res.success) {
        this.resources = res.data;
      }
    })
  }

  onBranchFilterChange() {
    let params = {
      year: this.filterYear,
      branch: this.filterBranch
    }
    this.resourceService.getFilteredResources(params).subscribe((res : any) => {
      if(res.success) {
         this.resources = res.data;
      }
    })
  }

  navigateToAddResource() {
    this.router.navigate(['/add']);
  }

  navigateToResource(id : any) {
    this.router.navigate([`resource/${id}`]);
  }
}
