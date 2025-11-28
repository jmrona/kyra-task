export type AssetStatus = 
  | 'APPROVED' 
  | 'PENDING_ADMIN_REVIEW' 
  | 'PENDING_BRAND_REVIEW'
  | 'REJECTED'
  | 'AWAITING_ASSET';
  
export type Brief = {
  id: number;
  name: string;
};

export type Asset = {
  id: number;
  creator: {
    id: number;
    handle: string;
    name: string;
    profilePictureUrl: string;
  };
  assetUrl: string;
  thumbnailUrl: string;
  caption: string;
  soundUrl: string;
  status: AssetStatus;
  deliverable: {
    id: number;
    brief: Brief;
    title: string;
    deadline: string | null;
    submissionOrigin: string;
    fees: number | null;
  };
};
