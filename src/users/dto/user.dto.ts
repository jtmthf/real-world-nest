import { User } from '../user.entity';

export class UserDto {
  email!: string;

  token!: string;

  username!: string;

  bio?: string;

  image?: string;

  static fromEntity(user: User, token: string) {
    const dto = new UserDto();
    dto.email = user.email;
    dto.username = user.username;
    dto.bio = user.bio;
    dto.image = user.image;
    dto.token = token;

    return dto;
  }
}
