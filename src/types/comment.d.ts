interface CommentResponse {
  data: CommentResponseDaum[];
}

interface CommentResponseDaum {
  id: number;
  comment: string;
  post: Post;
  commenter: Commenter;
}

interface Post {
  id: number;
  title: string;
  slug: string;
  body: string;
  media: string;
  creator: Creator;
}

interface Creator {
  id: number;
  name: string;
  email: string;
  user_type: string;
  status: string;
  joined_on: string;
}

interface Commenter {
  id: number;
  name: string;
  email: string;
  user_type: string;
  status: string;
  joined_on: string;
}
