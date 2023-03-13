import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { ConfirmationService, MessageService } from 'primeng/api'
import { Group } from 'src/app/models/group.models'
import { ScreenService } from 'src/app/services/screen.service'

@Component({
    selector: 'app-group',
    templateUrl: './screen.component.html',
    providers: [MessageService, ScreenService, ConfirmationService],
})
export class GroupComponent implements OnInit {
    title: string = ''

    path: string

    navigation: string = ''

    rows: Group[]

    busy: boolean = false

    formGroup: FormGroup

    constructor(
        private fb: FormBuilder,
        private service: MessageService,
        private screenService: ScreenService,
        private confirmationService: ConfirmationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe((params) => {
            this.path = params.screen
        })
        
        switch (this.path) {
            case 'groups': {
                this.title = 'Grupos'
                this.path = 'groups'
                break
            }
            case 'areas': {
                this.title = 'Areas'
                this.path = 'areas'
                break
            }
            case 'actions': {
                this.title = 'Tipos de Ações'
                this.path = 'actions'
                break
            }
            case 'forums': {
                this.title = 'Forum'
                this.path = 'forums'
                break
            }
            case 'judicial-district': {
                this.title = 'Comarca'
                this.path = 'judicial-district'
                break
            }
            case 'judicial-progres': {
                this.title = 'Tipos de andamentos processuais'
                this.path = 'judicial-progress'
                break
            }
            case 'legal-values': {
                this.title = 'Valor Processual'
                this.path = 'legal-values'
                break
            }
            case 'legal-branches': {
                this.title = 'Vara'
                this.path = 'legal-branches'
                break
            }
            case 'papers': {
                this.title = 'Tipos de Papéis'
                this.path = 'papers'
                break
            }
            case 'procedural-phases': {
                this.title = 'Fase Processual'
                this.path = 'procedural-phases'
                break
            }
            case 'rites': {
                this.title = 'Ritos'
                this.path = 'rites'
                break
            }
            default: {
                break
            }
        }

        this.load()

        this.formGroup = this.fb.group({
            id: [null],
            name: ['', Validators.compose([Validators.required, Validators.min(5), Validators.max(250)])],
        })
    }

    save() {
        this.busy = true
        this.formGroup.disable()
        if (this.formGroup.value.id == null || this.formGroup.value.id == '') {
            this.screenService.save(this.formGroup.value, this.path).subscribe({
                next: () => {
                    this.showSuccessViaToast(), this.formGroup.reset(), (this.busy = false), this.formGroup.enable()
                },
                error: () => {
                    this.showErrorViaToast(), (this.busy = false)
                    this.formGroup.enable()
                },
            })
        } else {
            this.update()
        }
    }

    load() {
        this.screenService.load(this.path).subscribe({
            next: (data) => {
                this.rows = data.content
            },
            error: () => {
                this.showErrorViaToast()
            },
        })
    }

    edit(uuid: string) {
        this.navigation = 'form'
        this.busy = true
        this.formGroup.enable()
        this.screenService.findById(uuid, this.path).subscribe({
            next: (data) => {
                this.formGroup.patchValue(data)
                this.busy = false
            },
            error: () => {
                this.showSuccessViaToast()
                this.formGroup.enable()
            },
        })
    }

    update() {
        this.busy = true
        this.formGroup.disable()
        this.screenService.update(this.formGroup.value, this.path).subscribe({
            next: () => {
                this.showSuccessViaToast(), this.formGroup.reset(), (this.busy = false), this.formGroup.enable()
            },
            error: () => {
                this.showErrorViaToast(), (this.busy = false)
            },
        })
    }

    delete(id: string) {
        this.confirmationService.confirm({
            key: 'confirm1',
            message: 'Confirma essa exclusão?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.busy = true
                this.screenService.delete(id, this.path).subscribe({
                    next: () => {
                        this.showSuccessViaToast(), (this.busy = false), this.load()
                    },
                    error: () => {
                        this.showErrorViaToast(), (this.busy = false)
                    },
                })
            },
        })
    }

    showErrorViaToast() {
        this.service.add({
            key: 'tst',
            severity: 'error',
            summary: 'Mensagem de Erro',
            detail: 'Ocorreu algum erro!',
        })
    }

    showSuccessViaToast() {
        this.service.add({
            key: 'tst',
            severity: 'success',
            summary: 'Mensagem de Sucesso',
            detail: 'Salvo com sucesso!',
        })
    }
}
