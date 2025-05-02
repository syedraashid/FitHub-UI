import * as signalR from "@microsoft/signalr";
import { notificationStore } from "../stores/NotificationStore";

const Baseurl = import.meta.env.VITE_API_BASE_URL; 
export class NotificationServices{
    Notifistore: ReturnType<typeof notificationStore>;
    Connection: any;    
    constructor(){
        this.Notifistore = notificationStore();
        this.Connection = new signalR.HubConnectionBuilder()
        .withUrl(`${Baseurl}/hubs/notifications`) 
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
        this.Connection.on("SendNotification", (message: string, datetime:string) => {
          this.Notifistore.AddMessage({
            message,
            shortMessage: message.slice(0, 30),
            datetime:datetime
          });
        });
      }
}
