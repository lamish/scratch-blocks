/**
 * 每次prepublish后都要手动copy资源文件到gui
 * 这样的行为不够自动化
 * 说明一下: 
 * 此脚本需要该项目处于同一目录
 * parent  
 *  -   scratch-blocks  
 *  -   scratch-vm 
 *  -   bell-scratch3.0 (如复制不成功，请查看此目录下是否还有一层)
 * 单个文件复制需要指定具体位置和名称，如：
 * src ./blockly_compressed_horizontal.js   targer ./windowsIssueFix/blockly_compressed_horizontal.js
 * 不可 src ./blockly_compressed_horizontal.js    targer ./windowsIssueFix/
*/
'use strict';

const path = require('path');
const os = require('os');
const FileUtils = require('./file_utils.js');
// copy images source
if(os.platform() == 'darwin'){
    FileUtils.cp(
        path.join('./media/bell'),
        path.join('./../bell-scratch3.0/www/media')
    );
}else{
    FileUtils.cp(
        path.join('./media/bell'),
        path.join('./../bell-scratch-gui/www/media')
    );
}
/**
 * 因为某些原因prepublish在window无法完成带包？？？
 * 这里对Mac系统做了一个copy处理，每次prepublish后把打包的文件替换到windowsIssueFix
 * 方便window系统同学
 */
if(os.platform() == 'darwin'){
    // rm blockly_compressed_horizontal.js or blockly_compressed_vertical.js
    FileUtils.rm(
        path.join('./windowsIssueFix/blockly_compressed_horizontal.js'),
    );
    FileUtils.rm(
        path.join('./windowsIssueFix/blockly_compressed_vertical.js'),
    );
    // copy blockly_compressed_horizontal.js or blockly_compressed_vertical.js
    FileUtils.cp(
        path.join('./blockly_compressed_horizontal.js'),
        path.join('./windowsIssueFix/blockly_compressed_horizontal.js')
    );
    FileUtils.cp(
        path.join('./blockly_compressed_vertical.js'),
        path.join('./windowsIssueFix/blockly_compressed_vertical.js')
    );
}

console.log('FileUtils success!');