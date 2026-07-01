export interface ICompanyService {
    getCompanyIdByUserId(userId:string):Promise<string>
}


