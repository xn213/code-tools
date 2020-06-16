const userAgent =
  'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Mobile Safari/537.36';
async function request(url, type) {
  const option = {
    url,
    method: 'get',
    headers: {
      'user-agent': userAgent,
    },
  }
  if (type) {
    option.responseType = type
  }
  return axios(option)
}

async function getDouyinVideo(shareUrl) {
  const { data: html } = await request(shareUrl)
  const itemId = html.match(/(?<=itemId:\s\")\d+(?=\")/g)[0]
  const dytk = html.match(/(?<=dytk:\s\")(.*?)(?=\")/g)[0]
  const long_url = `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${itemId}&dytk=${dytk}`
  const { data: videoJson } = await request(long_url)
  const uriId = videoJson.item_list[0].video.play_addr.uri
  const desc = videoJson.item_list[0].desc
  const noWatermarkUrl = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${uriId}&line=0&ratio=540p&media_type=4&vr_type=0&improve_bitrate=0&is_play_url=1&is_support_h265=0&source=PackSourceEnum_PUBLISH`
  const { data: videoStream } = await request(noWatermarkUrl, 'stream')
  return { videoStream, desc }
}

/**
 * @desc 函数防抖
 * @param { function } func
 * @param { number } wait 延迟执行毫秒数
 * @param { boolean } immediate  true 表立即执行，false 表非立即执行
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args)
    }
    else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait);
    }
  }
}

/**
 * @desc 函数节流 (处理按钮点击)
 * @param { function } func 函数
 * @param { number } wait 延迟执行毫秒数
 * @param { number } type 1 表时间戳版，2 表定时器版
 */
function throttle(func, wait ,type) {
  let previous, timeout;
  if(type===1){
    previous = 0;
  }else if(type===2){
    timeout = null;
  }
  return function() {
    let context = this;
    let args = arguments;
    if(type===1){
      let now = Date.now();

      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    }else if(type===2){
      if (!timeout) {
        timeout = setTimeout(() => {
          timeout = null;
          func.apply(context, args)
        }, wait)
      }
    }
  }
}

/************* TODO '获取抖音视频 跨域 node 不跨域?' by chengxiang **************/
async function getVideo() {
  const shareUrl = document.querySelector('.share-url-input').value
  if(!shareUrl) {
    console.log('请输入链接: ', shareUrl)
  }
  console.log(shareUrl)
  const targetUrl = shareUrl.split(' ').slice(-2, -1)
  const { videoStream, desc } = await getDouyinVideo(targetUrl)
  videoStream.pipe(fs.createWriteStream(`${desc}(无水印).mp4`)) //下载到本地
}

let tGetVideo = throttle(getVideo, 1500, 1)
