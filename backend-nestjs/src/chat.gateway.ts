import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from './prisma.service';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private prisma: PrismaService,
    private readonly chatService: ChatService,
  ) {}

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createPrivateRoom')
  async handleCreatePrivateRoom(
    client: Socket,
    payload: { userPrimaryId: string; userSecondaryId: string },
  ) {
    let room = await this.chatService.findFirstChatRoomByUserIds(
      payload.userPrimaryId,
      payload.userSecondaryId,
    );

    if (!room) {
      room = await this.chatService.createChatRoom(
        payload.userPrimaryId,
        payload.userSecondaryId,
      );
    }

    if (room) {
      client.join(room.id.toString());
      client.emit('joinedRoom', room.id);
    }
  }

  @SubscribeMessage('privateMessage')
  async handlePrivateMessage(
    client: Socket,
    payload: { roomId: string; message: string; userId: string },
  ) {
    const newMessage = await this.chatService.createMessage(
      payload.roomId,
      payload.userId,
      payload.message,
    );

    this.server
      .to(payload.roomId.toString())
      .emit('newPrivateMessage', newMessage);
  }
}
