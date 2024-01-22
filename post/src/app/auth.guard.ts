import { Router } from "@angular/router"
import { UserService } from "./user.service"
import { inject } from "@angular/core"
export const canactivate = () =>{
    const router = inject(Router)
    const authservice = inject(UserService)
    if(authservice.getisauth()){
        return true
    }
    else{
        router.navigate(['/'])
        return false
        
    }
}