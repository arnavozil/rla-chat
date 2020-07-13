const notifications = [{
    text: 'hello'
}, {
    text: 'hello again'
}, {
    text: 'again'
}, {
    text: 'once again'
}, {
    text: 'hello'
}, {
    text: 'again'
}];


const uniqifyArray = (arr) => {
    const map = {};
    for(let i = 0; i < arr.length; i++){
        if(map[arr[i].text]){
            arr[i].text = '';
        }else{
            map[arr[i].text] = 1;
        }
    }
};

uniqifyArray(notifications);
console.log(notifications);