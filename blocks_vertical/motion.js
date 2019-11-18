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
Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK = {
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
    for (var i = 0, data; data = this.mixinMultiLinesData[i]; i++) {
      data.clockwise = this.getFieldValue('CLOCKWISE' + (i + 1));
      data.power = this.getFieldValue('POWER' + (i + 1));
      data.seconds = this.getFieldValue('SECONDS' + (i + 1));
    }
  },
  mutationToDom: function() {
    if (!this.mixinMultiLinesData || !this.mixinMultiLinesData.length ||
      !this.shouldCreateMultiRow) {
      return null;
    }
    return null; // FIXME: mutation保留导致一系列问题，能否解决?

    var container = document.createElement('mutation');
    for (var i = 0, data; data = this.mixinMultiLinesData[i]; i++) {
      var item = document.createElement('item');
      // 驱动球球号1-15
      item.setAttribute('seq', data.seq);
      // 顺时针 or 逆时针
      item.setAttribute('clockwise', data.clockwise);
      // 功率
      item.setAttribute('power', data.power);
      // 持续时间(s)
      item.setAttribute('seconds', data.seconds);
      container.appendChild(item);
    }
    return container;
  },
  domToMutation: function(element) {
    if (!this.shouldCreateMultiRow) return;
    this.mixinMultiLinesData.length = 0;
    // 首行数据
    var firstLineData = {
      seq: this.getFieldValue('MOTOR'),
      clockwise: this.getFieldValue('CLOCKWISE'),
      power: this.getFieldValue('POWER'),
      seconds: this.getFieldValue('SECONDS'),
    };
    this.mixinMultiLinesData.push(firstLineData);

    for (var i = 0, child; child = element.childNodes[i]; i++) {
      var item = {};

      // 驱动球球号
      item.seq = parseInt(child.getAttribute('seq'));
      // 顺时针 or 逆时针
      item.clockwise = parseInt(child.getAttribute('clockwise'));
      // 功率
      item.power = parseInt(child.getAttribute('power'));
      // 持续时间(s)
      item.seconds = parseFloat(child.getAttribute('seconds'));

      this.mixinMultiLinesData.push(item);
    }
    // re-render the block
    this.updateShape_();
  },
  updateShape_: function() {
    var data = this.mixinMultiLinesData;
    // 首行单独更新field值
    this.getField('MOTOR').setValue(data[0].seq);
    this.getField('CLOCKWISE').setValue(data[0].clockwise);
    this.getField('POWER').setValue(data[0].power);
    this.getField('SECONDS').setValue(data[0].seconds);
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
    // 添加行
    for (var i = 1, item; item = data[i]; i++) {
      var seqField = new Blockly.FieldModuleDialog(item.seq, Blockly.FieldModuleDialog.MODULE_MOTOR, true);
      // var clockwiseField = new Blockly.FieldClockwiseDialog(item.clockwise);
      var clockwiseField = new Blockly.FieldDropdown([
          ["顺时针", '_clockwise_'],
          ["逆时针", '_counterclockwise_']
      ]); // 默认0 顺时针
      
      var powerField = new Blockly.FieldNumberDialog(item.power);//new Blockly.FieldBellSpeedDialog(item.power, 0, 180);
      var secondsField = new Blockly.FieldNumberDialog(item.seconds); //new Blockly.Input(Blockly.INPUT_VALUE, '')
      this.appendDummyInput()
        .appendField('驱动球')
        .appendField(seqField,'MOTOR' + i)
        .appendField(',')
        .appendField(clockwiseField, 'CLOCKWISE' + i)
        .appendField('旋转, 功率')
        .appendField(powerField, 'POWER' + i)
        .appendField(', 持续')
        .appendField(secondsField, 'SECONDS' + i)
        .appendField('秒');
    }
    // fix issue: 需要把compose传过来的第一个data删除
    this.mixinMultiLinesData.splice(0, 1);
    // fix issue: 需要强制渲染一次block，防止出现空行
    this.render();
  },
  compose: function(newData) {
    if (!this.shouldCreateMultiRow) return;
    // 首行数据
    var firstLineData = {
      seq: this.getFieldValue('MOTOR'),
      clockwise: this.getFieldValue('CLOCKWISE'),
      power: this.getFieldValue('POWER'),
      seconds: this.getFieldValue('SECONDS'),
    };
    // 其余数据
    var otherLineData = this.mixinMultiLinesData;
    // 拼接起来
    var oldData = [];
    oldData.push({
      seq: firstLineData.seq,
      clockwise: firstLineData.clockwise,
      power: firstLineData.power,
      seconds: firstLineData.seconds,
    });
    for (var i = 0, otherLine; otherLine = otherLineData[i]; i++) {
      oldData.push({
        seq: otherLine.seq,
        clockwise: otherLine.clockwise,
        power: otherLine.power,
        seconds: otherLine.seconds,
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
          clockwise: find.clockwise,
          power: find.power,
          seconds: find.seconds,
        });
      } else {
        // 没有，给默认值
        mergeData.push({
          seq: newLine,
          clockwise: '1',
          power: 30,
          seconds: 3,
        });
      }
    }
    this.mixinMultiLinesData = mergeData;
    this.updateShape_();
  },
  decompose: function() {
    if (!this.shouldCreateMultiRow) return;
    var data = this.mixinMultiLinesDataModuleList();
    data.unshift(this.getFieldValue('MOTOR'));
    return data;
  },
};



