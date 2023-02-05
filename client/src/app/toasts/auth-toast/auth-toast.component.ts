import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-toast',
  templateUrl: './auth-toast.component.html',
  styleUrls: ['./auth-toast.component.scss']
})



export class AuthToastComponent {

  @Input() toastMessage : any; 

  @Input() toastColor: any; 

}
