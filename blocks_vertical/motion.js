/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('Blockly.Blocks.motion');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');



window.BellMsg = window.BellMsg || {};

if(/Android|iPhone|iPad/i.test(navigator.userAgent)) {
  BellMsg.MOTION_POINTTOWARDS_POINTER = "触摸位置";
  BellMsg.MOTION_GOTO_POINTER = "触摸位置";
  BellMsg.MOTION_GLIDETO_POINTER = "触摸位置";
} else {
  BellMsg.MOTION_POINTTOWARDS_POINTER = "鼠标指针";
  BellMsg.MOTION_GOTO_POINTER = "鼠标指针";
  BellMsg.MOTION_GLIDETO_POINTER = "鼠标指针";
}

BellMsg.MOTION_POINTTOWARDS_RANDOM = "随机位置";
BellMsg.MOTION_GOTO_RANDOM = "随机位置";
BellMsg.MOTION_GLIDETO_RANDOM = "随机位置";


// 多行可变语句块MIXIN
/* Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK = {
  mixinMultiLinesData: [],
  // 弹窗显示时，需要获取mixin data中ball list
  // fix issue: 如果field内值被认为修改，需要在此处去获取最新数据
  mixinMultiLinesDataModuleList: function() {
    var data = [];
    for (var i = 0; i < this.mixinMultiLinesData.length; i++) {
      data.push(this.mixinMultiLinesData[i].seq);
    }
    return data;
  },
  onchange: function(e) {
    // console.log(`onchange`, e);
    for (var i = 0, data; data = this.mixinMultiLinesData[i]; i++) {
      data.rotate_direction = this.getFieldValue('rotate_direction' + (i + 1));
      data.power = this.getFieldValue('power' + (i + 1));
      data.seconds = this.getFieldValue('rotate_for_seconds' + (i + 1));
    }

    if(e.element === 'field') {
      // mutation被vm缓存，触发更新vm才能取到最新值
      var newMutationDom = this.mutationToDom();
      var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
      Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, null, newMutation));
    }

    if(e instanceof Blockly.Events.Create) {
      // 新拉出来的块， 要清除mutation 解决mutation保留导致的问题
      // this.mixinMultiLinesData.length = 0;
      // var newMutationDom = this.mutationToDom();
      // var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
      // Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, new Date().getTime() + "", null));
      // console.log(`onchange create`)
      this.mutationToDom();
    }

    // if(e instanceof Blockly.Events.Ui && e.newValue && e.newValue.indexOf('motion_motorBall') > -1) {
      // // console.log(`!!!!!!!!!!!!!!!!!!!`)
      // Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, new Date().getTime() + "", null));
    // } 
  
  },
  mutationToDom: function(isCreate) {
    if (isCreate || !this.mixinMultiLinesData || !this.mixinMultiLinesData.length  || !this.mixinMultiLinesData[0].rotate_direction || !this.shouldCreateMultiRow) {
      // 解决mutation保留导致的问题
      // console.log(`isCreate: ${isCreate}`)
      this.mixinMultiLinesData = [];
      Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, new Date().getTime() + "", null));
      return null;
    }
    // console.log(`this.mixinMultiLinesData`, JSON.parse(JSON.stringify(this.mixinMultiLinesData)))
    // return null; // FIXME: mutation保留导致一系列问题，能否解决?

    var container = document.createElement('mutation');
    for (var i = 0, data; data = this.mixinMultiLinesData[i]; i++) {
      var item = document.createElement('item');
      // 驱动球球号1-15
      item.setAttribute('seq', data.seq);
      // 顺时针 or 逆时针
      item.setAttribute('rotate_direction', data.rotate_direction);
      // 功率
      item.setAttribute('power', data.power);
      // 持续时间(s)
      item.setAttribute('rotate_for_seconds', data.rotate_for_seconds);
      container.appendChild(item);
    }
    // console.log(`mutationToDom`, container)
    return container;
  },
  domToMutation: function(element) {
    // console.log(`domToMutation`, element)
    if (!this.shouldCreateMultiRow) return;
    this.mixinMultiLinesData.length = 0;
    // 首行数据
    var firstLineData = {
      seq: this.getFieldValue('mabot_motor_ball_index'),
      rotate_direction: this.getFieldValue('rotate_direction'),
      power: this.getFieldValue('power'),
      rotate_for_seconds: this.getFieldValue('rotate_for_seconds'),
      // block: this.getFieldValue('BLOCK'),
    };
    this.mixinMultiLinesData.push(firstLineData);

    for (var i = 0, child; child = element.childNodes[i]; i++) {
      var item = {};

      // 驱动球球号
      item.seq = child.getAttribute('seq');
      // 顺时针 or 逆时针
      item.rotate_direction = child.getAttribute('rotate_direction');
      // 功率
      item.power = child.getAttribute('power');
      // 持续时间(s)
      item.rotate_for_seconds = child.getAttribute('rotate_for_seconds');

      this.mixinMultiLinesData.push(item);
    }
    // re-render the block
    this.updateShape_(true);
  },
  updateShape_: function(isDomToMutation) {
    // console.log(`updateShape_`, JSON.parse(JSON.stringify(this.mixinMultiLinesData)))
    var data = this.mixinMultiLinesData;
    // 首行单独更新field值
    this.getField('mabot_motor_ball_index').setValue(data[0].seq);
    this.getField('rotate_direction').setValue(data[0].rotate_direction);
    this.getField('power').setValue(data[0].power);
    this.getField('rotate_for_seconds').setValue(data[0].rotate_for_seconds);
    // this.getField('BLOCK').setValue(data[0].block);
    // 其他行直接先干掉
    for (var i = this.inputList.length - 1, input; input = this.inputList[i]; i--) {
      if (input.type === Blockly.DUMMY_INPUT && input.fieldRow.length > 0 && i > 0) {
        if (input.connection && input.connection.isConnected()) {
          input.connection.setShadowDom(null);
          var block = input.connection.targetBlock();
          if (block.isShadow()) {
            // Destroy any attached shadow block.
            block.dispose();
          } else {
            // Disconnect any attached normal block.
            block.unplug();
          }
        }
        input.dispose();
        this.inputList.splice(i, 1);
      }
    }
   
    data.forEach(item => {
      for(const key in item) {
        if(key === 'rotate_direction') {
          if(item[key] == 1) {
            item[key] = '_clockwise_';
          }else if(item[key] == 0){
            item[key] = '_counterclockwise_';
          }
        }else{
          item[key] = item[key] + ""; // 转成字符串
        }
      }
    })
 
    // console.log(`aaaa`, JSON.parse(JSON.stringify(data)))
   
    // 添加行
    for (var i = 1, item; item = data[i]; i++) {
      var seqField = new Blockly.FieldModuleDialog(item.seq, Blockly.FieldModuleDialog.MODULE_MOTOR, true);
      // var clockwiseField = new Blockly.FieldClockwiseDialog(item.rotate_direction);
      var clockwiseField = new Blockly.FieldDropdown(
        [
          ["顺时针", '_clockwise_'],
          ["逆时针", '_counterclockwise_']
        ], 
        undefined, 
        item.rotate_direction
      ); // 默认0 顺时针
      
      var powerField = new Blockly.FieldBellSpeedDialog(item.power, 0, 180); //new Blockly.FieldNumberDialog(item.power);//
      var secondsField = new Blockly.FieldNumberDialog(item.rotate_for_seconds); //new Blockly.Input(Blockly.INPUT_VALUE, '')
      this.appendDummyInput()
        .appendField('驱动球')
        .appendField(seqField,'mabot_motor_ball_index' + i)
        .appendField('，')
        .appendField(clockwiseField, 'rotate_direction' + i)
        .appendField('旋转，功率')
        .appendField(powerField, 'power' + i)
        .appendField('，持续')
        .appendField(secondsField, 'rotate_for_seconds' + i)
        .appendField('秒');
    }
    // fix issue: 需要把compose传过来的第一个data删除
    this.mixinMultiLinesData.splice(0, 1);
    // fix issue: 需要强制渲染一次block，防止出现空行
    this.render();

    // var newMutationDom = this.mutationToDom();
    // // console.log(`newMutationDom`, newMutationDom)
    // if(!newMutationDom) {
    //   newMutationDom = document.createElement('mutation');
    // }
    // var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
    // // console.log(`newMutation`, newMutation, new Blockly.Events.BlockChange(this, 'mutation', null, null, newMutation))
    // Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, null, newMutation));
  },
  compose: function(newData) {
    // console.log(`compose`, newData)
    if (!this.shouldCreateMultiRow) return;
    // 首行数据
    var firstLineData = {
      seq: this.getFieldValue('mabot_motor_ball_index'),
      rotate_direction: this.getFieldValue('rotate_direction'),
      power: this.getFieldValue('power'),
      rotate_for_seconds: this.getFieldValue('rotate_for_seconds'),
    };
    // 其余数据
    var otherLineData = this.mixinMultiLinesData;
    // 拼接起来
    var oldData = [];
    oldData.push({
      seq: firstLineData.seq,
      rotate_direction: firstLineData.rotate_direction,
      power: firstLineData.power,
      rotate_for_seconds: firstLineData.rotate_for_seconds,
    });
    for (var i = 0, otherLine; otherLine = otherLineData[i]; i++) {
      oldData.push({
        seq: otherLine.seq,
        rotate_direction: otherLine.rotate_direction,
        power: otherLine.power,
        rotate_for_seconds: otherLine.rotate_for_seconds,
      });
    }
    function findInOldDataBySeq(seq, oldData) {
      for (var i = 0, oldLine; oldLine = oldData[i]; i++) {
        if (oldLine.seq == seq) {
          return oldLine;
        }
      }
      return null;
    }
    // 更新数据集
    var mergeData = [];
    for (var i = 0, newLine; newLine = newData[i]; i++) {
      var find = findInOldDataBySeq(newLine, oldData);
      if (!!find) {
        mergeData.push({
          seq: newLine,
          rotate_direction: find.rotate_direction,
          power: find.power,
          rotate_for_seconds: find.rotate_for_seconds,
        });
      } else {
        // 没有，给默认值
        mergeData.push({
          seq: newLine,
          rotate_direction: '1',
          power: 30,
          rotate_for_seconds: 3,
        });
      }
    }
    this.mixinMultiLinesData = mergeData;
 
    this.updateShape_();
  },
  decompose: function() {
    if (!this.shouldCreateMultiRow) return;
    var data = this.mixinMultiLinesDataModuleList();
    // console.log(`decompose`, data);
    data.unshift(this.getFieldValue('mabot_motor_ball_index'));

    return data;
  },

}; */



