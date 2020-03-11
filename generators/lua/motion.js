goog.provide('Blockly.Lua.motion');

goog.require('Blockly.Lua');

Blockly.Lua['motion_motorBall_rotate_on_power_for_seconds'] = function(block) {
    let code = '';
     // 功率0-100 要转换成35-100， 因为功率太小驱动球不转
     const mapPower = (power) => {
        power = parseFloat(power);
        return Math.floor(power * 0.65) + 35;
    }
   
    const ballIndex = block.getFieldValue('mabot_motor_ball_index');
    const direction = block.getFieldValue('rotate_direction');
    const power = block.getFieldValue('power');
    const seconds = block.getFieldValue('rotate_for_seconds');
    const blocked = block.getFieldValue('BLOCK').indexOf('onebyone.png') > -1 ? true : false; // 是否同步执行
    const models = [];
    // 插入第一条
    models.push({
        seq: ballIndex,
        clockwise: direction,
        power: mapPower(power),
        seconds
    });
    console.log('block', block)

    if(block.inputList.length > 1) {
        // 驱动球多选
        for(let i = 1, len = block.inputList.length; i < len; i++) {
            const seq = block.getFieldValue('mabot_motor_ball_index' + i);
            const clockwise = block.getFieldValue('rotate_direction' + i);
            const power = block.getFieldValue('power' + i);
            const seconds = block.getFieldValue('rotate_for_seconds' + i);
            models.push({
                seq,
                clockwise,
                power: mapPower(power),
                seconds
            });
        }
    }
    console.log('models', models)
    
    let waitSec = 0;

    for (let i = 0, len = models.length; i < len; i++) {
        let seq = models[i].seq;
        let power = models[i].power;
        let seconds = models[i].seconds;
        waitSec = Math.max(waitSec, parseInt(seconds));
        if (models[i].clockwise == '_counterclockwise_') {
            power = -power;
        }
        code += 'Motor_Run_A_While(' + seq + ', ' + power + ', ' + seconds + ')\n';
    }

    if (blocked) code += `r_Delay(${waitSec})\n`;


    return code;
}