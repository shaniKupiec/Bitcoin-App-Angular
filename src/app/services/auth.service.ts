import { Injectable } from '@angular/core';
import { storageService } from './storageService'

const LOGGED_IN_KEY_KEY = 'user logged in'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }
    
    async checkIsLoggedIn(): Promise<boolean> {
        const isLoggedIn = !!storageService.loadFromStorage(LOGGED_IN_KEY_KEY)
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(true)
            }, 0);
        })
        // return isLoggedIn
    }
}
