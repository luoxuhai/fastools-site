import request from '@/utils/request.js';

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

export const queryTools = async (params: IQueryToolsParams) => request('/v1/tools', { method: 'get', params });

export const queryTool = async (alias: string) => request(`/v1/tools/${alias}`);

export const queryToolHtml = async (alias: string) =>
  request(`/v1/tools/html`, { method: 'get', params: { alias }, responseType: 'document' });

export const searchTool = async (inputValue: string) => request('/v1/tools/search', { method: 'get', params: { inputValue } });

export const star = async (data: { id: string; method: string }) =>
  request(`/v1/tools/star/${data.id}`, { method: 'put', data: { method: data.method } });
