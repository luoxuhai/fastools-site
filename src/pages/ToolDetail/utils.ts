import NativeShare from 'nativeshare';
import localforage from 'localforage';
import { message } from 'antd';

import { queryVipExpires } from '@/services/user';
import { IQueryVipExpires } from '@/services/data';
import { postMessage } from '@/utils/utils';

/**
 * 分享
 *
 * @export
 */
export function handleShare(icon: string, title: string) {
  const nativeShare = new NativeShare();
  nativeShare.setShareData({
    icon,
    link: location.href,
    title,
    desc: document.title,
  });

  try {
    nativeShare.call();
  } catch (err) {
    message.success({ content: '已复制链接' });
  }
}

export function hasFree(price: number): boolean {
  if (price === 0) {
    postMessage('auth', true);
    return true;
  } else return false;
}

export function queryAccess(params?: IQueryVipExpires | any) {
  queryVipExpires(params)
    .then(res => {
      postMessage('auth', res.user_type === 'vip' || res.user_type === 'trial');
      if (res.error === 'absent')
        localforage.getItem('trial').then((value: any) => {
          if (value) delete value[params.toolId];
          if (Object.keys(value).length === 0) localforage.removeItem('trial');
          else localforage.setItem('trial', value);
        });
    })
    .catch(() => {
      postMessage('auth', false);
    });
}