/* ***************多行可变语句块MIXIN*********************************************** */

function MinxinObj(ballindex, defaultObj) {
  this.ballindex = ballindex;
  this.defaultObj = defaultObj;
  this.options = Object.keys(defaultObj);
  this.mixinMultiLinesData = [];
}

MinxinObj.prototype = {
  mixinMultiLinesDataModuleList() {
    var data = [];
    for (var i = 0; i < this.mixinMultiLinesData.length; i++) {
      data.push(this.mixinMultiLinesData[i].seq);
    }
    return data;
  },

  onchange(e) {

    for (var i = 0, data; data = this.mixinMultiLinesData[i]; i++) {
      this.options.forEach(key => {
        data[key] = this.getFieldValue(key + (i + 1))
      })
    }

    if(e.element === 'field') {
      // mutation被vm缓存，触发更新vm才能取到最新值
      var newMutationDom = this.mutationToDom();
      var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
      Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, null, newMutation));
    }

    if(e instanceof Blockly.Events.Create) {
      // 新拉出来的块， 要清除mutation 解决mutation保留导致的问题
      this.mutationToDom();
    }
  
  },

  mutationToDom (isCreate) {
    if (isCreate || !this.mixinMultiLinesData || !this.mixinMultiLinesData.length  || !this.mixinMultiLinesData[0][this.options[0]] || !this.shouldCreateMultiRow) {
      // 解决mutation保留导致的问题
      this.mixinMultiLinesData = [];
      Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'mutation', null, new Date().getTime() + "", null));
      return null;
    }
    // return null; // FIXME: mutation保留导致一系列问题，能否解决?

    var container = document.createElement('mutation');
    for (var i = 0, data; data = this.mixinMultiLinesData[i]; i++) {
      var item = document.createElement('item');
      // 驱动球球号1-15
      item.setAttribute('seq', data.seq);
      // 顺时针 or 逆时针
     this.options.forEach(key => {
       item.setAttribute(key, data[key]);
     })
     
      container.appendChild(item);
    }
    return container;
  },

  domToMutation (element) {
    if (!this.shouldCreateMultiRow) return;
    this.mixinMultiLinesData.length = 0;
    // 首行数据
    var firstLineData = {
      seq: this.getFieldValue(this.ballindex),
    };
    this.options.forEach(key => {
      firstLineData[key] = this.getFieldValue(key);
    })

    this.mixinMultiLinesData.push(firstLineData);

    for (var i = 0, child; child = element.childNodes[i]; i++) {
      var item = {};

      // 驱动球球号
      item.seq = child.getAttribute('seq');
      // 顺时针 or 逆时针
      this.options.forEach(key => {
        item[key] = child.getAttribute(key);
      });

      this.mixinMultiLinesData.push(item);
    }
    // re-render the block
    this.updateShape_(true);
  },

  updateShape_ () {
    var data = this.mixinMultiLinesData;
    // 首行单独更新field值
    this.getField(this.ballindex).setValue(data[0].seq);

    this.options.forEach(key => {
      this.getField(key).setValue(data[0][key]);
    })

    // this.getField('BLOCK').setValue(data[0].block);
    // 其他行直接先干掉
    for (var i = this.inputList.length - 1, input; input = this.inputList[i]; i--) {
      if (input.type === Blockly.DUMMY_INPUT && input.fieldRow.length > 0 && i > 0) {
        if (input.connection && input.connection.isConnected()) {
          input.connection.setShadowDom(null);
          var block = input.connection.targetBlock();
          if (block.isShadow()) {
            // Destroy any attached shadow block.
            block.dispose();
          } else {
            // Disconnect any attached normal block.
            block.unplug();
          }
        }
        input.dispose();
        this.inputList.splice(i, 1);
      }
    }
   
    data.forEach(item => {
      for(const key in item) {
        if(key === 'rotate_direction') {
          if(item[key] == 1) {
            item[key] = '_clockwise_';
          }else if(item[key] == 0){
            item[key] = '_counterclockwise_';
          }
        }else{
          item[key] = item[key] + ""; // 转成字符串
        }
      }
    })
 
    this.doAppendField(data);
    
    // fix issue: 需要把compose传过来的第一个data删除
    this.mixinMultiLinesData.splice(0, 1);
    // fix issue: 需要强制渲染一次block，防止出现空行
    this.render();
  },

  // 重写该方法
  doAppendField(data) {
    // 添加行
    for (var i = 1, item; item = data[i]; i++) {
      var seqField = new Blockly.FieldModuleDialog(item.seq, Blockly.FieldModuleDialog.MODULE_MOTOR, true);
      // var clockwiseField = new Blockly.FieldClockwiseDialog(item.rotate_direction);
      var clockwiseField = new Blockly.FieldDropdown(
        [
          ["顺时针", '_clockwise_'],
          ["逆时针", '_counterclockwise_']
        ], 
        undefined, 
        item.rotate_direction
      ); // 默认0 顺时针
      
      var powerField = new Blockly.FieldBellSpeedDialog(item.power, 0, 180); //new Blockly.FieldNumberDialog(item.power);//
    
      this.appendDummyInput()
        .appendField('驱动球')
        .appendField(seqField,'mabot_motor_ball_index' + i)
        .appendField('，')
        .appendField(clockwiseField, 'rotate_direction' + i)
        .appendField('旋转，功率')
        .appendField(powerField, 'power' + i);
    }
  },

  compose (newData) {
    if (!this.shouldCreateMultiRow) return;
    // 首行数据
    var firstLineData = {
      seq: this.getFieldValue(this.ballindex),
    };
    this.options.forEach(key => {
      firstLineData[key] = this.getFieldValue(key);
    })


    // 其余数据
    var otherLineData = this.mixinMultiLinesData;
    // 拼接起来
    var oldData = [];
    oldData.push(firstLineData);

    for (var i = 0, otherLine; otherLine = otherLineData[i]; i++) {
      oldData.push(otherLine);
    }
    function findInOldDataBySeq(seq, oldData) {
      for (var i = 0, oldLine; oldLine = oldData[i]; i++) {
        if (oldLine.seq == seq) {
          return oldLine;
        }
      }
      return null;
    }
    // 更新数据集
    var mergeData = [];
    for (var i = 0, newLine; newLine = newData[i]; i++) {
      var find = findInOldDataBySeq(newLine, oldData);
      if (!!find) {
        const temp = Object.assign({}, find);
        temp['seq'] = newLine;
        mergeData.push(temp);
      } else {
        // 没有，给默认值
        const temp = {seq: newLine};
        this.options.forEach(key => {
          temp[key] = this.defaultObj[key];
        })
        mergeData.push(temp);
      }
    }
    this.mixinMultiLinesData = mergeData;
 
    this.updateShape_();
  },

  decompose () {
    if (!this.shouldCreateMultiRow) return;
    var data = this.mixinMultiLinesDataModuleList();
    data.unshift(this.getFieldValue(this.ballindex));
    return data;
  }
}

/* *********************驱动球-功率-时间***************************************** */
function motorPowerForSecMutator(ballindex, defaultObj) {
  MinxinObj.call(this, ballindex, defaultObj);
}
motorPowerForSecMutator.prototype = Object.create(MinxinObj.prototype);
motorPowerForSecMutator.prototype.doAppendField = function(data) {
  for (var i = 1, item; item = data[i]; i++) {
    var seqField = new Blockly.FieldModuleDialog(item.seq, Blockly.FieldModuleDialog.MODULE_MOTOR, true);
    // var clockwiseField = new Blockly.FieldClockwiseDialog(item.rotate_direction);
    var clockwiseField = new Blockly.FieldDropdown(
      [
        ["顺时针", '_clockwise_'],
        ["逆时针", '_counterclockwise_']
      ], 
      undefined, 
      item.rotate_direction
    ); // 默认0 顺时针
    
    var powerField = new Blockly.FieldBellSpeedDialog(item.power, 0, 100); //new Blockly.FieldNumberDialog(item.power);//
    var secondsField = new Blockly.FieldNumberDialog(item.rotate_for_seconds); //new Blockly.Input(Blockly.INPUT_VALUE, '')
    this.appendDummyInput()
      .appendField('驱动球')
      .appendField(seqField,'mabot_motor_ball_index' + i)
      .appendField('，')
      .appendField(clockwiseField, 'rotate_direction' + i)
      .appendField('旋转，功率')
      .appendField(powerField, 'power' + i)
      .appendField('，持续')
      .appendField(secondsField, 'rotate_for_seconds' + i)
      .appendField('秒');
  }
}

Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK = new motorPowerForSecMutator('mabot_motor_ball_index', {
  rotate_direction: '_clockwise_',
  power: 30,
  rotate_for_seconds: 1
})


