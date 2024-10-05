export interface login{
    email:string;
    password:string;
}

export interface register{
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    password:string;
}

export interface jwt{
    userId?:string;
 
}
// message?:string;
// isAuthenticated:boolean;
// username:string;
// email:string;
// roles:any[];
// token:string;
// expiresOn:string;
// refreshTokenExpiration:string;