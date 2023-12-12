import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import http from "http";
import Socket from "./src/services/socket/socket.service";
import Broker from "./src/services/broker/broker.service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const httpServer = http.createServer(app);

const broker = new Broker();
broker.createRabbitMQConnection();
const socket = new Socket(httpServer, broker);
socket.startConnection();

app.get("/", (req: Request, res: Response) => {
  res.send("Root");
});

httpServer.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
