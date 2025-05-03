import { defineStore } from "pinia";

interface Notification{
    message:string,
    shortMessage:string,
    datetime: string,
    isReaded:boolean
}
export const notificationStore = defineStore("notificationStore",{
    state: () => ({
        Noti : [] as Notification[],
    }),
    actions: {
        async AddMessage(Notifi:Notification){
           const {message , shortMessage, datetime, isReaded} = Notifi;
           this.Noti.push({message , shortMessage, datetime, isReaded})
        },
        async MarkAsRead(index:number){
           if(this.Noti[index]){
               this.Noti[index].isReaded = true;
           }
        },
        async MarkAllAsRead(){
            if(this.Noti){
                this.Noti.forEach(_ => _.isReaded = true);
            }
         }
    },
    getters: {
        Notificationlist : (state) => state.Noti,
    }
})