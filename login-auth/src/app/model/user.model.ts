import { environment } from "src/environments/environment";


const base_url = environment.base_url;

export class User{

    constructor(
        public name: string, 
        public email: string,
        public password: string, 
        public role?: string,
        public image?: string,
        public google?: string, 
        public token?: string, 
    ){
         this.role = 'USER_ROLE';
    }

    get imageUrl(){
        let imgUrl = `${base_url}/photos/no-image`;
        return imgUrl;
    }
}