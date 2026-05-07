export interface Post {

  id: number;

  username: string;

  userAvatar: string;

  mood: string;

  content: string;

  imageUrl?: string;

  likes: number;

  isLiked: boolean;
}