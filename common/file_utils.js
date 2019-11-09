'use strict';
const fs = require('fs');
const path = require('path');

class FileUtils {
    static rm(target) {
        if (!fs.existsSync(target)) return;
        if (fs.lstatSync(target).isDirectory()) {
            let files = fs.readdirSync(target);
            files.forEach((file) => {
                FileUtils.rm(path.resolve(target, file));
            });
            fs.rmdirSync(target);
        } else {
            fs.unlinkSync(target);
        }
    }

    static cp(src, target) {
        // 如果路径不存在
        if (!fs.existsSync(src)) return;
        // 提供文件信息
        if (fs.lstatSync(src).isDirectory()) {
            let exists = fs.existsSync(target);
            // 没有则创建
            if (!exists) fs.mkdirSync(target);
            // 获取目录
            let files = fs.readdirSync(src);
            files.forEach((file) => {
                if (file === '.gitkeep') return;
                FileUtils.cp(path.resolve(src, file), path.resolve(target, file));
            });
        } else {
            if (!!fs.copyFileSync) fs.copyFileSync(src, target);
            else {
                fs.createReadStream(src).pipe(fs.createWriteStream(target));
            }
        }
    }
}
module.exports = FileUtils;