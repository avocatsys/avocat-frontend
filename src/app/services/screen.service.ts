import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Group, PageableGroup } from '../models/group.models'
import { Security } from '../utils/security.utils'

@Injectable({
    providedIn: 'root',
})
export class ScreenService {
    constructor(private http: HttpClient) {}

    private url = 'http://localhost:8080/avocat'

    private readonly customerId = Security.getCustomerId()

    save(data: Group, path: string) {
        return this.http.post<Group>(`${this.url}/v1/customer/${this.customerId}/${path}`, data, { headers: Security.composeHeaders() })
    }

    update(data: Group, path: string) {
        return this.http.put<Group>(`${this.url}/v1/customer/${this.customerId}/${path}`, data, { headers: Security.composeHeaders() })
    }

    load(path: string) {
        return this.http.get<PageableGroup>(`${this.url}/v1/customer/${this.customerId}/${path}`, { headers: Security.composeHeaders() })
    }

    findById(uuid: string, path: string) {
        return this.http.get<Group>(`${this.url}/v1/customer/${this.customerId}/${path}/${uuid}`, { headers: Security.composeHeaders() })
    }

    delete(uuid: string, path: string) {
        return this.http.delete(`${this.url}/v1/customer/${this.customerId}/${path}/${uuid}`, { headers: Security.composeHeaders() })
    }
}
