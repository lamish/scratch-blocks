'use strict';

goog.provide('Blockly.FieldModuleDialog');
goog.require('Blockly.Field');
goog.require('Blockly.FieldDropdown');

// 外形borrow自scratch-blocks中的field_dropdown
Blockly.FieldModuleDialog = function (defaultValue, module, multiMode, defaultText) {
  Blockly.FieldModuleDialog.superClass_.constructor.call(this, [['1', '1']],
    null);
  this.setValue(defaultValue || "1");
  if(defaultText) {
    this.setText(defaultText);
  }
  this.module_ = module;
  this.isMultiMode_ = multiMode;
  if (Blockly.FieldModuleDialog.MODULE_LIST.indexOf(module) < 0) {
    throw 'Unknown module: ' + module;
  }
};
goog.inherits(Blockly.FieldModuleDialog, Blockly.FieldDropdown);

Blockly.FieldModuleDialog.fromJson = function (element) {
  console.log(`element`, element)
  return new Blockly.FieldModuleDialog(element.defaultValue,
    element.module, element.multiMode, element.defaultText);
};

Blockly.FieldModuleDialog.MODULE_MC = 'mc';
Blockly.FieldModuleDialog.MODULE_BATTERY = 'battery';
Blockly.FieldModuleDialog.MODULE_MOTOR = 'motor';
Blockly.FieldModuleDialog.MODULE_WAIST_JOINT = 'waist_joint';
Blockly.FieldModuleDialog.MODULE_ARM_JOINT = 'arm_joint';
Blockly.FieldModuleDialog.MODULE_TOUCH = 'touch';
Blockly.FieldModuleDialog.MODULE_COLOR = 'color';
Blockly.FieldModuleDialog.MODULE_INFRARED = 'infrared';
Blockly.FieldModuleDialog.MODULE_MAIN_AND_MOTOR = 'main_and_motor';

Blockly.FieldModuleDialog.MODULE_LIST = [
  // Blockly.FieldModuleDialog.MODULE_MC, // 主控
  // Blockly.FieldModuleDialog.MODULE_BATTERY, // 电池
  Blockly.FieldModuleDialog.MODULE_MOTOR, // 电机(驱动球)
  Blockly.FieldModuleDialog.MODULE_WAIST_JOINT, // 舵机(水平关节, 旋转关节)
  Blockly.FieldModuleDialog.MODULE_ARM_JOINT, // 舵机(摇摆关节)
  // sensors
  Blockly.FieldModuleDialog.MODULE_TOUCH, // 触碰
  Blockly.FieldModuleDialog.MODULE_COLOR, // 颜色
  Blockly.FieldModuleDialog.MODULE_INFRARED, // 红外
  //
  Blockly.FieldModuleDialog.MODULE_MAIN_AND_MOTOR // 主控和驱动球
];

Blockly.FieldModuleDialog.prototype.module_ = null;
Blockly.FieldModuleDialog.prototype.isMultiMode_ = false;

Blockly.FieldModuleDialog.prototype.setValue = function(newValue) {
  if (newValue === null || newValue === this.value_) {
    return;  // No change if null.
  }
  if (this.sourceBlock_ && Blockly.Events.isEnabled()) {
    Blockly.Events.fire(new Blockly.Events.BlockChange(
        this.sourceBlock_, 'field', this.name, this.value_, newValue));
  }
  // Clear menu item for old value.
  if (this.selectedItem) {
    this.selectedItem.setChecked(false);
    this.selectedItem = null;
  }
  this.value_ = newValue;
  // Look up and display the human-readable text.
  var options = this.getOptions();
  for (var i = 0; i < options.length; i++) {
    // Options are tuples of human-readable text and language-neutral values.
    if (options[i][1] == newValue) {
      var content = options[i][0];
      if (typeof content == 'object') {
        this.imageJson_ = content;
        this.text_ = content.alt;
      } else {
        this.imageJson_ = null;
        this.text_ = content;
      }
      // Always rerender if either the value or the text has changed.
      this.forceRerender();
      return;
    }
  }
  // Value not found.  Add it, maybe it will become valid once set
  // (like variable names).
  if(newValue.indexOf('#') > -1) {
    let text = '';
    const textArr = newValue.split('#');
    if(textArr[0]) {
      text += `主控球${textArr[0]}`;
    }
    if(textArr[1]) {
      text += ` 驱动球${textArr[1]}`;
    }
    this.text_ = text;
  } else {
    this.text_ = newValue;
  }
  
  this.forceRerender();
}

