import { AuthService } from './../../services/auth.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent {

  private formBuilder = inject(FormBuilder);

  singUpForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

/*   constructor (
    private fb: FormBuilder,
    private AuthService: AuthService
  ){ 
    this.singUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })    
  } */

  singUp():void{
    if(this.singUpForm.valid){
      //const { username , password } = this.singUpForm.value;
      const user = this.singUpForm.getRawValue() as Usuario;


      this.authService.singup(user.username, user.password).subscribe(()=> {
        alert ('Usuario registrado con éxito');
        this.router.navigate(['']);
      })
    }else{return;}
  }
}