/* *********************驱动球-功率***************************************** */
function motorPowerMutator(ballindex, defaultObj) {
  MinxinObj.call(this, ballindex, defaultObj);
}
motorPowerMutator.prototype = Object.create(MinxinObj.prototype);
motorPowerMutator.prototype.doAppendField = function(data) {
  for (var i = 1, item; item = data[i]; i++) {
    var seqField = new Blockly.FieldModuleDialog(item.seq, Blockly.FieldModuleDialog.MODULE_MOTOR, true);
    // var clockwiseField = new Blockly.FieldClockwiseDialog(item.rotate_direction);
    var clockwiseField = new Blockly.FieldDropdown(
      [
        ["顺时针", '_clockwise_'],
        ["逆时针", '_counterclockwise_']
      ], 
      undefined, 
      item.rotate_direction
    ); // 默认0 顺时针
    
    var powerField = new Blockly.FieldBellSpeedDialog(item.power, 0, 100); //new Blockly.FieldNumberDialog(item.power);//
  
    this.appendDummyInput()
      .appendField('驱动球')
      .appendField(seqField,'mabot_motor_ball_index' + i)
      .appendField('，')
      .appendField(clockwiseField, 'rotate_direction' + i)
      .appendField('旋转，功率')
      .appendField(powerField, 'power' + i);
  }
}

Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK_2 = new motorPowerMutator('mabot_motor_ball_index',{
  rotate_direction: '_clockwise_', 
  power: 30
});


/* *****************驱动球-速度-时间********************************************* */
function motorSpeedForSecMutator(ballindex, defaultObj) {
  MinxinObj.call(this, ballindex, defaultObj);
}
motorSpeedForSecMutator.prototype = Object.create(MinxinObj.prototype);
motorSpeedForSecMutator.prototype.doAppendField = function(data) {
  for (var i = 1, item; item = data[i]; i++) {
    var seqField = new Blockly.FieldModuleDialog(item.seq, Blockly.FieldModuleDialog.MODULE_MOTOR, true);
    // var clockwiseField = new Blockly.FieldClockwiseDialog(item.rotate_direction);
    var clockwiseField = new Blockly.FieldDropdown(
      [
        ["顺时针", '_clockwise_'],
        ["逆时针", '_counterclockwise_']
      ], 
      undefined, 
      item.rotate_direction
    ); // 默认0 顺时针
    
    var speedField = new Blockly.FieldBellSpeedDialog(item.speed, 0, 100); //new Blockly.FieldNumberDialog(item.power);//
    var secondsField = new Blockly.FieldNumberDialog(item.rotate_for_seconds); //new Blockly.Input(Blockly.INPUT_VALUE, '')
    this.appendDummyInput()
      .appendField('驱动球')
      .appendField(seqField,'mabot_motor_ball_index' + i)
      .appendField('，')
      .appendField(clockwiseField, 'rotate_direction' + i)
      .appendField('旋转，速度')
      .appendField(speedField, 'speed' + i)
      .appendField('转/分，持续')
      .appendField(secondsField, 'rotate_for_seconds' + i)
      .appendField('秒');
  }
}
Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK_3 = new motorSpeedForSecMutator('mabot_motor_ball_index',{rotate_direction: '_clockwise_', speed: 30, rotate_for_seconds: 1});

/* *****************驱动球-速度********************************************* */

function motorSpeedMutator(ballindex, defaultObj) {
  MinxinObj.call(this, ballindex, defaultObj);
}

