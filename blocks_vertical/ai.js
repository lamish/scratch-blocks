'use strict';

goog.provide('Blockly.Blocks.ai');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['ai_voice_recognize'] = {
    init: function () {
        this.jsonInit({
            "message0": " %1 开始 %2 语音识别，持续 %3 s",
            "args0": [
                {
                    "type": "field_clockwise_image",
                    "name": "microphone",
                    "src": Blockly.utils.getRuntimeImagePath('/dialogs/clockwise/onebyone.png'),
                    "width": 24,
                    "height": 24,
                },
                {
                    "type": "field_dropdown",
                    "name": "language",
                    "options": [
                        ["中文", '_chinese_'],
                        ["English", '_english_']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "SECS"
                },
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['ai_voice_recognize_result'] = {
    init: function () {
        this.jsonInit({
            "message0": "语音识别结果",
            "checkboxInFlyout": true,
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "output_number"]
        });
    }
};

Blockly.Blocks['ai_voice_synthesis'] = {
    init: function () {
        this.jsonInit({
            "message0": "朗读 %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "CONTENT"
                },
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};

Blockly.Blocks['ai_voice_synthesis_set_voice_type'] = {
    init: function () {
        this.jsonInit({
            "message0": "使用 %1 朗读 %2",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "TONE",
                    "options": [
                        ["中音", '_middlePitch_'],
                        ["高音", '_highPitch_']
                    ]
                },
                {
                    "type": "input_value",
                    "name": "CONTENT"
                },
            ],
            "category": Blockly.Categories.looks,
            "extensions": ["colours_looks", "shape_statement"]
        });
    }
};
