function getBlobDataUrl(blob) {
    return new Promise(resolve => {
        var blobUrl = URL.createObjectURL(blob);
        var xhr = new XMLHttpRequest;
        xhr.responseType = 'blob';
        xhr.onload = function() {
        var recoveredBlob = xhr.response;
        var reader = new FileReader;
        reader.onload = function() {
            var blobAsDataUrl = reader.result;
            console.log('url ==== ', blobAsDataUrl)
            resolve(blobAsDataUrl)
        };
        reader.readAsDataURL(recoveredBlob);
        };
        xhr.open('GET', blobUrl);
        xhr.send();
    })

  }

export default (filename, blob) => {
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);

    // Use special ms version if available to get it working on Edge.
    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
        return;
    }
    // 兼容webview下载
    // const isPhone = (/Android|webOS|iPhone|iPod|BlackBerry|iPad/i.test(navigator.userAgent))
    // if (isPhone) {
    //     return getBlobDataUrl(blob).then(url => {
    //         downloadLink.href = url;
    //         downloadLink.download = filename;
    //         downloadLink.type = blob.type;
    //         downloadLink.click();
    //         window.URL.revokeObjectURL(url);
    //         document.body.removeChild(downloadLink);
    //     })
    // }

    const url = window.URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = filename;
    downloadLink.type = blob.type;
    downloadLink.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
};