motorSpeedMutator.prototype = Object.create(MinxinObj.prototype);
motorSpeedMutator.prototype.doAppendField = function(data) {
  for (var i = 1, item; item = data[i]; i++) {
    var seqField = new Blockly.FieldModuleDialog(item.seq, Blockly.FieldModuleDialog.MODULE_MOTOR, true);
    // var clockwiseField = new Blockly.FieldClockwiseDialog(item.rotate_direction);
    var clockwiseField = new Blockly.FieldDropdown(
      [
        ["顺时针", '_clockwise_'],
        ["逆时针", '_counterclockwise_']
      ], 
      undefined, 
      item.rotate_direction
    ); // 默认0 顺时针
    
    var speedField = new Blockly.FieldBellSpeedDialog(item.speed, 0, 100); //new Blockly.FieldNumberDialog(item.power);//

    this.appendDummyInput()
      .appendField('驱动球')
      .appendField(seqField,'mabot_motor_ball_index' + i)
      .appendField('，')
      .appendField(clockwiseField, 'rotate_direction' + i)
      .appendField('旋转，速度')
      .appendField(speedField, 'speed' + i)
      .appendField('转/分');
  }
}

Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK_4 = new motorSpeedMutator('mabot_motor_ball_index',{rotate_direction: '_clockwise_', speed: 30});

/* **************************** 设置旋转关节球角度 ********************************** */

function horizontalJointSetAngle(ballindex, defaultObj) {
  MinxinObj.call(this, ballindex, defaultObj);
}

horizontalJointSetAngle.prototype = Object.create(MinxinObj.prototype);
horizontalJointSetAngle.prototype.doAppendField = function(data) {
  // 添加行
  for (var i = 1, item; item = data[i]; i++) {
    var seqField = new Blockly.FieldModuleDialog(item.seq, Blockly.FieldModuleDialog.MODULE_WAIST_JOINT, true);
    
    var angleField = new Blockly.FieldBellSpeedDialog(item.mabot_horizontalJoint_angle, -75, 75); //new Blockly.FieldNumberDialog(item.power);//
  
    this.appendDummyInput()
      .appendField('旋转关节球')
      .appendField(seqField,'mabot_horizontalJoint_index' + i)
      .appendField('摆到')
      .appendField(angleField, 'mabot_horizontalJoint_angle' + i)
      .appendField('°');
  }
}

Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK_5 = new horizontalJointSetAngle('mabot_horizontalJoint_index',{mabot_horizontalJoint_angle: 0});

/* **************************** 设置摇摆关节球角度 ********************************** */

function swingJointSetAngle(ballindex, defaultObj) {
  MinxinObj.call(this, ballindex, defaultObj);
}
swingJointSetAngle.prototype = Object.create(MinxinObj.prototype);
swingJointSetAngle.prototype.doAppendField = function(data) {
  // 添加行
  for (var i = 1, item; item = data[i]; i++) {
    var seqField = new Blockly.FieldModuleDialog(item.seq, Blockly.FieldModuleDialog.MODULE_WAIST_JOINT, true);
    
    var angleField = new Blockly.FieldBellSpeedDialog(item.mabot_swingJoint_angle, -75, 75); //new Blockly.FieldNumberDialog(item.power);//
  
    this.appendDummyInput()
      .appendField('摇摆关节球')
      .appendField(seqField,'mabot_swingJoint_index' + i)
      .appendField('摆到')
      .appendField(angleField, 'mabot_swingJoint_angle' + i)
      .appendField('°');
  }
}
Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK_6 = new swingJointSetAngle('mabot_swingJoint_index',{mabot_swingJoint_angle: 0});

/* ************************************************************** */



Blockly.Blocks['motion_movesteps'] = {
  /**
   * Block to move steps.
   * @this Blockly.Block
   */
  shouldCreateMultiRow: true,
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_MOVESTEPS,
      "args0": [
        {
          "type": "input_value",
          "name": "STEPS"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};



Blockly.Blocks['motion_turnright'] = {
  /**
   * Block to turn right.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_TURNRIGHT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "rotate-right.svg",
          "width": 24,
          "height": 24
        },
        {
          "type": "input_value",
          "name": "DEGREES",
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_turnleft'] = {
  /**
   * Block to turn left.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_TURNLEFT,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "rotate-left.svg",
          "width": 24,
          "height": 24
        },
        {
          "type": "input_value",
          "name": "DEGREES"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_pointindirection'] = {
  /**
   * Block to point in direction.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_POINTINDIRECTION,
      "args0": [
        {
          // "type": "input_value",
          // "name": "DIRECTION"
          "type": "field_speedBellDialog",
          "name": "DIRECTION",
          "value": "0",
          "min": "-75",
          "max": "75"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_pointtowards_menu'] = {
  /**
   * Point towards drop-down menu.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TOWARDS",
          "options": [
            [BellMsg.MOTION_POINTTOWARDS_POINTER, '_mouse_'],
            [BellMsg.MOTION_POINTTOWARDS_RANDOM, '_random_']
          ]
        }
      ],
      "colour": Blockly.Colours.motion.secondary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary,
      "extensions": ["output_string"]
    });
  }
};

Blockly.Blocks['motion_pointtowards'] = {
  /**
   * Block to point in direction.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_POINTTOWARDS,
      "args0": [
        {
          "type": "input_value",
          "name": "TOWARDS"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_goto_menu'] = {
  /**
   * Go to drop-down menu.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TO",
          "options": [
            [BellMsg.MOTION_GOTO_POINTER, '_mouse_'],
            [BellMsg.MOTION_GOTO_RANDOM, '_random_']
          ]
        }
      ],
      "colour": Blockly.Colours.motion.secondary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary,
      "extensions": ["output_string"]
    });
  }
};

Blockly.Blocks['motion_gotoxy'] = {
  /**
   * Block to go to X, Y.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GOTOXY,
      "args0": [
        {
          "type": "input_value",
          "name": "X"
        },
        {
          "type": "input_value",
          "name": "Y"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_goto'] = {
  /**
   * Block to go to a menu item.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GOTO,
      "args0": [
        {
          "type": "input_value",
          "name": "TO"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_glidesecstoxy'] = {
  /**
   * Block to glide for a specified time.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GLIDESECSTOXY,
      "args0": [
        {
          "type": "input_value",
          "name": "SECS"
        },
        {
          "type": "input_value",
          "name": "X"
        },
        {
          "type": "input_value",
          "name": "Y"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_glideto_menu'] = {
  /**
   * Glide to drop-down menu
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TO",
          "options": [
            [BellMsg.MOTION_GLIDETO_POINTER, '_mouse_'],
            [BellMsg.MOTION_GLIDETO_RANDOM, '_random_']
          ]
        }
      ],
      "colour": Blockly.Colours.motion.secondary,
      "colourSecondary": Blockly.Colours.motion.secondary,
      "colourTertiary": Blockly.Colours.motion.tertiary,
      "extensions": ["output_string"]
    });
  }
};

Blockly.Blocks['motion_glideto'] = {
  /**
   * Block to glide to a menu item
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_GLIDETO,
      "args0": [
        {
          "type": "input_value",
          "name": "SECS"
        },
        {
          "type": "input_value",
          "name": "TO"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_changexby'] = {
  /**
   * Block to change X.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_CHANGEXBY,
      "args0": [
        {
          "type": "input_value",
          "name": "DX"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_setx'] = {
  /**
   * Block to set X.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETX,
      "args0": [
        {
          "type": "input_value",
          "name": "X"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_changeyby'] = {
  /**
   * Block to change Y.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_CHANGEYBY,
      "args0": [
        {
          "type": "input_value",
          "name": "DY"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_sety'] = {
  /**
   * Block to set Y.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETY,
      "args0": [
        {
          "type": "input_value",
          "name": "Y"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_ifonedgebounce'] = {
  /**
   * Block to bounce on edge.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_IFONEDGEBOUNCE,
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_setrotationstyle'] = {
  /**
   * Block to set rotation style.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SETROTATIONSTYLE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "STYLE",
          "options": [
            [Blockly.Msg.MOTION_SETROTATIONSTYLE_LEFTRIGHT, 'left-right'],
            [Blockly.Msg.MOTION_SETROTATIONSTYLE_DONTROTATE, 'don\'t rotate'],
            [Blockly.Msg.MOTION_SETROTATIONSTYLE_ALLAROUND, 'all around']
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_xposition'] = {
  /**
   * Block to report X.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_XPOSITION,
      "category": Blockly.Categories.motion,
      "checkboxInFlyout": true,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};

Blockly.Blocks['motion_yposition'] = {
  /**
   * Block to report Y.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_YPOSITION,
      "category": Blockly.Categories.motion,
      "checkboxInFlyout": true,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};

Blockly.Blocks['motion_direction'] = {
  /**
   * Block to report direction.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_DIRECTION,
      "category": Blockly.Categories.motion,
      "checkboxInFlyout": true,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};

Blockly.Blocks['motion_scroll_right'] = {
  /**
   * Block to scroll the stage right. Does not actually do anything. This is
   * an obsolete block that is implemented for compatibility with Scratch 2.0
   * projects.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SCROLLRIGHT,
      "args0": [
        {
          "type": "input_value",
          "name": "DISTANCE"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_scroll_up'] = {
  /**
   * Block to scroll the stage up. Does not actually do anything. This is an
   * obsolete block that is implemented for compatibility with Scratch 2.0
   * projects.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_SCROLLUP,
      "args0": [
        {
          "type": "input_value",
          "name": "DISTANCE"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_align_scene'] = {
  /**
   * Block to change the stage's scrolling alignment. Does not actually do
   * anything. This is an obsolete block that is implemented for compatibility
   * with Scratch 2.0 projects.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_ALIGNSCENE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "ALIGNMENT",
          "options": [
            [Blockly.Msg.MOTION_ALIGNSCENE_BOTTOMLEFT, 'bottom-left'],
            [Blockly.Msg.MOTION_ALIGNSCENE_BOTTOMRIGHT, 'bottom-right'],
            [Blockly.Msg.MOTION_ALIGNSCENE_MIDDLE, 'middle'],
            [Blockly.Msg.MOTION_ALIGNSCENE_TOPLEFT, 'top-left'],
            [Blockly.Msg.MOTION_ALIGNSCENE_TOPRIGHT, 'top-right']
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_xscroll'] = {
  /**
   * Block to report the stage's scroll position's X value. Does not actually
   * do anything. This is an obsolete block that is implemented for
   * compatibility with Scratch 2.0 projects.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_XSCROLL,
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};

Blockly.Blocks['motion_yscroll'] = {
  /**
   * Block to report the stage's scroll position's Y value. Does not actually
   * do anything. This is an obsolete block that is implemented for
   * compatibility with Scratch 2.0 projects.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_YSCROLL,
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};



Blockly.Blocks['motion_motorBall_rotate_on_power_for_seconds'] = {
  shouldCreateMultiRow: true,
  init: function () {

    this.jsonInit({
      "message0": '驱动球 %1，%2 旋转，功率 %3，持续 %4 秒， %5%6%7',
      "args0": [
        // {
        //   "type": "input_value",
        //   "name": "mabot_motor_ball_index",
        // },
        {
          "type": "field_dialog",
          "name": "mabot_motor_ball_index",
          "defaultValue": "1",
          "module": "motor",
          "multiMode": true,
        },
        {
          "type": "field_dropdown",
          "name": "rotate_direction",
          "options": [
            // ["clockwise", '_clockwise_'],
            // ["counterclockwise", '_counterclockwise_']
            ["顺时针", '_clockwise_'],
            ["逆时针", '_counterclockwise_']
          ]
        },
        {
          "type": "field_speedBellDialog",
          "name": "power",
          "value": "30",
          "min": "0",
          "max": "100"
        },
        {
          // "type": "input_value",
          // "name": "rotate_for_seconds",
          "type": "field_numberDialog",
          "name": "rotate_for_seconds",
          "defaultValue": "1",
          "check": ['Number', 'Boolean', 'String', 'Array']
        },
        {
          "type": "field_label",
          "text":" "
        },
        {
          "type": "field_clockwise_image",
          "name": "BLOCK",
          "src": Blockly.utils.getRuntimeImagePath('/dialogs/clockwise/onebyone.png'),
          "width": 24,
          "height": 24,
        },
        {
          "type": "field_label",
          "text":" "
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"],
      "mutator": "bell_motion_motor_power_for_seconds_mutator",
    });
  }
};



Blockly.Blocks['motion_motorBall_rotate_on_power'] = {
  shouldCreateMultiRow: true,
  init: function () {
    this.jsonInit({
      "message0": '驱动球 %1，%2 旋转，功率 %3%4',
      "args0": [
        /* {
          "type": "input_value",
          "name": "mabot_motor_ball_index",
        },
        {
          "type": "field_dropdown",
          "name": "rotate_direction",
          "options": [
            ["顺时针", '_clockwise_'],
            ["逆时针", '_counterclockwise_']
          ]
        },
        {
          "type": "input_value",
          "name": "power",
        }, */
        {
          "type": "field_dialog",
          "name": "mabot_motor_ball_index",
          "defaultValue": "1",
          "module": "motor",
          "multiMode": true,
        },
        {
          "type": "field_dropdown",
          "name": "rotate_direction",
          "options": [
            ["顺时针", '_clockwise_'],
            ["逆时针", '_counterclockwise_']
          ]
        },
        {
          "type": "field_speedBellDialog",
          "name": "power",
          "value": "30",
          "min": "0",
          "max": "100"
        },
        {
          "type": "field_label",
          "text":" "
        },
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"],
      "mutator": "bell_motion_motor_power_mutator"
    });
  }
};

