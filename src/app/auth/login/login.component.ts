import { Usuario } from './../../interfaces/usuario.interface';
import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
    /* loginForm: FormGroup;

    constructor(
      private fb: FormBuilder,
      private authService: AuthService, 
      private router: Router )
      
      {
        
      this.loginForm = this.fb.group ({
        username: ['', Validators.required, Validators.minLength(3)],

        password: ['', Validators.required, Validators.minLength(3)],
      })
    }

    login(): void {
      if (this.loginForm.valid){
        const { username , password} = this.loginForm.value;
        this.authService.login(username,password).subscribe(success => {
          if (success) {
            this.router.navigate(['']);
          }
          else{
            alert ('Usuario o contraseña incorrectos');
          }
        })
      }
    } */
      private formBuilder = inject(FormBuilder);

      form: FormGroup = this.formBuilder.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })
    
      constructor(
        private authService: AuthService,
        private router: Router
      ) { }
    
      onLogin() {
        if (this.form.invalid) return;
    
        const user = this.form.getRawValue() as Usuario;
    
        this.authService.login(user.username, user.password).subscribe({
          next: (loggedin) => {
            if (loggedin) {
              this.router.navigate(['/']);
            }
            else{
              alert ('Usuario o contraseña Incorrecots');
              return;
            }
          }
        })
      }
}
