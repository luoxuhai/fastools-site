import request from '@/utils/request.js';
import { IQueryVipExpires } from '@/services/user';

export const queryPayCode = async (days: number, trial?: { toolId: string }) =>
  request('/v1/pay/native', { method: 'post', data: { days, trial } });

export const queryPayInfo = async (order: string) => request('/v1/pay/info', { method: 'get', params: { order } });

export const queryTrialOrder = async (params?: IQueryVipExpires) =>
  request('/v1/pay/trial_order', { method: 'get', params });
