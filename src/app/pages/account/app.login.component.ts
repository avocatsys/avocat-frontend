import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { Message } from 'primeng/api'
import { LoginService } from 'src/app/services/login.service'
import { Security } from 'src/app/utils/security.utils'

@Component({
    selector: 'app-login',
    templateUrl: './app.login.component.html',
})
export class AppLoginComponent implements OnInit {
    msgs: Message[] = []

    navigation: string

    public formSignup: FormGroup
    public formLogin: FormGroup
    public formForgot: FormGroup
    public formForgotPassword: FormGroup

    public busy = false

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private fb: FormBuilder, private loginService: LoginService) {
        this.formSignup = this.fb.group({
            fullName: ['', Validators.required],
            officeName: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.email])],
        })

        this.formLogin = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        })

        this.formForgot = this.fb.group({
            password1: ['', Validators.required],
            password2: ['', Validators.required],
        })

        this.formForgotPassword = this.fb.group({
            email: ['', Validators.required],
        })
    }
    ''
    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((params) => {
            if (!Object.keys(params).length) {
                this.navigation = 'login'
            } else {
                this.navigation = 'forgot'
                Security.setTokenTemporaly(params.key)
            }
        })
    }

    signUp() {
        this.busy = true
        this.loginService.signUp(this.formSignup.value).subscribe({
            next: () => {
                this.showSuccessViaMessages('Sua conta foi criada com Sucesso! Verifique o seu e-mail')
            },
            error: () => {
                this.showErrorViaMessages()
            },
        })
    }

    logIn() {
        this.busy = true
        this.loginService.logIn(this.formLogin.value).subscribe({
            next: (data) => {
                Security.setCredentials(data)
                this.router.navigate(['/dash'])
            },
            error: () => {
                this.showErrorViaMessages()
            },
        })
    }

    resetPassword() {
        this.busy = true
        this.loginService.resetPassword(this.formForgot.value).subscribe({
            next: () => {
                this.showSuccessViaMessages('Senha alterada com sucesso')
                this.router.navigate(['/login'])
            },
            error: () => {
                this.showErrorViaMessages()
            },
        })
    }

    forgotPassword() {
        this.busy = true
        this.loginService.forgotPassword(this.formForgotPassword.value).subscribe({
            next: () => {
                this.showSuccessViaMessages('Enviamos um link no seu e-mail com as instruções. Verifique seu e-mail!')
                this.router.navigate(['/login'])
            },
            error: () => {
                this.showErrorViaMessages()
            },
        })
    }

    showSuccessViaMessages(msg: string) {
        this.msgs = []
        this.msgs.push({
            severity: 'success',
            summary: msg,
            //detail: 'Verifique o seu e-mail!',
        })
    }

    showErrorViaMessages() {
        this.msgs = []
        this.msgs.push({
            severity: 'error',
            summary: 'Algo deu errado!',
            detail: 'Por favor contate o suporte.',
        })
    }
}
