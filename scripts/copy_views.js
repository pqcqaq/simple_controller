// 将src/views下的文件复制到lib/views下

const fs = require('fs');
const path = require('path');
const ncp = require('ncp').ncp;

const src = path.resolve(__dirname, '../src/views');
const dest = path.resolve(__dirname, '../lib/views');

ncp(src, dest, function (err) {
    if (err) {
        return console.error(err);
    }
    console.log('done!');
}
);
