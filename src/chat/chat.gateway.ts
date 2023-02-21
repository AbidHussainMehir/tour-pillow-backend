import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit
} from '@nestjs/websockets';
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;


    users: number = 0;

    async handleConnection() {
        // A client has connected
        this.users++;
        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }
    async handleDisconnect() {
        // A client has disconnected
        this.users--;
        // Notify connected clients of current users
        this.server.emit('users', this.users);
    }
    @SubscribeMessage('chat')
    async onChat(client, message) {
        client.broadcast.emit('chat', message);
    }
    @SubscribeMessage('message')
    async messages(client, message) {
        console.log("message", message)
        client.broadcast.emit('message', message);
    }
    @SubscribeMessage('send_message')
    listenForMessages() {
        console.log("users")
        this.server.sockets.emit('receive_message',);
    }

}
