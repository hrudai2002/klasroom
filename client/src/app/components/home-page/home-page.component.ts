import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';
import { ResourceResponse } from 'src/app/interfaces/resource-response.interface';
import { YEAR, BRANCH } from 'src/app/enums/enum';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  YEAR : any = YEAR; 
  BRANCH: any = BRANCH;
  resources: any = [];


  constructor(
    private router : Router,
    private resourceService : ResourceService
  ){}

  ngOnInit(): void {
    this.resourceService.getAllResources().subscribe((res: any) => {
      let resourceResponse = res as ResourceResponse;
      if(resourceResponse.success){
        this.resources = resourceResponse.data;
      }
    });
  }

  year(year: number) : any {
    if (year === 1) return "st";
    if (year === 2) return "nd";
    if (year === 3) return "rd";
    if (year === 4) return "th";
  }

  color(branch: string) : any {
    if (branch === BRANCH.CSE) return "blue";
    if (branch === BRANCH.ECE) return "orange";
    if (branch === BRANCH.EEE) return "red";
    if (branch === BRANCH.ME) return "cyan";
  }

  image(branch: string) : any {
    if (branch === BRANCH.CSE) return "https://assets.codepen.io/2301174/icon-calculator.svg";
    if (branch === BRANCH.ECE) return "https://assets.codepen.io/2301174/icon-karma.svg";
    if (branch === BRANCH.EEE) return "https://assets.codepen.io/2301174/icon-team-builder.svg";
    if (branch === BRANCH.ME) return "https://assets.codepen.io/2301174/icon-supervisor.svg";
  }
  
  navigateToAddResource() {
    this.router.navigate(['/add']);
  }

  navigateToResource(id : any) {
    this.router.navigate([`resource/${id}`]);
  }
}
