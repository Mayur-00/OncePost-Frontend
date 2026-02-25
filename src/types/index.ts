export interface post {
  platform_post: [
    {
      id: string;
      status: string;
      platform: string;
      platform_post_url: string;
      postedAt: Date;
    },
  ];
  content?: string;
  mediaURl?: string;
  status: string;
  owner_id: string;
  scheduled_for?:string;
  scheduledAt?:string;

}

export interface UserState {
  id: string;
  name: string;
  email: string;
  profile_Picture: string;
  createdAt: string;
}

export interface ConnectedAccount {
  id: string;
  platform: string;
  display_name: string;
  profile_picture: string;
  isActive: boolean;
  isExpired: boolean;
}

export interface UserStore {
  user: UserState | null;
  connectedAccounts: ConnectedAccount[] | null;
  loading: boolean;
  isFetching:boolean;
  profilePictureUpdating: boolean;
  profileNameUpdating: boolean;
  profilePicture:string;

  getUser: () => void;
   updateProfilePicture :  (imageLink:string) =>void
  updateProfileName :  (name:string) =>void
  deleteAccount :  () =>Promise<{ success: boolean; message: string }>;
  uploadImage :  (file:File) => Promise<string | null>

}

export interface ApiResponse {
  statusCode: number;
  data: any;
  message: string;
  success: boolean;
}

export interface UserObj {
  id: string;
  name: string;
  email: string;
  password: string;
  provider_id: string;
  provider: string;
  profile_picture: string;
  refresh_token: string;
  createdAt: Date;
  updatedAt: Date;
  connected_accounts: ConnectedAccount[];
  _count: {
    platform_post: number;
    connected_accounts: number;
    posts: number;
  };
}
export type UpdateResponse ={
  name?:string;
  profile_picture?:string;
};

export interface PostStore {
  posts: PostsObj[] | null;
  recentsPost: PostsObj[] | null;
  scheduledPosts:PostsObj[] | null;
  selectedPost: {} | null;
  postsLoading: boolean;
  isSubmiting: boolean;

  getPosts: (
    limit: number,
    skip: number,
  ) => Promise<{ success: boolean; message: string }>;
  searchPosts: (
    query: string,
    type: string,
    limit: number,
    skip: number,
  ) => Promise<{ success: boolean; message: string }>;
  createPost: (data: any) => Promise<{ success: boolean; message: string }>;
  // deletePost:()=>void
}

export interface PostsObj {
  id: string;
  owner_id: string;
  content: string | null;
  mediaUrl: string | null;
  mediaType: string | null;
  status: string;
  scheduled_for?:string[];
  scheduledAt?:string;
  postedAt?:string;
  createdAt: Date;
  updatedAt: Date;
  platform_post: PlatformPostsObj[];

}

export interface PlatformPostsObj {
  platform: string;
  id: string;
  platform_post_url: string;
  status: string;
}

export interface UserInfo_Api_Response extends ApiResponse {
  data: UserObj;
}
export interface UserPosts_Api_Response extends ApiResponse {
  data: PostsObj[];
}
