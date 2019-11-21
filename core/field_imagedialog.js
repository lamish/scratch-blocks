'use strict';

goog.provide('Blockly.FieldImageDialog');
goog.require('Blockly.Field');
goog.require('Blockly.FieldImage');

/**
 * 阻塞和非阻塞
 */
// 外形borrow自scratch-blocks中的field_image
Blockly.FieldImageDialog = function (src, width, height) {
    // 通过构造函数 传递参数
    Blockly.FieldImageDialog.superClass_.constructor.call(this, src, width, height);
    this.setValue(src);
};

goog.inherits(Blockly.FieldImageDialog, Blockly.FieldImage); // 继承image

Blockly.FieldImageDialog.fromJson = function (element) {
    return new Blockly.FieldImageDialog(element.src, element.width, element.height);
};

// 保存变量
Blockly.FieldImageDialog.prototype._defaultCurrent = 0; // 当前选中模式 0为阻塞，1为非阻塞

/**
 * 因为field_image 没有绑定事件
 * 所以我们通过prototype 在 init 函数中给  this.imageElement_ 绑定事件
 */
Blockly.FieldImageDialog.prototype.init = function () {
    Blockly.FieldImageDialog.superClass_.init.call(this);
    Blockly.bindEvent_(this.imageElement_, 'mouseup', this, function (e) {
        e.stopPropagation();    
        this.showEditor_();
    });

    Blockly.bindEvent_(this.imageElement_, 'touchstart', this, function (e) {
        e.stopPropagation();
    });
};

Blockly.FieldImageDialog.prototype.dispose = function () {
    Blockly.FieldImageDialog.superClass_.init.call(this);
    Blockly.unbindEvent_(this.imageElement_);
}

Blockly.FieldImageDialog.prototype.showEditor_ = function () {
    var value = this.getValue();
    var me = this;
    var dialogData = Blockly.Dialogs.generateModuleBlockDialog(value,
        function (value, current) {
            me.setValue(value);
            me._defaultCurrent = current;
        },
        this._defaultCurrent
    );
    Blockly.DialogDiv.show(dialogData.dom, function () {
        if (dialogData.eventWrappers && dialogData.eventWrappers.length) {
            for (var i = 0, eventWrapper; eventWrapper = dialogData.eventWrappers[i]; i++) {
                Blockly.unbindEvent_(eventWrapper);
            }
        }
        if (dialogData.onHide) dialogData.onHide();
        //   me.onHide();
    });
};


Blockly.Field.register('field_clockwise_image', Blockly.FieldImageDialog);
