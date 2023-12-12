import { Server, Socket } from "socket.io";
import http from "http";

export default class SocketIo {
  private io: Server;
  private onConnectHandler: (socket: Socket) => void;
  private publishMessageHandler: (message: string) => void;
  constructor(
    server: http.Server,
    {
      onConnect,
      publishMessage,
    }: {
      onConnect: (socket: Socket) => void;
      publishMessage: (message: string) => void;
    },
  ) {
    this.io = new Server(server);
    this.onConnectHandler = onConnect;
    this.publishMessageHandler = publishMessage;
  }

  public NewSocketConnection() {
    this.io.on("connection", (socket: Socket) => {
      console.log("Initialize socket io connection");
      this.onConnect(socket);

      socket.on("publish", (message) => {
        this.publishMessage(message);
      });
    });
  }

  public onConnect(socket: Socket) {
    this.onConnectHandler(socket);
  }

  public publishMessage(message: string) {
    this.publishMessageHandler(message);
  }
}
