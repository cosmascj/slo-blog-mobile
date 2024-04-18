interface PostResponse {
  data: PostItem[];
}

interface PostItem {
  id: number;
  title: string;
  slug: string;
  created_on: string;
  category: string;
  comments_count: number;
  body: string;
  media: string;
  creator: Creator;
}

interface Creator {
  id: number;
  name: string;
  email: string;
  user_type: string;
}
interface PostDetails {
  data: PostDetailsData;
}

interface PostDetailsData {
  id: number;
  title: string;
  slug: string;
  body: string;
  media: string;
  created_on: string;
  category: string;
  comments_count: number;
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
