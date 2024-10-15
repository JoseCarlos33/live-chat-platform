import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ChatEntity } from './chat.entity';

@Injectable()
export class ChatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createChatRoom(
    userIdPrimary: string,
    userIdSecondary: string,
  ): Promise<ChatEntity> {
    return await this.prisma.chatRoom.create({
      data: {
        chatRoomUser: {
          create: [{ userId: userIdPrimary }, { userId: userIdSecondary }],
        },
      },
    });
  }

  async findFirstChatRoomByUserIds(
    user1Id?: string,
    user2Id?: string,
  ): Promise<ChatEntity> {
    return await this.prisma.chatRoom.findFirst({
      where: {
        OR: [
          { chatRoomUser: { some: { userId: user1Id } } },
          { chatRoomUser: { some: { userId: user2Id } } },
        ],
      },
    });
  }

  getChatRoomsOfUser(userId: string) {
    return this.prisma.chatRoom.findMany({
      where: {
        chatRoomUser: {
          some: {
            userId,
          },
        },
      },
      select: {
        users: {
          select: {
            id: true,
            name: true,
          },
        },
        messages: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });
  }

  getMessagesOfChatRoom(chatRoomId: string) {
    return this.prisma.message.findMany({
      where: {
        chatRoom: { id: chatRoomId },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
        readed: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  readMessage(messageId: string) {
    return this.prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        readed: true,
      },
    });
  }

  createMessage(message: string, userId: string, chatRoomId: string) {
    return this.prisma.message.create({
      data: {
        content: message,
        chatRoom: {
          connect: {
            id: chatRoomId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
