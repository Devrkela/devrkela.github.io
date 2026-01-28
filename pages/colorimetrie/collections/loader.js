const url = "basic.fs";

function shaderLoader(collection,base){
    return fetch(base+collection).then(response=>response.text());
}

function fragmentLoader(collection){
    return shaderLoader(collection,"./collections/fragments/");
}

function vertexLoader(collection){
    return shaderLoader(collection,"./collections/vertices/");
}

export {fragmentLoader,vertexLoader};