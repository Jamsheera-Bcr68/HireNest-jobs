export interface IPresenceService{
    setOnline(userId:string):void
    setOffline(userId:string):void
    isOnline(userId:string):boolean
}