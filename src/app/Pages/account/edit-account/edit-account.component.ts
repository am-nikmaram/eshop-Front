import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { CurrentUser } from 'src/app/DTOs/Account/CurrentUser';
import { editUserDto } from 'src/app/DTOs/Account/EditUserDTO';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss'],

})
export class EditAccountComponent implements OnInit{
  currentUser:CurrentUser;
   editUserDto:editUserDto;
   editResult:boolean=null;
 constructor(private authService:AuthService,public dialog: MatDialog){

 }
  editUser:FormGroup;
  ngOnInit(): void {
this.authService.getCurrentUser().subscribe({
  next:(res)=>{
    this.currentUser=res;
    this.editUser= new FormGroup({
      address:new FormControl(res.address,[Validators.required,Validators.maxLength(100)]),
      fullName:new FormControl(res.fullName,[Validators.required,Validators.maxLength(100)])
    });

  }
});

 
  }

  editUserSubmit(){
    if(this.editUser.valid){
      const dialogRef = this.dialog.open(DialogBoxComponent);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        if(result){
             this.editUserDto=new editUserDto(this.editUser.controls['fullName'].value,this.editUser.controls['address'].value);
        //  console.log(this.editUser.controls['fullName'].value);
             this.authService.updateUser(this.editUserDto).subscribe(res=>{
              console.log(res);
              
             });
        }
      });

    }else{
      this.editUser.markAllAsTouched();
    }
  }

}

/////////////////////////////////////////////////////////////////////////////////
@Component({
  selector: 'dialogboxcomponent',
  templateUrl: 'dialog-box-component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogBoxComponent {}