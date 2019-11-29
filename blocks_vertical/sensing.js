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

goog.provide('Blockly.Blocks.sensing');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


// add by liuming example
// Blockly.Blocks['mabot_read_sensor_touch_ball'] = {
//   init: function() {
//     this.jsonInit({
//       "message0": 'touch ball index %1 pressed ?',
//       "args0": [
//         {
//           "type": "input_value",
//           "name": "mabot_sensor_index"
//         },
//         {
//           "type": "input_value",
//           "name": "mabot_sensor_param"
//         }
//       ],
//       "category": Blockly.Categories.motion,
//       "extensions": ["colours_sensing", "output_number"]
//     });
//   }
// };

window.BellMsg = window.BellMsg || {};
// 判断是否为移动端
if(/Android|iPhone|iPad/i.test(navigator.userAgent)) {
  BellMsg.SENSING_TOUCHINGOBJECT_POINTER = "触摸位置";
  BellMsg.SENSING_DISTANCETO_POINTER = "触摸位置";
  BellMsg.SENSING_MOUSEDOWN = "手指按下";
  BellMsg.SENSING_MOUSEX = "触摸位置的x坐标";
  BellMsg.SENSING_MOUSEY = "触摸位置的y坐标";
}else{
  BellMsg.SENSING_TOUCHINGOBJECT_POINTER = "鼠标指针";
  BellMsg.SENSING_DISTANCETO_POINTER = "鼠标指针";
  BellMsg.SENSING_MOUSEDOWN = "鼠标按下";
  BellMsg.SENSING_MOUSEX = "鼠标位置的x坐标";
  BellMsg.SENSING_MOUSEY = "鼠标位置的y坐标";
}

BellMsg.SENSING_TOUCHINGOBJECT_EDGE = "边缘";
BellMsg.SENSING_DISTANCETO = "到 %1 的距离";
BellMsg.SENSING_TOUCHINGOBJECT = "碰到 %1";

