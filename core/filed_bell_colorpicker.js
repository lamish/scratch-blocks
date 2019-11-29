'use strict';

goog.provide('Blockly.FieldBellColorPickerDialog');
goog.require('Blockly.FieldDropdown');

const colorsMap = {
    '黑色': "#000",
    "蓝色": "#4d9edc",
    "绿色": "#0eef53",
    "黄色": "#f6f550",
    "红色": "#f45d5d",
    "白色": "#fff",
    "紫色": "#d451f8",
    "橙色": "#f29450",
    "青色": "#07edfb",
    "橘黄色": "#f29450"
}

const defaultColorsList = [
    ['黑色', '1'],
    ['蓝色', '2'],
    ['绿色', '3'],
    ['黄色', '4'],
    ['红色', '5'],
    ['白色', '6'],
    ['紫色', '7'],
    ['橘黄色', '8'],
]

Blockly.FieldColorPickerDialog = function(value, options){
    options = options || defaultColorsList
    console.log(value, options)
    // FieldDropdown 的 <menuGenerator> 是要传的 option （数组和函数） 
    Blockly.FieldColorPickerDialog.superClass_.constructor.call(this, options);
    this.setValue(value);
    this.colorsList = options;
}

goog.inherits(Blockly.FieldColorPickerDialog, Blockly.FieldDropdown);

Blockly.FieldColorPickerDialog.fromJson = function(element) {
    return new Blockly.FieldColorPickerDialog(element.value, element.options);
};

Blockly.FieldColorPickerDialog.prototype.showEditor_ = async function() {
    const value = this.getValue();
  
    const container = document.createElement('ul');

    container.className = "bell_color_picker_wrapper";

    const str = `
       <li class="bell_color_picker_item"></li>
       <li class="bell_color_picker_item"></li>
       <li class="bell_color_picker_item"></li>
       <li class="bell_color_picker_item"></li>
       <li class="bell_color_picker_item"></li>
       <li class="bell_color_picker_item"></li>
       <li class="bell_color_picker_item"></li>
       <li class="bell_color_picker_item"></li>
    `;

    container.innerHTML = str;

    const handleClick = (e) => {
        const target = e.target;
        this.setValue(target.dataset.value);
        Blockly.DialogDiv.hide();
    }

    Blockly.DialogDiv.show(container, () => {
        // Blockly.unbindEvent_(container)
        container.removeEventListener('touchstart', handleClick);
        container.removeEventListener('click', handleClick);
    });

    const childs = container.getElementsByTagName('li');
    const childLi = Array.prototype.slice.call(childs, 0);

    const width = await this.domMounted(container); // 等获取到宽度再执行后面操作

    container.style.height = width * (700 / 1100) + 'px';
    
    childLi.forEach((li, index) => {
        const v = index+1
        if( v === +value) {
            li.classList.add('active');
        }
        const key = this.colorsList[index][0];
        if(colorsMap[key] === "#000") {
            // 如果背景是黑色则把√的颜色设为白色，否则看不见
            li.classList.add('select-color');
        }
        li.style.background = colorsMap[key];
        li.dataset.value = v;
    });

    
    /* window.addEventListener('resize', e => {
        this.showEditor_()
    }); */
    container.addEventListener('touchstart', handleClick, false);
    container.addEventListener('click', handleClick, false);

   
};

Blockly.FieldColorPickerDialog.prototype.domMounted = function(dom) {
   
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if(dom && dom.offsetWidth) {
                resolve(dom.offsetWidth);
            }else{
                reject(null)
            }
        }, 0);
    });
    return promise;
} 

Blockly.Field.register('field_colorpicker', Blockly.FieldColorPickerDialog);