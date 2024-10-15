import { Prisma } from '@prisma/client';

export class ChatEntity implements Prisma.ChatRoomUncheckedCreateInput {
  id?: string;
  users?: Prisma.UserUncheckedCreateNestedManyWithoutRoomsInput;
  messages?: Prisma.MessageUncheckedCreateNestedManyWithoutChatRoomInput;
  chatRoomUser?: Prisma.ChatRoomUserUncheckedCreateNestedManyWithoutChatRoomInput;
}
