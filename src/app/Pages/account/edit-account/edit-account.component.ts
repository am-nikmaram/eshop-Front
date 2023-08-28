import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],

 
})
export class EditAccountComponent implements OnInit{
 constructor(private authService:AuthService){

 }
  editUser:FormGroup;
  ngOnInit(): void {
this.authService.getCurrentUser().subscribe({
  next:(res)=>{
    this.editUser= new FormGroup({
      address:new FormControl(res.address,[Validators.required,Validators.maxLength(100)]),
      fullName:new FormControl(res.fullName,[Validators.required,Validators.maxLength(100)])
    });

  }
});

 
  }

  editUserSubmit(){
    if(this.editUser.valid){

    }else{
      this.editUser.markAllAsTouched();
    }
  }

}

