import request from '@/utils/request.js';
import { IQueryToolsParams } from './data';

export const queryTools = async (params: IQueryToolsParams) => request('/v1/tools', { method: 'get', params });

export const queryTool = async (alias: string) => request(`/v1/tools/${alias}`);

export const queryToolHtml = async (alias: string) =>
  request(`/v1/tools/html`, { method: 'get', params: { alias }, responseType: 'document' });

export const searchTool = async (inputValue: string) => request('/v1/tools/search', { method: 'get', params: { inputValue } });

export const star = async (data: { id: string; method: string }) =>
  request(`/v1/tools/star/${data.id}`, { method: 'put', data: { method: data.method } });
