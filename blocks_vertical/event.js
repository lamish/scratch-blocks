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

// 当颜色传感器（1） [=>,=,<=] (1)
Blockly.Blocks['bell_event_color_type'] = {
    init: function(){
        this.jsonInit({
            "message0": "当颜色传感器 %1 = %2",
            "args0": [
                {
                    "type": "input_value",
                    "name": "COLOR_NUM"
                },
                // {
                //     "type": "field_dropdown",
                //     "name": "DISTANCE",
                //     "options": [
                //         ['=', 'TIMER'],
                //     ]
                // },
                {
                    "type": "field_dropdown",
                    "name": "COLOR",
                    "options": [
                        ['红色', '1'],
                        ['绿色', '2'],
                        ['黄色', '3'],
                        ['蓝色', '4'],
                        ['紫色', '5'],
                        ['青色', '6'],
                        ['橙色', '7'],
                        ['白色', '8'],
                    ]
                },
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
}

// 当陀螺仪的[俯仰角度,翻滚角度,旋转角度] [=>,=,<=][0,0,20]
Blockly.Blocks['bell_event_gyro_cm'] = {
    init: function(){
        this.jsonInit({
            "message0": "当陀螺仪的 %1 %2 %3",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "GYRO",
                    "options": [
                        ["俯仰角度", '1'],
                        ["翻滚角度", '2'],
                        ["旋转角度", '3']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "JUDGE",
                    "options": [
                        ['=>', '1'],
                        ['=', '2'],
                        ['<=', '0']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "DISTANCE",
                    "min": '0',
                    "max": '255'
                },
            ],
            "category": Blockly.Categories.event,
            "extensions": ["colours_event", "shape_hat"]
        });
    }
}

// 当红外传感器（1） [=>,=,<=] 距离 [0,0,20]
Blockly.Blocks['bell_event_infrared_cm'] = {
    init: function(){
        this.jsonInit({
            "message0": "当红外传感器 %1 %2 距离 %3",
            "args0": [
                {
                    "type": "input_value",
                    "name": "INFRARED"
                },
                {
                    "type": "field_dropdown",
                    "name": "JUDGE",
                    "options": [
                        ['=>', '1'],
                        ['=', '2'],
                        ['<=', '0']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "DISTANCE",
                },
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
                {
                    "type": "input_value",
                    "name": "TOUCH"
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
            "message0": Blockly.Msg.EVENT_WHENFLAGCLICKED,
            "args0": [
                {
                    "type": "field_image",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "green-flag.svg",
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
