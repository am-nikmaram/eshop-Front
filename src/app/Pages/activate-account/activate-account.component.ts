import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {
  showSuccess: boolean;
  showError: boolean;
  errorMessage: string;

  /**
   *
   */
  constructor(private activatedRoute: ActivatedRoute, private authService:AuthService) {
  }

  ngOnInit(): void {
    this.confirmEmail();
  }

  private confirmEmail = () => {
    this.showError = this.showSuccess = false;

    const token = this.activatedRoute.snapshot.queryParams['token'];
    const email = this.activatedRoute.snapshot.queryParams['email'];
   // console.log("email is"+email);
   // console.log("token is "+token);
    this.authService.confirmEmail( token, email)
    .subscribe({
      next: (_) => this.showSuccess = true,
      error: (err: HttpErrorResponse) => {
        this.showError = true;
        this.errorMessage = err.message;
      }
    })
  }
}