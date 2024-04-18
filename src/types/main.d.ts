interface PostResponse {
  data: PostItem[];
}

interface PostItem {
  id: number;
  title: string;
  slug: string;
  body: string;
  creator: Creator;
}

interface Creator {
  id: number;
  name: string;
  email: string;
  user_type: string;
}