Blockly.Blocks['motion_movesteps'] = {
  /**
   * Block to move steps.
   * @this Blockly.Block
   */
  shouldCreateMultiRow: true,
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MOTION_MOVESTEPS,
      // "message0": '驱动球 %1, %2 旋转, 功率 %3, 持续 %4 秒, %5%6',
      "args0": [
        {
          "type": "input_value",
          "name": "STEPS"
        }
        // {
        //   "type": "field_clockwise",
        //   "name": "STEPS",
        //   "value": "0"
        // }
        /* {
          "type": "field_speedBellDialog",
          "name": "STEPS",
          "value": "0",
          "min": "-75",
          "max": "75"
        } */
        // {
        //   "type": 'field_colorpicker',
        //   "name": "STEPS"
        // }
      //   {
      //     "type": "field_dialog",
      //     "name": "MOTOR",
      //     "defaultValue": "1",
      //     "module": "motor",
      //     "multiMode": true,
      //     },
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"],
      // "mutator": "bell_motion_motor_power_mutator",
    });
  }
};

Blockly.Extensions.registerMutator('bell_motion_motor_power_mutator', Blockly.Blocks.MIXIN_MULTI_LINES_BLOCK, null, []);

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
          "name": "DEGREES"
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
          "type": "input_value",
          "name": "DIRECTION"
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
  init: function () {

    this.jsonInit({
      //"message0":'motor ball %1,rotate %2 on %3 power,for %4 seconds',
      "message0": '驱动球 %1,%2 旋转，功率 %3,持续 %4 秒',
      "args0": [
        {
          "type": "input_value",
          "name": "mabot_motor_ball_index",
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
          "type": "input_value",
          "name": "power",
        },
        {
          "type": "input_value",
          "name": "rotate_for_seconds",
        },
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_motorBall_rotate_on_power'] = {
  init: function () {
    this.jsonInit({
      //"message0":'motor ball %1,rotate %2 on %3 power',
      "message0": '驱动球 %1，%2 旋转，功率 %3',
      "args0": [
        {
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
        },
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_motorBall_rotate_on_speed_for_seconds'] = {
  init: function () {
    this.jsonInit({
      //"message0":'motor ball %1,rotate %2 on %3 power',
      "message0": '驱动球 %1，%2 旋转，速度 %3 转/分，持续 %4 秒',
      "args0": [
        {
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

          // "type": "field_speedBellDialog",
          // "name": "speed",
          // "value": "0",
          // "min": "0",
          // "max": "255"
        },
        {
          "type": "input_value",
          "name": "rotate_for_seconds",
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_motorBall_rotate_on_speed'] = {
  init: function () {
    this.jsonInit({
      //"message0":'motor ball %1,rotate %2 on %3 power',
      "message0": '驱动球 %1，%2 旋转，速度 %3 转/分',
      "args0": [
        {
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

          // "type": "field_speedBellDialog",
          // "name": "speed",
          // "value": "0",
          // "min": "0",
          // "max": "255"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_motorBall_stop'] = {
  init: function () {
    this.jsonInit({
      "message0": "驱动球 %1 %2 停止旋转",
      "args0": [
        {
          "type": "input_value",
          "name": "mabot_motor_ball_index",
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
        {
          "type": "input_value",
          "name": "mabot_motor_ball_index",
        },
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
        {
          "type": "input_value",
          "name": "mabot_motor_ball_index",
        },
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
        {
          "type": "input_value",
          "name": "mabot_motor_ball_index",
        },
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};


Blockly.Blocks['motion_horizontalJoint_set_angle'] = {
  init: function () {
    this.jsonInit({
      "message0": "旋转关节球 %1 摆到 %2 °",
      "args0": [
        {
          "type": "input_value",
          "name": "mabot_horizontalJoint_index",
        },
        {
          "type": "input_value",
          "name": "mabot_horizontalJoint_angle",
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};

Blockly.Blocks['motion_swingJoint_set_angle'] = {
  init: function () {
    this.jsonInit({
      "message0": "摇摆关节球 %1 摆到 %2 °",
      "args0": [
        {
          "type": "input_value",
          "name": "mabot_swingJoint_index",
        },
        {
          "type": "input_value",
          "name": "mabot_swingJoint_angle",
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "shape_statement"]
    });
  }
};


Blockly.Blocks['motion_horizontalJoint_get_angle'] = {
  init: function () {
    this.jsonInit({
      "message0": "获取旋转关节球 %1 的角度",
      "args0": [
        {
          "type": "input_value",
          "name": "mabot_horizontalJoint_index",
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
        {
          "type": "input_value",
          "name": "mabot_swingJoint_index",
        },
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_motion", "output_number"]
    });
  }
};

