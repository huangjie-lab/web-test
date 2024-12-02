import React, { useRef, useState } from 'react'
import axios from 'axios';
export default function FileChunks() {
    const [uploadFile,setUploadFile] = useState(null);
    const uploadFileChunks = useRef(null);
    const onChange = (e) => {
        setUploadFile(e.target.files[0]);
    }
    const handleUpload = () => {
        if (!uploadFile) return 
        const chunkList = createChunk(uploadFile);
        const list = chunkList.map(({file},index) => {
            return {
                file,
                size: file.size,
                percent: 0,
                chunkName: `${uploadFile.name}-${index}`,
                fileName: uploadFile.name,
                index
            }
        })
        uploadFileChunks.current = list;
        uploadChunks()
    }
    const requestUpload = ({ url, method = 'post', data, headers = {}, onUploadProgress = (e) => e }) => {
        return new Promise((resolve, reject) => {
            // axios支持在请求中传入一个回调onUploadProgress，其目的就是为了知道请求的进度
            axios[method](url, data, { headers, onUploadProgress })
                .then(res => {
                    resolve(res)
                })
                .catch(err => {
                    reject(err)
                })
        })
    }
    const uploadChunks = () => {
        const formateList = uploadFileChunks.current.map(({ file, fileName, index, chunkName }) => {
            // 对象需要转成二进制数据流进行传输
            const formData = new FormData() // 创建表单格式的数据流
            // 将切片转换成了表单的数据流
            formData.append('file', file)
            formData.append('fileName', fileName)
            formData.append('chunkName', chunkName)
            return { formData, index }
        })
        const requestList = formateList.map(({ formData, index }) => {
            return requestUpload({
                url: 'http://localhost:5001/upload',
                data: formData,
                onUploadProgress: createProgress(uploadFileChunks.current[index]) // 进度条函数拿出来写
            })
        })
    }
    const createProgress = (item) => {
        return (e) => {
            // 为何函数需要return出来，因为axios的onUploadProgress就是个函数体
            // 并且这个函数体参数e就是进度
            item.percent = parseInt(String(e.loaded / e.total) * 100) // axios提供的
        }
    }
    const createChunk = (file, size = 1 * 1024) => {
        const chunkList = []
        let cur = 0  
        while (cur < file.size) {
            chunkList.push({ file: file.slice(cur, cur + size) })
            cur += size
        }
        return chunkList
    }
    return (
        <div>
            <input type='file' onChange={onChange}/>
            <button onClick={handleUpload}>上传</button>
        </div>
    )
}
