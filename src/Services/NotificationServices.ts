import * as signalR from "@microsoft/signalr";
import { notificationStore } from "../stores/NotificationStore";

interface notificationDto{
  message:string,
  datetime:string
}

const Baseurl = import.meta.env.VITE_API_BASE_URL; 
export class NotificationServices{
    Notifistore: ReturnType<typeof notificationStore>;
    Connection: any;    
    constructor(){
        this.Notifistore = notificationStore();
        this.Connection = new signalR.HubConnectionBuilder()
        .withUrl(`${Baseurl}/hubs/notifications`,{
          accessTokenFactory: () => localStorage.getItem("accessToken")?.toString() || ""
        }) 
        .withAutomaticReconnect()
        .build();;
    }

    public async startConnection() {
        try {
          await this.Connection.start();
          console.log("SignalR connected");
          this.registerOnServerEvents(); 
        } catch (err) {
          console.error("SignalR connection error: ", err);
        }
      }
    
      private registerOnServerEvents() {
        this.Connection.on("SendNotification", (Request: notificationDto) => {
          this.Notifistore.AddMessage({
            message:Request.message,
            shortMessage: Request.message.slice(0, 30),
            datetime:Request.datetime,
            isReaded:false
          });
        });
      }
}
