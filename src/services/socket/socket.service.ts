import SocketIo from "./socketio";
import { Socket } from "socket.io";
import http from "http";

export default class SocketService {
  private socket: any;
  private broker: any;
  constructor(server: http.Server, broker: any) {
    this.socket = new SocketIo(server, {
      onConnect: (socket) => this.onConnect(socket),
      publishMessage: (message: string) => this.publishMessage(message),
    });
    this.broker = broker;
  }

  public startConnection() {
    this.socket.NewSocketConnection();
  }

  public onConnect(socket: Socket) {
    console.log(socket.id);
  }

  public publishMessage(message: string) {
    console.log("Socket service: " + message);
  }
}
