import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MessageService } from 'primeng/api'
import { BranchOffice } from 'src/app/models/branch-office.models'
import { Group } from 'src/app/models/group.models'
import { Privilege } from 'src/app/models/privilege.models'
import { User } from 'src/app/models/user.models'
import { BranchOfficeService } from 'src/app/services/branch-office.service'
import { GroupService } from 'src/app/services/group.service'
import { PrivilegeService } from 'src/app/services/privilege.service'
import { UserService } from 'src/app/services/user.service'

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    providers: [MessageService, PrivilegeService, BranchOfficeService],
})
export class UserComponent implements OnInit {
    navigation: string = ''

    busy: boolean = false

    pageTitle = 'Usuários'

    rows: User[]

    privilegesOpt: Privilege[]

    privilegesChecked: string[]

    privilegeArray = []

    privileges: string[] = []

    groupDrop: Group[]

    branchOfficeDrop: BranchOffice[]

    formGroup: FormGroup

    constructor(
        private fb: FormBuilder,
        private service: MessageService,
        private userService: UserService,
        private privilegeService: PrivilegeService,
        private branchOfficeService: BranchOfficeService,
        private groupService: GroupService
    ) {}

    ngOnInit(): void {
        this.load()
        this.loadPrivileges()
        this.loadBranchOffices()
        this.loadGroups()

        this.formGroup = this.fb.group({
            id: [null],
            name: ['', Validators.compose([Validators.required, Validators.min(5), Validators.max(250)])],
            username: ['', Validators.compose([Validators.required, Validators.min(5), Validators.max(250)])],
            password: [null],
            branchOffice: [null, Validators.compose([Validators.required, Validators.min(5), Validators.max(250)])],
            group: [null, Validators.compose([Validators.required, Validators.min(5), Validators.max(250)])],
            privileges: [null, Validators.compose([Validators.required, Validators.min(5), Validators.max(250)])],
        })
    }

    save() {
        this.busy = true
        this.formGroup.disable()

        this.privilegeArray = []
        this.privilegesChecked.map((i) => {
            let privilege = this.getPrivileges(i)
            this.privilegeArray.push(privilege)
        })

        this.formGroup.get('privileges').setValue(this.privilegeArray)

        if (this.formGroup.value.id == null || this.formGroup.value.id == '') {
            this.userService.save(this.formGroup.value).subscribe({
                next: () => {
                    this.showSuccessViaToast(), this.clear()
                },
                error: () => {
                    this.showErrorViaToast(), (this.busy = false), this.clear()
                },
            })
        } else {
            this.update()
        }
    }

    load() {
        this.userService.load().subscribe({
            next: (data) => {
                this.rows = data.content
            },
            error: () => {
                this.showErrorViaToast()
            },
        })
    }

    loadPrivileges() {
        this.privilegeService.load().subscribe({
            next: (data) => {
                this.privilegesOpt = data.content
            },
            error: () => {
                this.showErrorViaToast()
            },
        })
    }

    loadBranchOffices() {
        this.branchOfficeService.load().subscribe({
            next: (data) => {
                this.branchOfficeDrop = data.content
            },
            error: () => {
                this.showErrorViaToast()
            },
        })
    }

    loadGroups() {
        this.groupService.load().subscribe({
            next: (data) => {
                this.groupDrop = data.content
            },
            error: () => {
                this.showErrorViaToast()
            },
        })
    }

    edit(uuid: string) {
        this.busy = true
        this.navigation = 'form'
        this.formGroup.enable()
        this.userService.findById(uuid).subscribe({
            next: (data) => {
                this.formGroup.patchValue(data)

                this.privileges = data.privileges.map((i) => i.id)
                this.busy = false
            },
            error: () => {
                this.showErrorViaToast()
                this.busy = false
            },
        })
    }

    update() {
        this.busy = true
        this.formGroup.disable()
        this.userService.update(this.formGroup.value).subscribe({
            next: () => {
                this.showSuccessViaToast(), this.clear()
            },
            error: () => {
                this.showErrorViaToast(), (this.busy = false)
            },
        })
    }

    getPrivileges(id: string) {
        return this.privilegesOpt.filter((i) => i.id == id)[0]
    }

    checkValue(privilege: any) {
        this.privilegesChecked = privilege
    }

    clear() {
        this.formGroup.reset()
        this.busy = false
        this.formGroup.enable()
        this.privileges = []
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
