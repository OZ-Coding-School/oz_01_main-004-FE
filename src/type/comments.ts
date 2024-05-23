export interface commentData {
  content: string;
  created_at: string;
  id: number;
  updated_at: string;
  user: commentUser;
}

export type allCommentData = commentData[];

export interface commentUser {
  created_at: string;
  email: string;
  nickname: string;
  profile_image: string | null;
  updated_at: string;
}
