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

goog.provide('Blockly.Blocks.event');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');


Blockly.Blocks.DETECT_GYRO_ANGLE_VAL_MINXIN = {
  onchange(e) {
    if(e.element === 'field') {
      const name = e.name;
      // 角度类型改变角度的范围也要改变
      if(name === 'DIRECTION') {

        const input = this.inputList[0];
        const fieldRow = input.fieldRow;

        const directionField = new Blockly.FieldDropdown(
          [
            ["俯仰角度", 'gyro_x'],
            ["旋转角度", 'gyro_y'],
            ["翻滚角度", 'gyro_z']
          ],
          undefined,
          fieldRow[1].getValue()
        );

        const computeField = new Blockly.FieldDropdown(
          [
            ['≤', 'LESS'],
            ['≥', 'GREATER']
          ],
          undefined,
          fieldRow[2].getValue()
        );

        let angleField;
        switch(fieldRow[1].getValue()) {
          case "gyro_x":
            angleField = new Blockly.FieldBellSpeedDialog(0, -90, 90);
            break;
          case "gyro_y":
            angleField = new Blockly.FieldBellSpeedDialog(0, -360, 360);
            break;
          case "gyro_z":
            angleField = new Blockly.FieldBellSpeedDialog(0, -180, 180);
            break;
        }

        this.appendDummyInput()
          .appendField('陀螺仪的')
          .appendField(directionField, 'DIRECTION')
          .appendField(computeField, 'COMPUTE')
          .appendField(angleField, 'ANGLE');

        Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'field', 'ANGLE', fieldRow[3].getValue(), '0')); // 重置角度值
        input.dispose(); // 删除原来的行
        this.inputList.splice(0, 1);
        this.render();
      }
    }
  },

  mutationToDom() {
    return null;
  },
  domToMutation(element) {

  },
  decompose(workspace) {

  },
  compose() {

  }
}


Blockly.Blocks['event_whentouchingobject'] = {
  /**
   * Block for when a sprite is touching an object.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_WHENTOUCHINGOBJECT,
      "args0": [
        {
          "type": "input_value",
          "name": "TOUCHINGOBJECTMENU"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_touchingobjectmenu'] = {
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
            [Blockly.Msg.SENSING_TOUCHINGOBJECT_POINTER, '_mouse_'],
            [Blockly.Msg.SENSING_TOUCHINGOBJECT_EDGE, '_edge_']
          ]
        }
      ],
      "extensions": ["colours_event", "output_string"]
    });
  }
};

Blockly.Blocks['event_whenflagclicked'] = {
  /**
   * Block for when flag clicked.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "event_whenflagclicked",
      //"message0": Blockly.Msg.EVENT_WHENFLAGCLICKED,
      "message0": "当 %1 被点击",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "play.png",
          "width": 24,
          "height": 24,
          "alt": "flag"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_whenthisspriteclicked'] = {
  /**
   * Block for when this sprite clicked.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_WHENTHISSPRITECLICKED,
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }

};

Blockly.Blocks['event_whenstageclicked'] = {
  /**
   * Block for when the stage is clicked.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_WHENSTAGECLICKED,
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_whenbroadcastreceived'] = {
  /**
   * Block for when broadcast received.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "event_whenbroadcastreceived",
      "message0": Blockly.Msg.EVENT_WHENBROADCASTRECEIVED,
      "args0": [
        {
          "type": "field_variable",
          "name": "BROADCAST_OPTION",
          "variableTypes": [Blockly.BROADCAST_MESSAGE_VARIABLE_TYPE],
          "variable": Blockly.Msg.DEFAULT_BROADCAST_MESSAGE_NAME
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_whenbackdropswitchesto'] = {
  /**
   * Block for when the current backdrop switched to a selected backdrop.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_WHENBACKDROPSWITCHESTO,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "BACKDROP",
          "options": [
            ['backdrop1', 'BACKDROP1']
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_whengreaterthan'] = {
  /**
   * Block for when loudness/timer/video motion is greater than the value.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_WHENGREATERTHAN,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "WHENGREATERTHANMENU",
          "options": [
            [Blockly.Msg.EVENT_WHENGREATERTHAN_LOUDNESS, 'LOUDNESS'],
            [Blockly.Msg.EVENT_WHENGREATERTHAN_TIMER, 'TIMER']
          ]
        },
        {
          "type": "input_value",
          "name": "VALUE"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_broadcast_menu'] = {
  /**
   * Broadcast drop-down menu.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_variable",
          "name": "BROADCAST_OPTION",
          "variableTypes": [Blockly.BROADCAST_MESSAGE_VARIABLE_TYPE],
          "variable": Blockly.Msg.DEFAULT_BROADCAST_MESSAGE_NAME
        }
      ],
      "colour": Blockly.Colours.event.secondary,
      "colourSecondary": Blockly.Colours.event.secondary,
      "colourTertiary": Blockly.Colours.event.tertiary,
      "extensions": ["output_string"]
    });
  }
};

Blockly.Blocks['event_broadcast'] = {
  /**
   * Block to send a broadcast.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "event_broadcast",
      "message0": Blockly.Msg.EVENT_BROADCAST,
      "args0": [
        {
          "type": "input_value",
          "name": "BROADCAST_INPUT"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_statement"]
    });
  }
};

Blockly.Blocks['event_broadcastandwait'] = {
  /**
   * Block to send a broadcast.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.EVENT_BROADCASTANDWAIT,
      "args0": [
        {
          "type": "input_value",
          "name": "BROADCAST_INPUT"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_statement"]
    });
  }
};

Blockly.Blocks['event_whenkeypressed'] = {
  /**
   * Block to send a broadcast.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "event_whenkeypressed",
      "message0": Blockly.Msg.EVENT_WHENKEYPRESSED,
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
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};


/* ***********bell-blocks************* */

Blockly.Blocks['bell_event_whenflagclicked'] = {
  /**
   * Block for when flag clicked.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "bell_event_whenflagclicked",
      "message0": "当 %1 被点击",
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "play.png",
          "width": 24,
          "height": 24,
          "alt": "flag"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

// 当颜色传感器（1） [=>,=,<=] (1)
Blockly.Blocks['bell_event_color_type'] = {
  init: function () {
    this.jsonInit({
      "message0": "当颜色传感器 %1 = %2",
      "args0": [
        // {
        //   "type": "input_value",
        //   "name": "COLOR_NUM"
        // },
        {
          "type": "field_dialog",
          "name": "COLOR_NUM",
          "defaultValue": "1",
          "module": "color",
          "multiMode": false,
        },
        // {
        //   "type": "field_dropdown",
        //   "name": "COLOR",
        //   "options": [
        //     ['黑色', '1'],
        //     ['蓝色', '2'],
        //     ['绿色', '3'],
        //     ['黄色', '4'],
        //     ['红色', '5'],
        //     ['白色', '6'],
        //     ['紫色', '7'],
        //     ['橘黄色', '8'],
        //   ]
        // },
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
            ['橘黄色', '8']
          ]
        },
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
}

Blockly.Blocks.DETECT_GYRO_ANGLE_VAL_MINXIN = {
  onchange(e) {
    if(e.element === 'field') {
      const name = e.name;
      // 角度类型改变角度的范围也要改变
      if(name === 'DIRECTION') {

        const input = this.inputList[0];
        const fieldRow = input.fieldRow;

        const directionField = new Blockly.FieldDropdown(
          [
            ["俯仰角度", 'gyro_x'],
            ["旋转角度", 'gyro_y'],
            ["翻滚角度", 'gyro_z']
          ],
          undefined,
          fieldRow[1].getValue()
        );

        const computeField = new Blockly.FieldDropdown(
          [
            ['≤', 'LESS'],
            ['≥', 'GREATER']
          ],
          undefined,
          fieldRow[2].getValue()
        );

        let angleField;
        switch(fieldRow[1].getValue()) {
          case "gyro_x":
            angleField = new Blockly.FieldBellSpeedDialog(0, -90, 90);
            break;
          case "gyro_y":
            angleField = new Blockly.FieldBellSpeedDialog(0, -360, 360);
            break;
          case "gyro_z":
            angleField = new Blockly.FieldBellSpeedDialog(0, -180, 180);
            break;
        }

        this.appendDummyInput()
          .appendField('陀螺仪的')
          .appendField(directionField, 'DIRECTION')
          .appendField(computeField, 'COMPUTE')
          .appendField(angleField, 'ANGLE');

        Blockly.Events.fire(new Blockly.Events.BlockChange(this, 'field', 'ANGLE', fieldRow[3].getValue(), '0')); // 重置角度值
        input.dispose(); // 删除原来的行
        this.inputList.splice(0, 1);
        this.render();
      }
    }
  },

  mutationToDom() {
    return null;
  },
  domToMutation(element) {

  },
  decompose(workspace) {

  },
  compose() {

  }
}

// 当陀螺仪的[俯仰角度,翻滚角度,旋转角度] [=>,=,<=][0,0,20]
Blockly.Blocks['bell_event_gyro_angle'] = {
  init: function () {
    this.jsonInit({
      "message0": "当陀螺仪的 %1 %2 %3",
      "args0": [
        {
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
          "name": "JUDGE",
          "options": [
            ['≤', 'LESS'],
            ['≥', 'GREATER']
          ]
        },
        // {
        //   "type": "input_value",
        //   "name": "ANGLE",
        //   "defaultValue": "0",
        //   "min": '0',
        //   "max": '255'
        // },
        {
          "type": "field_speedBellDialog",
          "name": "ANGLE",
          "value": "0",
          "min": "-90",
          "max": "90"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"],
      "mutator": "bell_event_gyro_angle_mutator"
    });
  }
};

Blockly.Extensions.registerMutator('bell_event_gyro_angle_mutator', Blockly.Blocks.DETECT_GYRO_ANGLE_VAL_MINXIN, null, []);

// 当红外传感器（1） [=>,=,<=] 距离 [0,0,20]
Blockly.Blocks['bell_event_infrared_cm'] = {
  init: function () {
    this.jsonInit({
      "message0": "当红外传感器 %1 %2 距离 %3 cm",
      "args0": [
        // {
        //   "type": "input_value",
        //   "name": "INFRARED"
        // },
        {
          "type": "field_dialog",
          "name": "INFRARED",
          "defaultValue": "1",
          "module": "infrared",
          "multiMode": false,
        },
        {
          "type": "field_dropdown",
          "name": "JUDGE",
          "options": [
            ['≤', 'LESS'],
            ['≥', 'GREATER']
          ]
        },
        // {
        //   "type": "input_value",
        //   "name": "DISTANCE",
        // },
        {
          "type": "field_speedBellDialog",
          "name": "DISTANCE",
          "value": "5",
          "min": "5",
          "max": "15"
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
}

// 当触控球（1）的状态为 [按下，没按下]
Blockly.Blocks['bell_event_touch_press'] = {
  init: function () {
    this.jsonInit({
      "message0": "当触碰球 %1 的状态为 %2",
      "args0": [
        // {
        //   "type": "input_value",
        //   "name": "TOUCH"
        // },
        {
          "type": "field_dialog",
          "name": "TOUCH",
          "defaultValue": "1",
          "module": "touch",
          "multiMode": false,
        },
        {
          "type": "field_dropdown",
          "name": "TOUCHPRESS",
          "options": [
            ['按下', '1'],
            ["没按下", '0']
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
}



Blockly.Blocks['event_bell_mobile_shake'] = {
  // 当手机被摇晃
  init: function () {
    this.jsonInit({
      "message0": '当手机被摇晃',
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_bell_mobile_hear_sound'] = {
  //当手机听到声响
  init: function () {
    this.jsonInit({
      "message0": '当手机听到声响',
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_bell_mobile_tilt'] = {
  //当手机向 [上下左右] 倾斜
  init: function () {
    this.jsonInit({
      "message0": '当手机向 %1 倾斜',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DIRECTION",
          "options": [
            ['上', 'up'],
            ['下', 'down'],
            ['左', 'left'],
            ['右', 'right'],
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};

Blockly.Blocks['event_bell_finger_slide'] = {
  //当手机听到声响
  init: function () {
    this.jsonInit({
      "message0": '当手指向 %1 滑动',
      "args0": [
        {
          "type": "field_dropdown",
          "name": "DIRECTION",
          "options": [
            ['上', 'up'],
            ['下', 'down'],
            ['左', 'left'],
            ['右', 'right'],
          ]
        }
      ],
      "category": Blockly.Categories.event,
      "extensions": ["colours_event", "shape_hat"]
    });
  }
};
