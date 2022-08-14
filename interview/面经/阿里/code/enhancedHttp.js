const HttpRequests=new Map()

function sendAJAX(){
  return new Promise((resolve,reject)=>{
    let xhr=new XMLHttpRequest()
    xhr.open(...arguments)
    xhr.send()
    console.log("sendRequest");
    xhr.onreadystatechange=function(){
      if (xhr.readyState===4){
        if (xhr.status>=200 &&xhr.status<300){
          resolve(xhr.response)
        } else {
          reject(xhr.statusText)
        }
      }
    }
  })
}

async function enhancedHttp(){
  let argString=JSON.stringify(arguments)
  // 判断，已有请求
  if (HttpRequests.has(argString)) {
      console.log("已有请求，请等待结果");
    return HttpRequests.get(argString)
  }
  // 没有请求
  let result=sendAJAX(...arguments)
  HttpRequests.set(argString, result)
  return result

}