Blockly.FieldModuleDialog.prototype.showEditor_ = function () {
  // Update colour to look selected.
  if (!this.disableColourChange_) {
    if (this.sourceBlock_.isShadow()) {
      this.sourceBlock_.setShadowColour(this.sourceBlock_.getColourTertiary());
    } else if (this.box_) {
      this.box_.setAttribute('fill', this.sourceBlock_.getColourTertiary());
    }
  }

  var sourceBlock = this.sourceBlock_;
  console.log(`sourceBlock`, sourceBlock)
  var value; // 2,4,5
  var moreValue; // decompose
  var oldMutationDom;
  var oldMutation;
  // 3种情况：   NOTE 多行 必须要用mutator，单选不要
  // 1. 多行多选
  // 2. 单行多选
  // 3. 单行单选
  if (!!sourceBlock.decompose) { // 1.
    value = this.getValue();
    moreValue = sourceBlock.decompose();
    oldMutationDom = sourceBlock.mutationToDom();
    oldMutation = oldMutationDom && Blockly.Xml.domToText(oldMutationDom);
  } else if (this.isMultiMode_) { // 2.

    if(this.getValue().indexOf('#') > -1) {

      moreValue = this.getValue(); // 直接传字符串
      const temp = moreValue.split('#');
      const tempArr1 = temp[0].replace(/\s/g, "").split(',');
      const tempArr2 = temp[1].replace(/\s/g, "").split(',');
      value = tempArr1[tempArr1.length - 1] +'#' + tempArr2[tempArr2.length - 1];
      
    } else {
      moreValue = this.getValue().split(', ');
      value = moreValue[moreValue.length - 1];
    }
    
  } else if (!this.isMultiMode_) { // 3.
    moreValue = [this.getValue()];
    value = this.getValue();
  } else {
    // ignore
  }

  // 根据不同module显示不同的dialogs
  // 此外，还需指定是否多选模式，当前焦点位置
  var dialogData = Blockly.Dialogs.generateModuleDialog(this.module_,
    moreValue, this.isMultiMode_, value,/*onChange*/
    function (newBallList, mBallList) { // [ '3' ]
      if (sourceBlock.compose) {
        // compose like mutators
        sourceBlock.compose(newBallList);
        // fire that the mutation has changed
        var newMutationDom = sourceBlock.mutationToDom();
        var newMutation = newMutationDom && Blockly.Xml.domToText(newMutationDom);
        if (oldMutation != newMutation) {
          Blockly.Events.fire(new Blockly.Events.BlockChange(sourceBlock,
            'mutation', null, oldMutation, newMutation));
        }
      } else {
        if (me.isMultiMode_) {
          if(!mBallList) {
            me.setValue(newBallList.join(', '));
          }else{
            // 有传入mBallList的情况
            let text = '';

            if(mBallList.length) {
              text += `主控球${mBallList.join(', ')}`;
            }

            if(newBallList.length) {
              text += ` 驱动球${newBallList.join(', ')}`;
            }

            let value = `${mBallList.join(', ')}#${newBallList.join(', ')}`;

            me.setValue(value)
            me.setText(text);
            Blockly.Dialogs.canBallCancel = null;
          }
        } else {
          me.setValue(newBallList[0]);
        }
      }
    }
  );
  var me = this;
  Blockly.DialogDiv.show(dialogData.dom, function () {
    if (dialogData.eventWrappers && dialogData.eventWrappers.length) {
      for (var i = 0, eventWrapper; eventWrapper = dialogData.eventWrappers[i]; i++) {
        Blockly.unbindEvent_(eventWrapper);
      }
    }
    if (dialogData.onHide) dialogData.onHide();
    me.onHide();
  });
};

Blockly.Field.register('field_dialog', Blockly.FieldModuleDialog);