Blockly.Blocks['motion_motorBall_rotate_on_speed_for_seconds'] = {
  shouldCreateMultiRow: true,
  init: function () {
    this.jsonInit({
      "message0": '驱动球 %1，%2 旋转，速度 %3 转/分，持续 %4 秒，%5%6%7',
      "args0": [
        /* {
          "type": "input_value",
          "name": "mabot_motor_ball_index",
        },
        {
          "type": "field_dropdown",
          "name": "rotate_direction",
          "options": [
            ["顺时针", '_clockwise_'],
            ["逆时针", '_counterclockwise_']
          ]
        },
        {
          "type": "input_value",
          "name": "speed",
        },
        {
          "type": "input_value",
          "name": "rotate_for_seconds",
        } */
        // {
        //   "type": "input_value",
        //   "name": "mabot_motor_ball_index",
        // },
        {
          "type": "field_dialog",
          "name": "mabot_motor_ball_index",
          "defaultValue": "1",
          "module": "motor",
          "multiMode": true,
        },
        {
          "type": "field_dropdown",
          "name": "rotate_direction",
          "options": [
            ["顺时针", '_clockwise_'],
            ["逆时针", '_counterclockwise_']
          ]
        },
        {
          "type": "field_speedBellDialog",
          "name": "speed",
          "value": "30",
          "min": "0",
          "max": "100"
        },
        {
          "type": "field_numberDialog",
          "name": "rotate_for_seconds",
          "defaultValue": "1",
          "check": ['Number', 'Boolean', 'String', 'Array']
        },
        {
          "type": "field_label",
          "text":" "
        },
        {
          "type": "field_clockwise_image",
          "name": "BLOCK",
          "src": Blockly.utils.getRuntimeImagePath('/dialogs/clockwise/onebyone.png'),
          "width": 24,
          "height": 24,
        },
        {
          "type": "field_label",
          "text":" "
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"],
      "mutator": "bell_motion_motor_speed_for_seconds_mutator"
    });
  }
};

Blockly.Blocks['motion_motorBall_rotate_on_speed'] = {
  shouldCreateMultiRow: true,
  init: function () {
    this.jsonInit({
      "message0": '驱动球 %1，%2 旋转，速度 %3 转/分 %4',
      "args0": [
        /* {
          "type": "input_value",
          "name": "mabot_motor_ball_index",
        },
        {
          "type": "field_dropdown",
          "name": "rotate_direction",
          "options": [
            ["顺时针", '_clockwise_'],
            ["逆时针", '_counterclockwise_']
          ]
        },
        {
          "type": "input_value",
          "name": "speed",
        } */
        {
          "type": "field_dialog",
          "name": "mabot_motor_ball_index",
          "defaultValue": "1",
          "module": "motor",
          "multiMode": true,
        },
        {
          "type": "field_dropdown",
          "name": "rotate_direction",
          "options": [
            ["顺时针", '_clockwise_'],
            ["逆时针", '_counterclockwise_']
          ]
        },
        {
          "type": "field_speedBellDialog",
          "name": "speed",
          "value": "30",
          "min": "0",
          "max": "100"
        },
        {
          "type": "field_label",
          "text":" "
        },
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"],
      "mutator": "bell_motion_motor_speed_mutator"
    });
  }
};

Blockly.Blocks['motion_motorBall_stop'] = {
  init: function () {
    this.jsonInit({
      "message0": "驱动球 %1 %2 停止旋转",
      "args0": [
        /* {
          "type": "input_value",
          "name": "mabot_motor_ball_index",
        }, */
        {
          "type": "field_dialog",
          "name": "mabot_motor_ball_index",
          "defaultValue": "1",
          "module": "motor",
          "multiMode": true,
        },
        {
          "type": "field_dropdown",
          "name": "immediatelyOrNot",
          "options": [
            ["缓慢", "slowly"],
            ["立即", "immediately"],
          ]
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_motorBall_reset'] = {
  init: function () {
    this.jsonInit({
      "message0": "重置驱动球 %1 的度数",
      "args0": [
        /* {
          "type": "input_value",
          "name": "mabot_motor_ball_index",
        }, */
        {
          "type": "field_dialog",
          "name": "mabot_motor_ball_index",
          "defaultValue": "1",
          "module": "motor",
          "multiMode": true,
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['motion_motorBall_get_angle'] = {
  init: function () {
    this.jsonInit({
      "message0": "获取驱动球 %1 的旋转度数",
      "args0": [
       /*  {
          "type": "input_value",
          "name": "mabot_motor_ball_index",
        }, */
        {
          "type": "field_dialog",
          "name": "mabot_motor_ball_index",
          "defaultValue": "1",
          "module": "motor",
          "multiMode": false,
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};

Blockly.Blocks['motion_motorBall_get_speed'] = {
  init: function () {
    this.jsonInit({
      "message0": "获取驱动球 %1 的旋转速度",
      "args0": [
        /* {
          "type": "input_value",
          "name": "mabot_motor_ball_index",
        }, */
        {
          "type": "field_dialog",
          "name": "mabot_motor_ball_index",
          "defaultValue": "1",
          "module": "motor",
          "multiMode": false,
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};


Blockly.Blocks['motion_horizontalJoint_set_angle'] = {
  shouldCreateMultiRow: true,
  init: function () {
    this.jsonInit({
      "message0": "旋转关节球 %1 摆到 %2 ° %3",
      "args0": [
        /* {
          "type": "input_value",
          "name": "mabot_horizontalJoint_index",
        }, */
        {
          "type": "field_dialog",
          "name": "mabot_horizontalJoint_index",
          "defaultValue": "1",
          "module": "waist_joint",
          "multiMode": true,
        },
        /* {
          "type": "input_value",
          "name": "mabot_horizontalJoint_angle",
        }, */
        {
          "type": "field_speedBellDialog",
          "name": "mabot_horizontalJoint_angle",
          "value": "0",
          "min": "-75",
          "max": "75"
        },
        {
          "type": "field_clockwise_image",
          "name": "BLOCK",
          "src": Blockly.utils.getRuntimeImagePath('/dialogs/clockwise/onebyone.png'),
          "width": 24,
          "height": 24,
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"],
      "mutator": "bell_motion_horizontalJoint_set_angle_mutator"
    });
  }
};

Blockly.Blocks['motion_swingJoint_set_angle'] = {
  shouldCreateMultiRow: true,
  init: function () {
    this.jsonInit({
      "message0": "摇摆关节球 %1 摆到 %2 ° %3",
      "args0": [
        /* {
          "type": "input_value",
          "name": "mabot_swingJoint_index",
        }, */
        {
          "type": "field_dialog",
          "name": "mabot_swingJoint_index",
          "defaultValue": "1",
          "module": "arm_joint",
          "multiMode": true,
        },
        /* {
          "type": "input_value",
          "name": "mabot_swingJoint_angle",
        } */
        {
          "type": "field_speedBellDialog",
          "name": "mabot_swingJoint_angle",
          "value": "0",
          "min": "-75",
          "max": "75"
        },
        {
          "type": "field_clockwise_image",
          "name": "BLOCK",
          "src": Blockly.utils.getRuntimeImagePath('/dialogs/clockwise/onebyone.png'),
          "width": 24,
          "height": 24,
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"],
      "mutator": "bell_motion_swingJoint_set_angle_mutator"
    });
  }
};


Blockly.Blocks['motion_horizontalJoint_get_angle'] = {
  init: function () {
    this.jsonInit({
      "message0": "获取旋转关节球 %1 的角度",
      "args0": [
        /* {
          "type": "input_value",
          "name": "mabot_horizontalJoint_index",
        }, */
        {
          "type": "field_dialog",
          "name": "mabot_horizontalJoint_index",
          "defaultValue": "1",
          "module": "waist_joint",
          "multiMode": false,
        },
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};

Blockly.Blocks['motion_swingJoint_get_angle'] = {
  init: function () {
    this.jsonInit({
      "message0": "获取摇摆关节球 %1 的角度",
      "args0": [
        /* {
          "type": "input_value",
          "name": "mabot_swingJoint_index",
        }, */
        {
          "type": "field_dialog",
          "name": "mabot_swingJoint_index",
          "defaultValue": "1",
          "module": "arm_joint",
          "multiMode": false,
        },
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};

Blockly.Extensions.registerMutator('bell_motion_motor_power_for_seconds_mutator', Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK, null, []);

Blockly.Extensions.registerMutator('bell_motion_motor_power_mutator', Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK_2, null, []);

Blockly.Extensions.registerMutator('bell_motion_motor_speed_for_seconds_mutator', Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK_3, null, []);

Blockly.Extensions.registerMutator('bell_motion_motor_speed_mutator', Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK_4, null, []);

Blockly.Extensions.registerMutator('bell_motion_horizontalJoint_set_angle_mutator', Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK_5, null, []);

Blockly.Extensions.registerMutator('bell_motion_swingJoint_set_angle_mutator', Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK_6, null, []);