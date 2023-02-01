import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message, MessageService } from 'primeng/api';
import { LoginService } from '../demo/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
})
export class AppLoginComponent implements OnInit {

  msgs: Message[] = [];
  navigation: string = '';

  public formSignup: FormGroup
  public busy = false

  constructor(private fb: FormBuilder, private loginService: LoginService) {

    this.formSignup = this.fb.group({
      fullName: ['', Validators.required],
      officeName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  ngOnInit(): void {

  }

  public signUp() {

  }

  submit() {

    this.busy = true;
    this
      .loginService.signUp(this.formSignup.value).subscribe(
        {
          next: () => {
            this.showSuccessViaMessages()
          },
          error: () => {
            this.showErrorViaMessages()
          }
        }
      );
  }

  showSuccessViaMessages() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Sua conta foi criada com Sucesso!', detail: 'Verifique o seu e-mail!' });
  }

  showErrorViaMessages() {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: 'Algo deu errado!', detail: 'Por favor contate o suporte.' });
  }
}