Blockly.Blocks['mabot_read_sensor_touch_ball'] = {
  init: function () {
    this.jsonInit({
      "message0": 'touch ball index %1 pressed ?',
      "args0": [
        {
          "type": "input_value",
          "name": "mabot_sensor_index"
        }
      ],
      "category": Blockly.Categories.motion,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};


Blockly.Blocks['sensing_touchingobject'] = {
  /**
   * Block to Report if its touching a Object.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": BellMsg.SENSING_TOUCHINGOBJECT,
      "args0": [
        {
          "type": "input_value",
          "name": "TOUCHINGOBJECTMENU"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_touchingobjectmenu'] = {
  /**
   * "Touching [Object]" Block Menu.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "TOUCHINGOBJECTMENU",
          "options": [
            // [Blockly.Msg.SENSING_TOUCHINGOBJECT_POINTER, '_mouse_'],
            // [Blockly.Msg.SENSING_TOUCHINGOBJECT_EDGE, '_edge_']
            [BellMsg.SENSING_TOUCHINGOBJECT_POINTER, '_mouse_'],
            [BellMsg.SENSING_TOUCHINGOBJECT_EDGE, '_edge_']
          ]
        }
      ],
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_touchingcolor'] = {
  /**
   * Block to Report if its touching a certain Color.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_TOUCHINGCOLOR,
      "args0": [
        {
          "type": "input_value",
          "name": "COLOR"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_coloristouchingcolor'] = {
  /**
   * Block to Report if a color is touching a certain Color.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_COLORISTOUCHINGCOLOR,
      "args0": [
        {
          "type": "input_value",
          "name": "COLOR"
        },
        {
          "type": "input_value",
          "name": "COLOR2"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_distanceto'] = {
  /**
   * Block to Report distance to another Object.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": BellMsg.SENSING_DISTANCETO,
      "args0": [
        {
          "type": "input_value",
          "name": "DISTANCETOMENU"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_distancetomenu'] = {
  /**
   * "Distance to [Object]" Block Menu.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DISTANCETOMENU",
          "options": [
            // [Blockly.Msg.SENSING_DISTANCETO_POINTER, '_mouse_']
            [BellMsg.SENSING_DISTANCETO_POINTER, '_mouse_']
          ]
        }
      ],
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_askandwait'] = {
  /**
   * Block to ask a question and wait
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_ASKANDWAIT,
      "args0": [
        {
          "type": "input_value",
          "name": "QUESTION"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "shape_statement"]
    });
  }
};

Blockly.Blocks['sensing_answer'] = {
  /**
   * Block to report answer
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_ANSWER,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_keypressed'] = {
  /**
   * Block to Report if a key is pressed.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_KEYPRESSED,
      "args0": [
        {
          "type": "input_value",
          "name": "KEY_OPTION"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_keyoptions'] = {
  /**
   * Options for Keys
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "KEY_OPTION",
          "options": [
            [Blockly.Msg.EVENT_WHENKEYPRESSED_SPACE, 'space'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_UP, 'up arrow'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_DOWN, 'down arrow'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_RIGHT, 'right arrow'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_LEFT, 'left arrow'],
            [Blockly.Msg.EVENT_WHENKEYPRESSED_ANY, 'any'],
            ['a', 'a'],
            ['b', 'b'],
            ['c', 'c'],
            ['d', 'd'],
            ['e', 'e'],
            ['f', 'f'],
            ['g', 'g'],
            ['h', 'h'],
            ['i', 'i'],
            ['j', 'j'],
            ['k', 'k'],
            ['l', 'l'],
            ['m', 'm'],
            ['n', 'n'],
            ['o', 'o'],
            ['p', 'p'],
            ['q', 'q'],
            ['r', 'r'],
            ['s', 's'],
            ['t', 't'],
            ['u', 'u'],
            ['v', 'v'],
            ['w', 'w'],
            ['x', 'x'],
            ['y', 'y'],
            ['z', 'z'],
            ['0', '0'],
            ['1', '1'],
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
            ['5', '5'],
            ['6', '6'],
            ['7', '7'],
            ['8', '8'],
            ['9', '9']
          ]
        }
      ],
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};

Blockly.Blocks['sensing_mousedown'] = {
  /**
   * Block to Report if the mouse is down.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      // "message0": Blockly.Msg.SENSING_MOUSEDOWN,
      "message0": BellMsg.SENSING_MOUSEDOWN,
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_mousex'] = {
  /**
   * Block to report mouse's x position
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      // "message0": Blockly.Msg.SENSING_MOUSEX,
      "message0": BellMsg.SENSING_MOUSEX,
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_mousey'] = {
  /**
   * Block to report mouse's y position
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      // "message0": Blockly.Msg.SENSING_MOUSEY,
      "message0": BellMsg.SENSING_MOUSEY,
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_setdragmode'] = {
  /**
   * Block to set drag mode.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_SETDRAGMODE,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DRAG_MODE",
          "options": [
            [Blockly.Msg.SENSING_SETDRAGMODE_DRAGGABLE, 'draggable'],
            [Blockly.Msg.SENSING_SETDRAGMODE_NOTDRAGGABLE, 'not draggable']
          ]
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "shape_statement"]
    });
  }
};

Blockly.Blocks['sensing_loudness'] = {
  /**
   * Block to report loudness
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_LOUDNESS,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_loud'] = {
  /**
   * Block to report if the loudness is "loud" (greater than 10). This is an
   * obsolete block that is implemented for compatibility with Scratch 2.0 and
   * 1.4 projects.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_LOUD,
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_timer'] = {
  /**
   * Block to report timer
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_TIMER,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_resettimer'] = {
  /**
   * Block to reset timer
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_RESETTIMER,
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "shape_statement"]
    });
  }
};

Blockly.Blocks['sensing_of_object_menu'] = {
  /**
   * "* of _" object menu.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OBJECT",
          "options": [
            ['Sprite1', 'Sprite1'],
            ['Stage', '_stage_']
          ]
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};


Blockly.Blocks['sensing_of'] = {
  /**
   * Block to report properties of sprites.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_OF,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "PROPERTY",
          "options": [
            [Blockly.Msg.SENSING_OF_XPOSITION, 'x position'],
            [Blockly.Msg.SENSING_OF_YPOSITION, 'y position'],
            [Blockly.Msg.SENSING_OF_DIRECTION, 'direction'],
            [Blockly.Msg.SENSING_OF_COSTUMENUMBER, 'costume #'],
            [Blockly.Msg.SENSING_OF_COSTUMENAME, 'costume name'],
            [Blockly.Msg.SENSING_OF_SIZE, 'size'],
            [Blockly.Msg.SENSING_OF_VOLUME, 'volume'],
            [Blockly.Msg.SENSING_OF_BACKDROPNUMBER, 'backdrop #'],
            [Blockly.Msg.SENSING_OF_BACKDROPNAME, 'backdrop name']
          ]
        },
        {
          "type": "input_value",
          "name": "OBJECT"
        }
      ],
      "output": true,
      "category": Blockly.Categories.sensing,
      "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
      "extensions": ["colours_sensing"]
    });
  }
};

Blockly.Blocks['sensing_current'] = {
  /**
   * Block to Report the current option.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_CURRENT,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "CURRENTMENU",
          "options": [
            [Blockly.Msg.SENSING_CURRENT_YEAR, 'YEAR'],
            [Blockly.Msg.SENSING_CURRENT_MONTH, 'MONTH'],
            [Blockly.Msg.SENSING_CURRENT_DATE, 'DATE'],
            [Blockly.Msg.SENSING_CURRENT_DAYOFWEEK, 'DAYOFWEEK'],
            [Blockly.Msg.SENSING_CURRENT_HOUR, 'HOUR'],
            [Blockly.Msg.SENSING_CURRENT_MINUTE, 'MINUTE'],
            [Blockly.Msg.SENSING_CURRENT_SECOND, 'SECOND']
          ]
        }
      ],
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_dayssince2000'] = {
  /**
   * Block to report days since 2000
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_DAYSSINCE2000,
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_username'] = {
  /**
   * Block to report user's username
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_USERNAME,
      "category": Blockly.Categories.sensing,
      "checkboxInFlyout": true,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};

Blockly.Blocks['sensing_userid'] = {
  /**
   * Block to report user's ID. Does not actually do anything. This is an
   * obsolete block that is implemented for compatibility with Scratch 2.0
   * projects.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_USERID,
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"]
    });
  }
};


// 颜色传感器（1）[=] (color)
Blockly.Blocks['bell_detect_color_equal_value'] = {
  init: function () {
    this.jsonInit({
      "message0": "颜色传感器 %1 %2 %3",
      "args0": [{
        "type": "input_value",
        "name": "MOTOR",
        "defaultValue": "1",
        "module": "color",
      },
        {
          "type": "field_dropdown",
          "name": "TOUCHPRESS",
          "options": [
            ['=', 'EQUALS'],
            ['≠', 'UNEQUALS']
          ]
        },
        {
          "type": "field_colorpicker",
          "name": "COLOR",
          "value": "1",
          "options": [
            ['黑色', '1'],
            ['蓝色', '2'],
            ['绿色', '3'],
            ['黄色', '4'],
            ['红色', '5'],
            ['白色', '6'],
            ['紫色', '7'],
            ['橘黄色', '8'],
          ]
        },
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

// 红外传感器（1）[=] (cm)
Blockly.Blocks['bell_detect_infrared_equal_cm'] = {
  init: function () {
    this.jsonInit({
      "message0": "红外传感器 %1 %2 %3 cm",
      "args0": [{
        "type": "input_value",
        "name": "MOTOR",
        "defaultValue": "1",
        //"module": "infrared",
      },
        {
          "type": "field_dropdown",
          "name": "TOUCHPRESS",
          "options": [
            ['≤', 'LESS'],
            ['≥', 'GREATER']
          ]
        },
        {
          "type": "input_value",
          "name": "DISTANCE",
          "defaultValue": "1",
        },
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

// 触控球（1）的状态为 [按下,没按下]
Blockly.Blocks['bell_detect_touch_press_state'] = {
  init: function () {
    this.jsonInit({
      "message0": "触碰球 %1 的状态为 %2",
      "args0": [{
        "type": "input_value",
        "name": "MOTOR",
        "defaultValue": "1",
        "module": "touch",
      },
        {
          "type": "field_dropdown",
          "name": "TOUCHPRESS",
          "options": [
            ['按下', 'LOUDNESS'],
            ['没按下', 'TIMER']
          ]
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

// 陀螺仪的[俯仰角度,翻滚角度,旋转角度] [=>,=,<=][0,0,20]
Blockly.Blocks['bell_detect_gyro_angle_value'] = {
  init: function () {
    this.jsonInit({
      "message0": "陀螺仪的 %1 %2 %3",
      "args0": [{
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          ['俯仰角度', 'gyro_x'],
          ['旋转角度', 'gyro_y'],
          ['翻滚角度', 'gyro_z'],
        ]
      },
        {
          "type": "field_dropdown",
          "name": "COMPUTE",
          "options": [
            ['≤', 'LESS'],
            ['≥', 'GREATER']
          ]
        },
        {
          "type": "input_value",
          "name": "ANGLE",
          "defaultValue": "0",
          "min": '0',
          "max": '255'
        },
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};


// 获取颜色传感器（1）的值
Blockly.Blocks['bell_detect_get_color_value'] = {
  shouldCreateMultiRow: true,
  init: function () {
    this.jsonInit({
      "message0": "获取颜色传感器 %1 的值",
      "args0": [{
        "type": "input_value",
        "name": "MOTOR",
        "defaultValue": "1",
        "module": "color",
      }],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"],
    });
  }
};

// 获取红外传感器（1）的值
Blockly.Blocks['bell_detect_get_infrared_value'] = {
  shouldCreateMultiRow: true,
  init: function () {
    this.jsonInit({
      "message0": "获取红外传感器 %1 的值",
      "args0": [{
        "type": "input_value",
        "name": "MOTOR",
        "defaultValue": "1",
        "module": "infrared",
      }],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"],
    });
  }
};

// 获取陀螺仪（1） 的值
Blockly.Blocks['bell_detect_get_gyro_value'] = {
  shouldCreateMultiRow: true,
  init: function () {
    this.jsonInit({
      "message0": "获取陀螺仪 %1",
      "args0": [{
        "type": "field_dropdown",
        "name": "DIRECTION",
        "options": [
          ['俯仰角度', 'gyro_x'],
          ['旋转角度', 'gyro_y'],
          ['翻滚角度', 'gyro_z'],
        ]
      }],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_number"],
    });
  }
};


// 重置陀螺仪角度
Blockly.Blocks['bell_detect_reset_gyro'] = {
  init: function () {
    this.jsonInit({
      "message0": "重置陀螺仪角度",
      "args0": [],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "shape_statement"],
    });
  }
};

// 设置颜色传感器的检测模式
Blockly.Blocks['bell_detect_set_color_mode'] = {
  shouldCreateMultiRow: true,
  init: function () {
    this.jsonInit({
      "message0": "颜色传感器 %1 模式为 %2",
      "args0": [
        {
          "type": "input_value",
          "name": "indexOfColorSensor"
        },
        {
          "type": "field_dropdown",
          "name": "colorMode",
          "options": [
            ["环境光", '1'],
            ["反射光", '2'],
            ["颜色识别", '3'],
          ]
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "shape_statement"],
    });
  }
};

/* ************************* */





