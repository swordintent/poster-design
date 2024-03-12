/*
 * @Author: ShawnPhang
 * @Date: 2023-07-13 17:01:37
 * @Description: github api
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-08-10 10:33:59
 */
import fetch from '@/utils/axios'
import Qiniu from "@/common/methods/QiNiu";
import _config from "@/config";

const cutToken = 'ghp_qpV8PUxwY7as4jc'

const reader = new FileReader()
function getBase64(file: File) {
  return new Promise((resolve) => {
    reader.onload = function (event: any) {
      const fileContent = event.target.result
      resolve(fileContent.split(',')[1])
    }
    reader.readAsDataURL(file)
  })
}

async function uploadGit(file: any) {
  const repo = 'shawnphang/files'
  const d = new Date()
  const content = typeof file === 'string' ? file : await getBase64(file)
  const path = `${d.getFullYear()}/${d.getMonth()}/${d.getTime()}${file.name?.split('.').pop() || '.png'}`
  const imageUrl = 'https://api.github.com/repos/' + repo + '/contents/' + path
  const body = {branch: 'main', message: 'upload', content, path}
  const res = await fetch(imageUrl, body, 'put', {
    Authorization: `token ${cutToken}AqYfNFb6G2f2OVl4IVFOY`,
    'Content-Type': 'application/json; charset=utf-8',
  })
  return res?.content?.download_url || `https://fastly.jsdelivr.net/gh/shawnphang/files@main/${path}`
}

const putPic = async (file: any) => {
  const newVar = await upload({ file });
  return _config.IMG_URL + newVar.key;
}

const options= { bucket: 'platform-test-1', prePath: 'user' }
const upload = async ({ file }: any) => {
  if (file) {
    console.log('req', file.type, file);
    const result: any = Qiniu.upload(base64ToFile(file, uuid()), options, (res: Type.Object) => {
      console.log('res', res);
    })
    console.log('result', result)
    return result;
  }
}

const uuid = () => {
  const s:any = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  return s.join("");
}

const base64ToFile = (base64: string, fileName: string) => {
  const bstr = atob(base64);
  let n = bstr.length;
  const  u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName);
}

export default { putPic }
