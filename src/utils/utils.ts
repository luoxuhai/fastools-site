/**
 * setTimeout同步
 *
 * @export
 * @param {number} time
 * @returns Promise
 */
export function setTimeoutSync(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('done');
    }, time);
  });
}

export function getCountDown(time: number, success: Function) {
  success(time--);
  const interval = setInterval(() => {
    if (time >= 0) {
      success(time--);
    } else {
      clearInterval(interval);
    }
  }, 1000);

  return interval;
}

//得到随机的颜色值
export function randomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}

export function draw(show_num: any[]) {
  let canvas = window.canvas; //获取到canvas的对象，演员
  let canvas_width = canvas.width;
  let canvas_height = canvas.height;
  let context = canvas.getContext('2d'); //获取到canvas画图的环境，演员表演的舞台
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  let sCode = '1,2,3,4,5,6,7,8,9,0'; // a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,
  let aCode = sCode.split(',');
  let aLength = aCode.length; //获取到数组的长度
  for (let i = 0; i < 4; i++) {
    //这里的for循环可以控制验证码位数（如果想显示6位数，4改成6即可）
    let j = Math.floor(Math.random() * aLength); //获取到随机的索引值
    // let deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
    let deg = Math.random() - 0.5; //产生一个随机弧度
    let txt = aCode[j]; //得到随机的一个内容
    show_num[i] = txt.toLowerCase();
    let x = 10 + i * 20; //文字在canvas上的x坐标
    let y = 20 + Math.random() * 8; //文字在canvas上的y坐标
    context.font = 'bold 23px 微软雅黑';
    context.translate(x, y);
    context.rotate(deg);
    context.fillStyle = randomColor();
    context.fillText(txt, 0, 0);
    context.rotate(-deg);
    context.translate(-x, -y);
  }
  for (let i = 0; i <= 5; i++) {
    //验证码上显示线条
    context.strokeStyle = randomColor();
    context.beginPath();
    context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
    context.stroke();
  }
  for (let i = 0; i <= 30; i++) {
    //验证码上显示小点
    context.strokeStyle = randomColor();
    context.beginPath();
    let x = Math.random() * canvas_width;
    let y = Math.random() * canvas_height;
    context.moveTo(x, y);
    context.lineTo(x + 1, y + 1);
    context.stroke();
  }
}

export function monitorConsole(onOpen: Function, onClose: Function) {
  let ConsoleManager = {
    init() {
      let x = document.createElement('div');
      let isOpening = false,
        isOpened = false;
      Object.defineProperty(x, 'id', {
        get() {
          if (!isOpening) {
            onOpen();
            isOpening = true;
          }
          isOpened = true;
        },
      });
      return setInterval(function() {
        isOpened = false;
        console.info(x);
        console.clear();
        if (!isOpened && isOpening) {
          onClose();
          isOpening = false;
        }
      }, 200);
    },
  };

  return ConsoleManager;
}

export const supportCSS3 = (function() {
  const div = document.createElement('div');
  return function(prop: any) {
    if (prop in div.style) return true;
    return false;
  };
})();

// 禁止React Developer Tools
export function disableReactDevTools() {
  const noop = () => undefined;
  const DEV_TOOLS = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

  if (typeof DEV_TOOLS === 'object') {
    for (const [key, value] of Object.entries(DEV_TOOLS)) {
      DEV_TOOLS[key] = typeof value === 'function' ? noop : null;
    }
  }
}

export function exitFullscreen(element: any) {
  const exitMethod = element.exitFullscreen || element.webkitExitFullscreen || element.mozExitFullscreen || element.msExitFullscreen;
  try {
    exitMethod.call(element);
  } catch (error) {
    console.error(error);
  }
}

export function requestFullScreen(element: any) {
  const requestMethod =
    element.requestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
  try {
    requestMethod.call(element);
  } catch (error) {
    console.error(error);
  }
}

export function pushUrl() {
  // 百度
  (function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    }
    else {
        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(bp, s);
})();
}

/**
 * 下载文件
 * @param {String | Blob | File | ArrayBuffer} src 资源地址
 * @param {String} fileName 文件名
 */
export function download(file: any, fileName: string) {
  let src = null;
  if (file instanceof Blob || file instanceof File) {
    src = URL.createObjectURL(file);
  } else if (file instanceof ArrayBuffer) {
    src = URL.createObjectURL(new Blob([file]));
  } else src = file;

  const el = document.createElement('a');
  el.href = src;
  el.target = '_blank';
  el.download = fileName;
  el.style.display = 'none';
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}

export function postMessage(name: string, value: any) {
  window.frames.tool?.postMessage(
    {
      name,
      value,
    },
    '*',
  );
}

export class UnloadConfirm {
  private static onListener(e: any) {
    var confirmationMessage = 'o/';
    (e || window.event).returnValue = confirmationMessage; // Gecko and Trident
    return confirmationMessage; // Gecko and WebKit
  }

  public static set() {
    window.addEventListener('beforeunload', this.onListener);
  }

  public static remove() {
    window.removeEventListener('beforeunload', this.onListener);
  }
}
