import axios from 'axios'
const TIME_OUT_MS=60*1000//默认请求超时时间
const BASE_URL=''
function handleResults(response){
    let remoteResponse=response.data
    var result={
        success:false,
        message:'',
        status:[],
        errorCode:'',
        data:{
            total:0,
            results:[]
        }
    }
    if(remoteResponse.success){
        result.data.results=remoteResponse.data
        result.data.total=remoteResponse.total
        result.success=true
    }
    if(!remoteResponse.success){
        let code=remoteResponse.errorCode
        if(code===400)
        console.log('传参错误')
        result.errorCode=remoteResponse.errorCode
        result.message=remoteResponse.message
    }
    return result
}
function handleUrl(url){
    url=BASE_URL + url
    return url
}
function handleParams(data){
    return data
}
export default{
    post(url,data,response,exception){
        axios({
            method:'post',
            url:handleUrl(url),
            data:handleParams(data),
            timeout:TIME_OUT_MS,
            headers:{
                'Content-Type':'application/json;charset=UTF-8'
            }
        }).then((result)=>{
            response(handleResults(result))
        }).catch((error)=>{
            if(exception) exception(error)
            else console.log(error)
        })
    },
    get(url,response,exception){
        axios({
            method:'get',
            url:handleUrl(url),
            timeout:TIME_OUT_MS,
            headers:{
                'Content-Type':'application/json;charset=UTF-8'
            }
        }).then((result)=>{
            response(handleResults(result))
        }).catch((error)=>{
            if(exception)exception(error)
            else console.log(error)
        })
    },
    uploadFile(url,data,response,exception){
        axios({
            method:'post',
            url:handleUrl(url),
            data:handleParams(data),
            dataType:'json',
            processData:false,
            contentType:false
        }).then((result)=>{
            response(handleResults(result,data))
        }).catch((error)=>{
            if(exception)exception(error)
            else console.log(error)
        })
    },
    downloadFile(url,data,fileName,exception){
        axios({
            method:'post',
            url:handleUrl(url),
            data:handleParams(data),
            responseType:'blob'
        }).then((result)=>{
            const excelBlob=result.data
            if('msSaveOrOpenBlob' in navigator)
             window.navigator.msSaveOrOpenBlob(excelBlob,fileName)
            else {
                const elink=document.createElement('a')
                elink.download=fileName
                elink.style.display='none'
                const blob = new Blob([excelBlob])
                elink.href=URL.createObjectURL(blob)
                document.body.appendChild(elink)
                elink.click()
                document.body.removeChild(elink)
            }
        }).catch((error)=>{
            if(exception) exception(error)
            else console.log(error)
        })
    },
    uploadFileFormData(url,data,response,exception){
        axios({
            method:'post',
            url:handleUrl,
            data:data,
            timeout:TIME_OUT_MS,
            headers:{
                'Content-Type':'multipart/form-data'
            }
        }).then((result)=>{
            response(handleResults(result))
        }).catch((error)=>{
            if(exception) exception(error)
            else console.log(error)
        })
    }
}

