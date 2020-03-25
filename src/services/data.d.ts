export enum EToolType {
  video = 'video',
  audio = 'audio',
  doc = 'doc',
  image = 'image',
  other = 'other',
  new = 'new',
  recommend = 'recommend',
}

interface IQueryToolsParams {
  tool_type?: EToolType;
  page?: number;
  per_page?: number;
  similarity?: number;
  alias?: string;
}

interface ILoginPayload {
  access_token?: string;
  tel?: string;
  verificationCode?: string;
}

interface IQueryVipExpires {
  order?: string;
  toolId?: string;
}
