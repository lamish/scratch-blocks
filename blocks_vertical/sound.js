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

goog.provide('Blockly.Blocks.sound');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

// 停止蜂鸣
Blockly.Blocks['bell_light_closed_buzzer'] = {
    init: function () {
        this.jsonInit({
            "message0": "停止蜂鸣",
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"],
        });
    }
}

// 播放蜂鸣器, 音调 [高,中,低], 音阶[1,2,...,9], 持续（2）秒, 是否阻断
Blockly.Blocks['bell_light_play_buzzer_concurrence'] = {
    init: function () {
        this.jsonInit({
            "message0": "播放蜂鸣器, 音调%1, 音阶%2, 持续%3秒, %4",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "TONE",
                    "options": [
                        ["高", '1'],
                        ["中", '2'],
                        ["低", '3']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "VOLUME",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "SECONDS",
                },
                {
                    "type": "field_image",
                    "name": "BLOCK",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "green-flag.svg",
                    "width": 24,
                    "height": 24,
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"],
        });
    }
}

// 播放蜂鸣器, 音调 [高,中,低], 音阶[1,2,...,9]
Blockly.Blocks['bell_light_play_buzzer'] = {
    init: function () {
        this.jsonInit({
            "message0": "播放蜂鸣器, 音调%1, 音阶%2",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "TONE",
                    "options": [
                        ["高", '1'],
                        ["中", '2'],
                        ["低", '3']
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "VOLUME",
                    "options": [
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9'],
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"],
        });
    }
}

// 主控驱动球(1) 灯光关闭
Blockly.Blocks['bell_light_closed'] = {
    init: function () {
        this.jsonInit({
            "message0": "%1 灯光关闭",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "CENTER",
                    "options": [
                        ['主控', '_main_control_'],
                        ['驱动球', '_motor_ball_']
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"],
        });
    }
}

// 设置 主控驱动球(1) 灯光颜色为 [R][G][B],  模式为[呼吸,渐变,变化], 持续（2）秒, 是否阻断
Blockly.Blocks['bell_light_color_rgb_concurrence'] = {
    shouldCreateMultiRow: true,
    init: function () {
        this.jsonInit({
            "message0": "设置 %1 灯光颜色为 %2 , 模式为 %3 , 持续 %4 秒, %5",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "CENTER",
                    "options": [
                        ['主控', '_main_control_'],
                        ['驱动球', '_motor_ball_'],
                        ['主控和驱动球', '_both_'],
                    ]
                },
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
                {
                    "type": "field_dropdown",
                    "name": "MODE",
                    "options": [
                        ['熄灭', '1'],
                        ['常亮', '2'],
                        ['闪烁', '3'],
                        ['呼吸', '4'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "SECONDS",
                },
                {
                    "type": "field_image",
                    "name": "BLOCK",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "green-flag.svg",
                    "width": 24,
                    "height": 24,
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"],
        });
    }
}

// 设置 主控驱动球(1) 灯光颜色为 [R][G][B],  模式为[呼吸,渐变,变化]
Blockly.Blocks['bell_light_color_rgb'] = {
    init: function () {
        this.jsonInit({
            "message0": "设置 %1 灯光颜色为 %2, 模式为 %3",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "CENTER",
                    "options": [
                        ['主控', '_main_control_'],
                        ['驱动球', '_motor_ball_'],
                        ['主控和驱动球', '_both_'],
                    ]
                },
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
                {
                    "type": "field_dropdown",
                    "name": "MODE",
                    "options": [
                        ['熄灭', '1'],
                        ['常亮', '2'],
                        ['闪烁', '3'],
                        ['呼吸', '4'],
                    ]
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"],
        });
    }
}

// 设置 主控 or 驱动球(1)灯光颜色为 [颜色],  模式为[呼吸,渐变,变化], 持续（2）秒, 是否阻断
Blockly.Blocks['bell_light_color_mode_concurrence'] = {
    init: function () {
        this.jsonInit({
            "message0": "设置 %1 灯光颜色为 %2 , 模式为 %3, 持续%4 %5",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "CENTER",
                    "options": [
                        ['主控', '_main_control_'],
                        ['驱动球', '_motor_ball_'],
                        ['主控和驱动球', '_both_'],
                    ]
                },
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
                {
                    "type": "field_dropdown",
                    "name": "MODE",
                    "options": [
                        ['熄灭', '1'],
                        ['常亮', '2'],
                        ['闪烁', '3'],
                        ['呼吸', '4'],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "SECONDS",
                },
                {
                    "type": "field_image",
                    "name": "BLOCK",
                    "src": Blockly.mainWorkspace.options.pathToMedia + "green-flag.svg",
                    "width": 24,
                    "height": 24,
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
}

// 主控 or 驱动球(1) 灯光颜色为 [颜色],  模式为[呼吸,渐变,变化]
Blockly.Blocks['sound_mabot_set_all_lights_to_one_mode'] = {
    init: function () {
        this.jsonInit({
            "message0": "set light color of %1 to %2, mode %3",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "target_light",
                    "options": [
                        ['主控', '_main_control_'],
                        ['驱动球', '_motor_ball_'],
                        ['主控和驱动球', '_both_'],
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "light_color",
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
                {
                    "type": "field_dropdown",
                    "name": "light_mode",
                    "options": [
                        ['熄灭', '1'],
                        ['常亮', '2'],
                        ['闪烁', '3'],
                        ['呼吸', '4'],
                    ]
                }
            ],
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_sounds_menu'] = {
    /**
     * Sound effects drop-down menu.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": "%1",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "SOUND_MENU",
                    "options": [
                        ['1', '0'],
                        ['2', '1'],
                        ['3', '2'],
                        ['4', '3'],
                        ['5', '4'],
                        ['6', '5'],
                        ['7', '6'],
                        ['8', '7'],
                        ['9', '8'],
                        ['10', '9'],
                        ['call a function', function () {
                            window.alert('function called!');
                        }
                        ]
                    ]
                }
            ],
            "colour": Blockly.Colours.sounds.secondary,
            "colourSecondary": Blockly.Colours.sounds.secondary,
            "colourTertiary": Blockly.Colours.sounds.tertiary,
            "extensions": ["output_string"]
        });
    }
};

Blockly.Blocks['sound_play'] = {
    /**
     * Block to play sound.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.SOUND_PLAY,
            "args0": [
                {
                    "type": "input_value",
                    "name": "SOUND_MENU"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_playuntildone'] = {
    /**
     * Block to play sound until done.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.SOUND_PLAYUNTILDONE,
            "args0": [
                {
                    "type": "input_value",
                    "name": "SOUND_MENU"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_stopallsounds'] = {
    /**
     * Block to stop all sounds
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.SOUND_STOPALLSOUNDS,
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_seteffectto'] = {
    /**
     * Block to set the audio effect
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.SOUND_SETEFFECTO,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "EFFECT",
                    "options": [
                        [Blockly.Msg.SOUND_EFFECTS_PITCH, 'PITCH'],
                        [Blockly.Msg.SOUND_EFFECTS_PAN, 'PAN']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};


Blockly.Blocks['sound_changeeffectby'] = {
    /**
     * Block to change the audio effect
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.SOUND_CHANGEEFFECTBY,
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "EFFECT",
                    "options": [
                        [Blockly.Msg.SOUND_EFFECTS_PITCH, 'PITCH'],
                        [Blockly.Msg.SOUND_EFFECTS_PAN, 'PAN']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "VALUE"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_cleareffects'] = {
    /**
     * Block to clear audio effects
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.SOUND_CLEAREFFECTS,
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_changevolumeby'] = {
    /**
     * Block to change the sprite's volume by a certain value
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.SOUND_CHANGEVOLUMEBY,
            "args0": [
                {
                    "type": "input_value",
                    "name": "VOLUME"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_setvolumeto'] = {
    /**
     * Block to set the sprite's volume to a certain percent
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.SOUND_SETVOLUMETO,
            "args0": [
                {
                    "type": "input_value",
                    "name": "VOLUME"
                }
            ],
            "category": Blockly.Categories.sound,
            "extensions": ["colours_sounds", "shape_statement"]
        });
    }
};

Blockly.Blocks['sound_volume'] = {
    /**
     * Block to report volume
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            "message0": Blockly.Msg.SOUND_VOLUME,
            "category": Blockly.Categories.sound,
            "checkboxInFlyout": true,
            "extensions": ["colours_sounds", "output_number"]
        });
    }
};
