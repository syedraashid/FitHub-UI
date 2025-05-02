import { defineStore } from "pinia";

interface Notification{
    message:string,
    shortMessage:string,
    datetime: string,
}
export const notificationStore = defineStore("notificationStore",{
    state: () => ({
        Noti : [{
            message:"",
            shortMessage:"",
            datetime:"",
            isReaded:false,
        }],
    }),
    actions: {
        async AddMessage(Notifi:Notification){
           const {message , shortMessage, datetime} = Notifi;
           this.Noti.push({message , shortMessage, datetime, isReaded:false})
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