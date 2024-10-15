import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('/chat')
export class ChatController {
  constructor(private readonly appService: ChatService) {}

  @Post('/create/:userIdPrimary/:userIdSecondary')
  createChatRoom(
    @Param() userIdPrimary: string,
    @Param() userIdSecondary: string,
  ) {
    return this.appService.createChatRoom(userIdPrimary, userIdSecondary);
  }

  @Get('/get/:userId')
  getChatRoomsOfUser(@Param() userId: string) {
    return this.appService.getChatRoomsOfUser(userId);
  }

  @Get('/messages/:chatRoomId')
  getMessagesOfChatRoom(@Param() chatRoomId: string) {
    return this.appService.getMessagesOfChatRoom(chatRoomId);
  }

  @Patch('/read/:messageId')
  readMessage(@Param() messageId: string) {
    return this.appService.readMessage(messageId);
  }

  @Get('/find/:user1Id/:user2Id')
  findFirstChatRoomByUserIds(
    @Param() user1Id: string,
    @Param() user2Id: string,
  ) {
    return this.appService.findFirstChatRoomByUserIds(user1Id, user2Id);
  }
}
