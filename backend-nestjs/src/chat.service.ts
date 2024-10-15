import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';

@Injectable()
export class ChatService {
  constructor(private readonly chatRepository: ChatRepository) {}

  async findFirstChatRoomByUserIds(user1Id: string, user2Id: string) {
    return await this.chatRepository.findFirstChatRoomByUserIds(
      user1Id,
      user2Id,
    );
  }

  async createChatRoom(userIdPrimary: string, userIdSecondary: string) {
    return await this.chatRepository.createChatRoom(
      userIdPrimary,
      userIdSecondary,
    );
  }

  async getChatRoomsOfUser(userId: string) {
    return await this.chatRepository.getChatRoomsOfUser(userId);
  }

  async getMessagesOfChatRoom(chatRoomId: string) {
    return await this.chatRepository.getMessagesOfChatRoom(chatRoomId);
  }

  async readMessage(messageId: string) {
    return await this.chatRepository.readMessage(messageId);
  }

  async createMessage(chatRoomId: string, userId: string, content: string) {
    return await this.chatRepository.createMessage(chatRoomId, userId, content);
  }
}
