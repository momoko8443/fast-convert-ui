function encode(hash) {
    let auth2Parameter = hash;
    console.info(auth2Parameter)
    if (!auth2Parameter) {
        console.error("auth2Parameter is null");
        return;
    }
    let tempParam = auth2Parameter.split('#')[1];
    let arr = tempParam.split('&')
    let parseResult = {}
    for (let index = 0; index < arr.length; index++) {
        let keyValue = arr[index].split('=');
        parseResult[keyValue[0]] = keyValue[1]
    }
    if (parseResult.error_code && parseResult.error_code === "4000") {
        console.error("error_code is " + parseResult.error_code);
        return;
    }
    if (!parseResult.access_token) {
        console.error("accesss_token is empty");
        return;
    }
    return parseResult.access_token;
}

export default {
    encode
}