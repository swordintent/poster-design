/*
 * @Author: ShawnPhang
 * @Date: 2023-07-13 17:01:37
 * @Description: github api
 * @LastEditors: ShawnPhang <site: book.palxp.com>
 * @LastEditTime: 2023-08-10 10:33:59
 */
import fetch from '@/utils/axios'
import Qiniu from "@/common/methods/QiNiu";

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
  return upload({ file })
}

const options= { bucket: 'platform-test-1', prePath: 'user' }
const upload = ({ file }: any) => {
  if (file) {
    console.log('req', file.type, file);
    const result: any = Qiniu.upload(file, options, (res: Type.Object) => {
      console.log('res', res);
    })
    return result;
  }
}

export default { putPic }
