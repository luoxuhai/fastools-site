import request from '@/utils/request.js';

export enum EToolType {
  video = 'video',
  audio = 'audio',
  doc = 'doc',
  image = 'image',
  other = 'other',
}

interface IQueryToolsParams {
  tool_type?: EToolType;
  page?: number;
  per_page?: number;
}

export const queryTools = async (params: IQueryToolsParams) => request('/v1/tools', { method: 'get', params });

export const queryTool = async (alias: string) => request(`/v1/tools/${alias}`);

export const star = async (data: { id: string; method: string }) =>
  request(`/v1/tools/star/${data.id}`, { method: 'put', data: { method: data.method } });
