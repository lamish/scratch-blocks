'use strict';

goog.provide('Blockly.FieldBellClockwiseDialog');
goog.require('Blockly.FieldDropdown');

// [顺时针, 逆时针]
Blockly.FieldClockwiseDialog = function(value){
    // FieldDropdown 的 <menuGenerator> 是要传的 option （数组和函数） 
    Blockly.FieldClockwiseDialog.superClass_.constructor.call(this, [
      [ '0', '0' ],
      [ '1', '1' ],
    ]);
    this.setValue(value);

}

goog.inherits(Blockly.FieldClockwiseDialog, Blockly.FieldDropdown);

Blockly.FieldClockwiseDialog.fromJson = function(element) {
    return new Blockly.FieldClockwiseDialog(element.value);
};

Blockly.FieldClockwiseDialog.prototype.showEditor_ = function() {
    const value = this.getValue();
    console.log(value);

    const container = document.createElement('div');

    container.className = "bell_clock_wise_dialog_wrapper";

    const str = `
        <div class="item">
            <img src="${Blockly.mainWorkspace.options.pathToMedia + "bell/dialogs/clockwise/onebyone.png"}" />
            <p>执行完当前语句块再执行下一个语句块</p>
        </div>
        <div class="item">
            <img src="${Blockly.mainWorkspace.options.pathToMedia + "bell/dialogs/clockwise/simultaneously.png"}" />
            <p>当前语句块与下一个语句块同时执行</p>
        </div>
    `;

    container.innerHTML = str;

    const childDivs = container.getElementsByTagName('div');

    if(+value === 0) {
        childDivs[0].classList.add('active');
    }else{
        childDivs[1].classList.add('active');
    }


    Blockly.bindEvent_(childDivs[0], 'click', null, (e) => {
        this.setValue(0);
        Blockly.DialogDiv.hide();
    });
    Blockly.bindEvent_(childDivs[1], 'click', null, (e) => {
        this.setValue(1);
        Blockly.DialogDiv.hide();
    });

    Blockly.DialogDiv.show(container, () => {
        Blockly.unbindEvent_(childDivs[0]);
        Blockly.unbindEvent_(childDivs[1]);
    });
};
  
Blockly.Field.register('field_clockwise', Blockly.FieldClockwiseDialog);