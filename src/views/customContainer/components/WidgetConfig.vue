<template>
  <div v-if="show">
    <el-form
            label-position="top"
            v-if="!(['personSelect','noticeSelect','orgSelect','allSelect'].includes(data.type))"
    >
      <el-form-item label="标题" v-if="data.type!='grid' && data.type!='div' && data.type!='tabs' && data.type!='steps'">
        <el-input v-model="data.name" :class="{'input-verified-error': isNameEmpty}" @blur="handleNameBlur(data.name)"></el-input>
      </el-form-item>
      <el-form-item label="宽度" v-if="Object.keys(data.options).indexOf('width')>=0">
        <el-input v-model="data.options.width"></el-input>
      </el-form-item>

      <el-form-item label="高度" v-if="Object.keys(data.options).indexOf('height')>=0">
        <el-input v-model="data.options.height"></el-input>
      </el-form-item>
      <el-form-item label="最低高度" v-if="Object.keys(data.options).indexOf('minHeight')>=0">
        <el-input v-model="data.options.minHeight"></el-input>
      </el-form-item>

      <el-form-item label="文本内容" v-if="data.type == 'onlyReadText'">
        <el-input v-model="data.options.textValue" type="textarea" :rows="5"></el-input>
      </el-form-item>

      <el-form-item label="大小" v-if="Object.keys(data.options).indexOf('size')>=0">
        宽度：
        <el-input style="width: 90px;" type="number" v-model.number="data.options.size.width"></el-input>高度：
        <el-input style="width: 90px;" type="number" v-model.number="data.options.size.height"></el-input>
      </el-form-item>

      <el-form-item label="占位内容" v-if="Object.keys(data.options).indexOf('placeholder')>=0 && (data.type!='time' || data.type!='date')">
        <el-input v-model="data.options.placeholder"></el-input>
      </el-form-item>
      <el-form-item label="布局方式" v-if="Object.keys(data.options).indexOf('inline')>=0">
        <el-radio-group v-model="data.options.inline">
          <el-radio-button :label="false">块级</el-radio-button>
          <el-radio-button :label="true">行内</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示输入框" v-if="Object.keys(data.options).indexOf('showInput')>=0">
        <el-switch v-model="data.options.showInput"></el-switch>
      </el-form-item>
      <el-form-item label="最小值" v-if="Object.keys(data.options).indexOf('min')>=0">
        <el-input-number v-model="data.options.min" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="最大值" v-if="Object.keys(data.options).indexOf('max')>=0">
        <el-input-number v-model="data.options.max" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="步长" v-if="Object.keys(data.options).indexOf('step')>=0">
        <el-input-number v-model="data.options.step" :min="0" :max="100" :step="1"></el-input-number>
      </el-form-item>
      <el-form-item label="是否多选" v-if="data.type=='select' || data.type=='imgupload'">
        <el-switch v-model="data.options.multiple" @change="handleSelectMuliple"></el-switch>
      </el-form-item>
      <el-form-item label="是否可搜索" v-if="data.type=='select'">
        <el-switch v-model="data.options.filterable"></el-switch>
      </el-form-item>
      <el-form-item label="允许半选" v-if="Object.keys(data.options).indexOf('allowHalf')>=0">
        <el-switch v-model="data.options.allowHalf"></el-switch>
      </el-form-item>
      <el-form-item label="支持透明度选择" v-if="Object.keys(data.options).indexOf('showAlpha')>=0">
        <el-switch v-model="data.options.showAlpha"></el-switch>
      </el-form-item>
      <el-form-item label="是否显示标签" v-if="Object.keys(data.options).indexOf('showLabel')>=0">
        <el-switch v-model="data.options.showLabel"></el-switch>
      </el-form-item>
      <el-form-item label="是否作为审批变量" v-if="Object.keys(data.options).indexOf('isWfCondition')>=0">
        <el-switch v-model="data.options.isWfCondition"></el-switch>
      </el-form-item>
      <el-form-item label="选项" v-if="Object.keys(data.options).indexOf('options')>=0">
        <el-radio-group v-model="data.options.remote" size="mini" style="margin-bottom:10px;">
          <el-radio-button :label="false">静态数据</el-radio-button>
          <el-radio-button :label="true">远端数据</el-radio-button>
        </el-radio-group>
        <template v-if="data.options.remote">
          <div>
            <el-input size="mini" style v-model="data.options.remoteUrl">
              <template slot="prepend">请求地址</template>
            </el-input>
            <el-input size="mini" style v-model="data.options.props.value">
              <template slot="prepend">值</template>
            </el-input>
            <el-input size="mini" style v-model="data.options.props.label">
              <template slot="prepend">标签</template>
            </el-input>
          </div>
        </template>

        <template v-else>
          <template
                  v-if="data.type=='radio' || ((data.type=='select'&& !data.options.multiple) || (data.type == 'personSelect' && !data.options.multiple))"
          >
            <el-radio-group v-model="data.options.defaultValue">
              <draggable tag="ul" :list="data.options.options"
                         v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                         handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index" style="line-height:40px;" >
                  <el-radio
                          :label="item.value"
                          style="margin-right: 5px;"
                  >
                    <el-input :style="{'width': data.options.showLabel? '90px': '180px' }" size="mini" v-model="item.value"></el-input>
                    <el-input style="width:90px;" size="mini" v-if="data.options.showLabel" v-model="item.label"></el-input>
                    <!-- <input v-model="item.value"/> -->
                  </el-radio>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>

            </el-radio-group>
          </template>

          <template v-if="data.type=='checkbox' || (data.type=='select' && data.options.multiple)">
            <el-checkbox-group v-model="data.options.defaultValue">

              <draggable tag="ul" :list="data.options.options"
                         v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                         handle=".drag-item"
              >
                <li v-for="(item, index) in data.options.options" :key="index">
                  <el-checkbox :label="item.value" style="margin-right: 5px;">
                    <el-input
                            :style="{'width': data.options.showLabel? '90px': '180px' }"
                            size="mini"
                            v-model="item.value"
                    ></el-input>
                    <el-input
                            style="width:90px;"
                            size="mini"
                            v-if="data.options.showLabel"
                            v-model="item.label"
                    ></el-input>
                  </el-checkbox>
                  <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
                  <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

                </li>
              </draggable>
            </el-checkbox-group>
          </template>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddOption">添加选项</el-button>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="远端数据" v-if="data.type=='cascader'">
        <div>
          <el-input size="mini" style v-model="data.options.remoteUrl">
            <template slot="prepend">请求地址</template>
          </el-input>
          <el-input size="mini" style v-model="data.options.props.value">
            <template slot="prepend">值</template>
          </el-input>
          <el-input size="mini" style v-model="data.options.props.label">
            <template slot="prepend">标签</template>
          </el-input>
          <el-input size="mini" style v-model="data.options.props.children">
            <template slot="prepend">子选项</template>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item
              label="默认值"
              v-if="Object.keys(data.options).indexOf('defaultValue')>=0 && (data.type == 'textarea' || data.type == 'input' || data.type=='rate' || data.type=='color' || data.type=='switch')"
      >
        <el-input
                v-if="data.type=='textarea'"
                type="textarea"
                :rows="5"
                v-model="data.options.defaultValue"
        ></el-input>
        <el-input v-if="data.type=='input'" v-model="data.options.defaultValue"></el-input>
        <el-rate v-if="data.type == 'rate'" style="display:inline-block;vertical-align: middle;" :max="data.options.max" :allow-half="data.options.allowHalf" v-model="data.options.defaultValue"></el-rate>
        <el-button type="text" v-if="data.type == 'rate'" style="display:inline-block;vertical-align: middle;margin-left: 10px;" @click="data.options.defaultValue=0">清空</el-button>
        <el-color-picker
                v-if="data.type == 'color'"
                v-model="data.options.defaultValue"
                :show-alpha="data.options.showAlpha"
        ></el-color-picker>
        <el-switch v-if="data.type=='switch'" v-model="data.options.defaultValue"></el-switch>
      </el-form-item>

      <template v-if="data.type == 'time' || data.type == 'date'">
        <el-form-item label="显示类型" v-if="data.type == 'date'">
          <el-select v-model="data.options.type">
            <el-option value="year"></el-option>
            <el-option value="month"></el-option>
            <el-option value="date"></el-option>
            <el-option value="dates"></el-option>
            <!-- <el-option value="week"></el-option> -->
            <el-option value="datetime"></el-option>
            <el-option value="datetimerange"></el-option>
            <el-option value="daterange"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否为范围选择" v-if="data.type == 'time'">
          <el-switch v-model="data.options.isRange"></el-switch>
        </el-form-item>
        <el-form-item label="是否获取时间戳" v-if="data.type == 'date'">
          <el-switch v-model="data.options.timestamp"></el-switch>
        </el-form-item>
        <el-form-item
                label="占位内容"
                v-if="(!data.options.isRange && data.type == 'time') || (data.type != 'time' && data.options.type != 'datetimerange' && data.options.type != 'daterange')"
        >
          <el-input v-model="data.options.placeholder"></el-input>
        </el-form-item>
        <el-form-item
                label="开始时间占位内容"
                v-if="(data.options.isRange) || data.options.type=='datetimerange' || data.options.type=='daterange'"
        >
          <el-input v-model="data.options.startPlaceholder"></el-input>
        </el-form-item>
        <el-form-item
                label="结束时间占位内容"
                v-if="data.options.isRange || data.options.type=='datetimerange' || data.options.type=='daterange'"
        >
          <el-input v-model="data.options.endPlaceholder"></el-input>
        </el-form-item>
        <el-form-item label="格式">
          <el-input v-model="data.options.format"></el-input>
        </el-form-item>
        <el-form-item label="默认值" v-if="data.type=='time' && Object.keys(data.options).indexOf('isRange')>=0">
          <el-time-picker
                  key="1"
                  style="width: 100%;"
                  v-if="!data.options.isRange"
                  v-model="data.options.defaultValue"
                  :arrowControl="data.options.arrowControl"
                  :value-format="data.options.format"
          >
          </el-time-picker>
          <el-time-picker
                  key="2"
                  v-if="data.options.isRange"
                  style="width: 100%;"
                  v-model="data.options.defaultValue"
                  is-range
                  :arrowControl="data.options.arrowControl"
                  :value-format="data.options.format"
          ></el-time-picker>
        </el-form-item>
      </template>

      <template v-if="data.type=='imgupload'">

        <el-form-item label="最大上传数">
          <el-input type="number" v-model.number="data.options.length"></el-input>
        </el-form-item>
        <template>
          <el-form-item label="图片上传地址" :required="true">
            <el-input v-model="data.options.action"></el-input>
          </el-form-item>
        </template>
      </template>

      <template v-if="data.type=='blank'">
        <el-form-item label="绑定数据类型">
          <el-select v-model="data.options.defaultType">
            <el-option value="String" label="字符"></el-option>
            <el-option value="Object" label="对象"></el-option>
            <el-option value="Array" label="数组"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type == 'expression'">
        <el-form-item label="单位">
          <el-input v-model="data.options.unit"></el-input>
        </el-form-item>

        <el-form-item label="公式">
          <el-input v-model="data.options.content">
            <template slot="prepend">fx=</template>
            <el-button slot="append" @click="handleValidExpression">验证</el-button>
          </el-input>
          <div style="color: red; line-height: 22px; font-size: 80%;">
            <p>注：手写组件key及 + - * / 字符。</p>
            <p>例1: number1+number2-number3</p>
            <p>例2: (n1+n2)*n3/n4</p>
            <p ng-if="data.approvalType=='reimburse'">注意: 报销金额不能作为公式字段</p>
          </div>
        </el-form-item>
      </template>

      <template v-if="data.type == 'tabs'">
        <el-form-item label="tab页配置项">
          <draggable tag="ul" :list="data.columns"
                     v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                     handle=".drag-item"
          >
            <li v-for="(item, index) in data.columns" :key="index" >
              <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
              <el-input placeholder="tab名称" size="mini" style="width: 100px;" type="text" v-model="item.title"></el-input>

              <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>
            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddTabColumn">添加tab页</el-button>
          </div>
        </el-form-item>
        <el-form-item label="标签的宽度是否自撑开">
          <el-switch v-model="data.options.stretch"></el-switch>
        </el-form-item>
        <el-form-item label="tab页样式">
          <el-select v-model="data.options.type">
            <el-option label="标准样式" value=""></el-option>
            <el-option label="选项卡样式" value="card"></el-option>
            <el-option label="卡片化" value="border-card"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="tab页标签位置">
          <el-select v-model="data.options.tabPosition">
            <el-option label="top" value="top"></el-option>
            <el-option label="right" value="right"></el-option>
            <el-option label="bottom" value="bottom"></el-option>
            <el-option label="left" value="left"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type == 'steps'">
        <el-form-item label="步骤条配置项">
          <draggable tag="ul" :list="data.columns"
                     v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                     handle=".drag-item"
          >
            <li v-for="(item, index) in data.columns" :key="index" >
              <i class="drag-item" style="font-size: 16px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
              <el-input placeholder="tab名称" size="mini" style="width: 100px;" type="text" v-model="item.title"></el-input>
              <el-input placeholder="描述" size="mini" style="width: 100px;" type="text" v-model="item.description"></el-input>
              <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>
            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddStepColumn">添加tab页</el-button>
          </div>
        </el-form-item>
        <el-form-item label="是否进行居中对齐">
          <el-switch v-model="data.options.alignCenter"></el-switch>
        </el-form-item>
        <el-form-item label="是否应用简洁风格">
          <el-switch v-model="data.options.simple"></el-switch>
        </el-form-item>
        <el-form-item label="设置当前激活步骤">
          <el-select v-model="data.options.active">
            <el-option v-for="(item, index) in data.columns" :key="index" :label="item.title" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置当前步骤的状态	">
          <el-select v-model="data.options.processStatus">
            <el-option label="默认" value=""></el-option>
            <el-option label="wait" value="wait"></el-option>
            <el-option label="process" value="process"></el-option>
            <el-option label="finish" value="finish"></el-option>
            <el-option label="error" value="error"></el-option>
            <el-option label="success" value="success"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置结束步骤的状态">
          <el-select v-model="data.options.finishStatus">
            <el-option label="默认" value=""></el-option>
            <el-option label="wait" value="wait"></el-option>
            <el-option label="process" value="process"></el-option>
            <el-option label="finish" value="finish"></el-option>
            <el-option label="error" value="error"></el-option>
            <el-option label="success" value="success"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <template v-if="data.type == 'grid'">
        <el-form-item label="栅格间隔">
          <el-input type="number" v-model.number="data.options.gutter"></el-input>
        </el-form-item>
        <el-form-item label="列配置项">
          <draggable tag="ul" :list="data.columns"
                     v-bind="{group:{ name:'options'}, ghostClass: 'ghost',handle: '.drag-item'}"
                     handle=".drag-item"
          >
            <li v-for="(item, index) in data.columns" :key="index" >
              <i class="drag-item" style="font-size: 16px;margin: 0 5px;cursor: move;"><i class="iconfont icon-icon_bars"></i></i>
              <el-input placeholder="栅格值" size="mini" style="width: 100px;" type="number" v-model.number="item.span"></el-input>

              <el-button @click="handleOptionsRemove(index)" circle plain type="danger" size="mini" icon="el-icon-minus" style="padding: 4px;margin-left: 5px;"></el-button>

            </li>
          </draggable>
          <div style="margin-left: 22px;">
            <el-button type="text" @click="handleAddColumn">添加列</el-button>
          </div>
        </el-form-item>
      </template>
      <template v-if="data.type == 'grid'">
        <el-form-item label="水平排列方式">
          <el-select v-model="data.options.justify">
            <el-option value="start" label="左对齐"></el-option>
            <el-option value="end" label="右对齐"></el-option>
            <el-option value="center" label="居中"></el-option>
            <el-option value="space-around" label="两侧间隔相等"></el-option>
            <el-option value="space-between" label="两端对齐"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="垂直排列方式">
          <el-select v-model="data.options.align">
            <el-option value="top" label="顶部对齐"></el-option>
            <el-option value="middle" label="居中"></el-option>
            <el-option value="bottom" label="底部对齐"></el-option>
          </el-select>
        </el-form-item>
      </template>

      <el-form-item label="背景色" v-if="data.type == 'div'">
        <div>
          <el-color-picker v-model="data.options.backgroundColor"></el-color-picker>
        </div>
      </el-form-item>

      <el-form-item label="padding" v-if="data.type == 'div'">
        <div>
          <el-input size="mini" style v-model="data.options.top" placeholder="单位为px或%">
            <template slot="prepend">top</template>
          </el-input>
          <el-input size="mini" style v-model="data.options.right" placeholder="单位为px或%">
            <template slot="prepend">right</template>
          </el-input>
          <el-input size="mini" style v-model="data.options.bottom" placeholder="单位为px或%">
            <template slot="prepend">bottom</template>
          </el-input>
          <el-input size="mini" style v-model="data.options.left" placeholder="单位为px或%">
            <template slot="prepend">left</template>
          </el-input>
        </div>
      </el-form-item>

      <el-form-item label="marigin" v-if="data.type == 'div'">
        <div>
          <el-input size="mini" style v-model="data.options.marginTop" placeholder="单位为px或%">
            <template slot="prepend">top</template>
          </el-input>
          <el-input size="mini" style v-model="data.options.marginRight" placeholder="单位为px或%">
            <template slot="prepend">right</template>
          </el-input>
          <el-input size="mini" style v-model="data.options.marginBottom" placeholder="单位为px或%">
            <template slot="prepend">bottom</template>
          </el-input>
          <el-input size="mini" style v-model="data.options.marginLeft" placeholder="单位为px或%">
            <template slot="prepend">left</template>
          </el-input>
        </div>
      </el-form-item>

      <!-- 时长 begin -->
      <template v-if="data.type == 'duration'">
        <el-form-item label="小标题1">
          <el-input v-model="data.options.title1"></el-input>
        </el-form-item>
        <el-form-item label="小标题2">
          <el-input v-model="data.options.title2"></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-radio-group v-model="data.options.unit" @change="changeDurUnit">
            <el-radio label="day">天数</el-radio>
            <el-radio label="hour">小时</el-radio>
          </el-radio-group>
          <div>{{ durationMsg }}</div>
        </el-form-item>
      </template>
      <!-- 时长 end -->

      <template v-if="data.type == 'table'">
        <el-form-item label="计算属性">
          <el-checkbox v-model="data.options.show_summary">表尾合计行</el-checkbox>
        </el-form-item>
      </template>

      <template v-if="data.type != 'grid' && data.type != 'div' && data.type != 'tabs' && data.type != 'steps'">

        <el-form-item label="数据绑定Key">
          <el-input v-model="data.model" :class="{'input-verified-error': isKeyEmpty || !isKeyUniqueComputed}" @blur="handleKeyBlur(data.model)"></el-input>
        </el-form-item>
        <el-form-item v-if="data.type != 'onlyReadText' && data.type != 'table' && data.type !='entry'" label="操作属性">
          <el-checkbox v-model="data.options.readonly" v-if="Object.keys(data.options).indexOf('readonly')>=0">完全只读</el-checkbox>
          <el-checkbox v-model="data.options.disabled" v-if="Object.keys(data.options).indexOf('disabled')>=0">禁用	</el-checkbox>
          <el-checkbox v-model="data.options.editable" v-if="Object.keys(data.options).indexOf('editable')>=0">文本框可输入</el-checkbox>
          <el-checkbox v-model="data.options.clearable" v-if="Object.keys(data.options).indexOf('clearable')>=0">显示清除按钮</el-checkbox>
          <el-checkbox v-model="data.options.arrowControl" v-if="Object.keys(data.options).indexOf('arrowControl')>=0">使用箭头进行时间选择</el-checkbox>
          <el-checkbox v-model="data.options.isDelete" v-if="Object.keys(data.options).indexOf('isDelete')>=0">删除</el-checkbox>
          <el-checkbox v-model="data.options.isEdit" v-if="Object.keys(data.options).indexOf('isEdit')>=0">编辑</el-checkbox>
          <el-checkbox v-model="data.options.showAllLevels" v-if="Object.keys(data.options).indexOf('showAllLevels')>=0">
            是否显示完整路径
          </el-checkbox>
        </el-form-item>
        <el-form-item v-if="data.type != 'onlyReadText' && data.type != 'table'&& data.type !='entry' " label="校验">
          <div>
            <el-checkbox v-model="data.options.required">必填</el-checkbox>
          </div>
          <el-select
                  v-if="Object.keys(data.options).indexOf('dataType')>=0"
                  v-model="data.options.dataType"
                  size="mini"
          >
            <el-option value="string" label="字符串"></el-option>
            <el-option value="number" label="数字"></el-option>
            <el-option value="boolean" label="布尔值"></el-option>
            <el-option value="integer" label="整数"></el-option>
            <el-option value="float" label="浮点数"></el-option>
            <el-option value="url" label="URL地址"></el-option>
            <el-option value="email" label="邮箱地址"></el-option>
            <el-option value="hex" label="十六进制"></el-option>
          </el-select>

          <div v-if="Object.keys(data.options).indexOf('pattern')>=0">
            <el-input
                    size="mini"
                    v-model.lazy="data.options.pattern"
                    style=" width: 240px;"
                    placeholder="填写正则表达式"
            ></el-input>
          </div>
        </el-form-item>
      </template>

    </el-form>
    <el-form
            v-if="['personSelect','noticeSelect','orgSelect','allSelect'].includes(data.type)"
            label-position="top"
    >
      <el-form-item label="标题">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="是否必填">
        <div>
          <el-checkbox v-model="data.options.required">必填</el-checkbox>
        </div>
      </el-form-item>
      <el-form-item label="数据绑定Key">
        <el-input v-model="data.model" :class="{'input-verified-error': isKeyEmpty || !isKeyUniqueComputed}" @blur="handleKeyBlur(data.model)"></el-input>
      </el-form-item>
      <el-form-item v-if="data.type == 'noticeSelect'" :label="data.options.lable">
        <div>
          <el-select v-model="data.options.lableDate" multiple filterable placeholder="请选择" >
            <el-option v-for="item in options" :key="item.id" :value="item.name"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="宽度" v-if="Object.keys(data.options).indexOf('width')>=0">
        <el-input v-model="data.options.width"></el-input>
      </el-form-item>
      <el-form-item
              :label="data.options.lable"
              v-if="data.type == 'personSelect' || data.type == 'orgSelect'"
      >
        <el-radio-group v-model="data.options.selectType" @change="handleSelectMuliple">
          <el-radio :label="0">单{{data.options.unit}}</el-radio>
          <el-radio :label="1">多{{data.options.unit}}</el-radio>
        </el-radio-group>
        <!-- <el-radio v-model="data.options.selectType" label="1">单{{data.options.unit}}</el-radio>
        <el-radio v-model="data.options.selectType" label="2">多{{data.options.unit}}</el-radio> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'
  import Draggable from 'vuedraggable'

  export default {
    props: ['data', 'widgetForm', 'isKeyUniqueComputed'],
    components: {
      Draggable,
    },
    data () {
      return {
        durationMsg: '计算单位为天，最小为0.5天',
        validator: {
          type: null,
          required: null,
          pattern: null,
          range: null,
          length: null
        },
        options: []
      };
    },
    computed: {
      ...mapState('form', {
        state: state => state
      }),
      show() {
        console.log('this.data == ', this.data)
        if (this.data && Object.keys(this.data).length > 0) {
          return true;
        }
        return false
      },
      isNameEmpty () {
        if (this.data && !this.data.name.length) {
          return true
        }
        return false
      },
      isKeyEmpty () {
        if (this.data && !this.data.model.length) {
          return true
        }
        return false
      },
    },
    watch: {
      "data.options.isRange": function(val) {
        if (typeof val !== "undefined") {
          if (val) {
            this.data.options.defaultValue = null;
          } else {
            if (Object.keys(this.data.options).indexOf('defaultValue')>=0)
              this.data.options.defaultValue = ''
          }
        }
      },
      "data.options.required": function(val) {
        this.validateRequired(val);
      },
      "data.options.dataType": function(val) {
        this.validateDataType(val);
      },
      "data.options.pattern": function(val) {
        this.valiatePattern(val);
      },
      "data.name": function(val) {
        console.log('val == ', val)
        if (this.data.options) {
          this.validateRequired(this.data.options.required);
          this.validateDataType(this.data.options.dataType);
          this.valiatePattern(this.data.options.pattern);
        }
      }
    },
    methods: {
      ...mapActions('form', [
        'actionsReduceCount',
        'actionsAddCount',
        'actionsChangeFormSelect'
      ]),
      ...mapGetters('form', [
        'getterCount'
      ]),
      changeDurUnit(label){
        if(label == "hour"){
          this.durationMsg = "计算单位为小时，最小为0.5小时";
        }else{
          this.durationMsg = "计算单位为天，最小为0.5天";
        }
      },
      handleOptionsRemove (index) {//栅格中右侧字段属性列配置项的删除功能
        if (this.data.type === 'grid' || this.data.type === 'tabs' || this.data.type === 'steps') {
          this.data.columns.splice(index, 1)
        } else {
          this.data.options.options.splice(index, 1);
        }
      },
      handleAddOption() {
        this.data.options.options.push({
          label: "新选项"+new Date().getTime(),
          value: "新选项"
        });
        // if (this.data.options.showLabel) {
        //   this.data.options.options.push({
        //     value: "新选项",
        //     label: "新选项"
        //   });
        // } else {
        //   this.data.options.options.push({
        //     value: "新选项"
        //   });
        // }
      },
      handleAddColumn() {
        this.data.columns.push({
          span: "",
          list: []
        });
      },
      handleAddTabColumn() {
        this.data.columns.push({
          title:'newTab',
          name: 'tab' + ++this.data.options.tabIndex,
          list: []
        });
      },
      handleAddStepColumn() {
        // this.data.options.stepIndex++
        this.data.columns.push({
          title:'新步骤',
          description:'',
          list: []
        });
      },
      handleValidExpression () {
        let expDis = this.data.options.content;
        if (expDis && expDis != '') {
          if (/[^\+\-\*\/\(\)A-Za-z\_\d]/.test(expDis)) {
            this.$message.error('公式: 含有非法字符');
            return false;
          } else if (/(\+|\-|\*|\/){2}/.test(expDis) || /(\+|\-|\*|\/)\)/.test(expDis) || /\((\+|\-|\*|\/)/.test(expDis) || /(^[-+*\/])|([-+*\/]$)/.test(expDis)) {
            this.$message.error('公式: 格式错误');
            return false;
          }
          expDis = expDis.replace(/(\+|\-|\*|\/|\(|\))/g, ' $1 ');
          if (expDis && expDis != '') {
            expDis = expDis.split(/\s+/)
          }
          let widgetFormList = this.widgetForm.list;
          let validStatus = expDis.every(e => {
            if (e == '') {
              return true;
            }
            if (/[^(\+|\-|\*|\/|\(|\))]/.test(e)) {
              let hasModel = false;
              let hasError = false;
              widgetFormList.map(item => {
                if (item.type === 'grid' || item.type === 'div' || item.type === 'tabs' || item.type === 'steps') {
                  var modelArray = []
                  item.columns.forEach((column) => {
                    column.list.forEach((list) => {
                      modelArray.push({
                        model: list.model,
                        type: list.type
                      })
                    })
                  })
                  var modelFindIndex = modelArray.findIndex((modelItem, index) => {
                    return modelItem.model == e
                  })
                  if (modelFindIndex > -1) {
                    hasModel = true;
                    if (modelArray[modelFindIndex].type != 'number' && modelArray[modelFindIndex].type != 'duration') {
                      this.$message.error('公式里的元素只能是计数器组件或时长组件');
                      hasError = true;
                    }
                  }
                } else {
                  if (item.model == e) {
                    hasModel = true;
                    if (item.type != 'number' && item.type != 'duration') {
                      this.$message.error('公式里的元素只能是计数器组件或时长组件');
                      hasError = true;
                    }
                  }
                }
              });
              if (!hasModel) {
                this.$message.error('未找到model= "' + e + '" 的组件');
                return false;
              }
              return !hasError;
            } else {
              return true;
            }
          });
          if (validStatus) {
            this.$message.success('校验成功');
            return true;
          } else {
            return false;
          }
        } else {
          this.$message.error('请输入公式表达式');
          return false;
        }
      },
      generateRule () {
        this.data.rules = []
        Object.keys(this.validator).forEach(key => {
          if (this.validator[key]) {
            this.data.rules.push(this.validator[key]);
          }
        });
      },
      handleSelectOrgMuliple(value) {
        if (value) {
          if (this.data.options.orgValue) {
            this.data.options.orgValue = [this.data.options.defaultValue];
          } else {
            this.data.options.orgValue = [];
          }
        } else {
          if (this.data.options.orgValue.length > 0) {
            this.data.options.orgValue = this.data.options.defaultValue[0];
          } else {
            this.data.options.orgValue = "";
          }
        }
      },
      handleSelectMuliple(value) {
        if (value) {
          if (this.data.options.defaultValue) {
            this.data.options.defaultValue = this.data.options.defaultValue;
          } else {
            this.data.options.defaultValue = '';
          }
        } else {
          if (this.data.options.defaultValue.length > 0) {
            this.data.options.defaultValue = this.data.options.defaultValue[0];
          } else {
            this.data.options.defaultValue = "";
          }
        }
      },

      validateRequired(val) {
        if (val) {
          this.validator.required = {
            required: true,
            message: `${this.data.name}必须填写`
          };
        } else {
          this.validator.required = null;
        }

        this.$nextTick(() => {
          this.generateRule();
        });
      },

      validateDataType(val) {
        if (!this.show) {
          return false;
        }

        if (val) {
          this.validator.type = {
            type: val,
            message: this.data.name + "格式不正确"
          };
        } else {
          this.validator.type = null;
        }
        this.generateRule();
      },
      valiatePattern(val) {
        if (!this.show) {
          return false;
        }

        if (val) {
          this.validator.pattern = {
            pattern: val,
            message: this.data.name + "格式不匹配"
          };
        } else {
          this.validator.pattern = null;
        }

        this.generateRule();
      },
      handleKeyBlur (val) {
        var reg = /^[0-9a-zA-Z_]+$/
        if (val && !reg.test(val)) {
          this.$message({
            showClose: true,
            message: '仅支持数字字母下划线',
            type: 'warning'
          });
          this.data.model = this.data.model.replace(/[^0-9a-zA-Z_]+/g, '')
        }

        if (!this.isKeyEmpty && this.widgetForm) {
          var currIndex = this.widgetForm.list.findIndex((item, index) => {
            return item.model === val
          })
          var list = JSON.parse(JSON.stringify(this.widgetForm.list))
          if (currIndex > -1) {
            list.splice(currIndex, 1)
          }
          var isKeyUnique = list.every((item, index) => {
            return item.model !== val
          })

          this.$emit('handerKeyUniqueComputed', isKeyUnique)

          if (!isKeyUnique) {
            this.$message({
              message: '当前组Key值重复',
              type: 'warning'
            })
            return
          }
        }
      },
      handleNameBlur (val) {
        var reg = /^[0-9a-zA-Z\u4E00-\u9FA5_]+$/
        if (val && !reg.test(val)) {
          this.$message({
            showClose: true,
            message: '仅支持中文数字字母下划线',
            type: 'warning'
          });
          this.data.name = this.data.name.replace(/[^0-9a-zA-Z\u4E00-\u9FA5_]+/g, '')
        }
      }
    },
    // 去掉，因为这个是单独的页面，取不到vuex的内容
    // mounted() {
    //   // 取vuex中的内容
    //   this.options = this.$store.state.state.orgAllList;
    // },

    mounted () {
      // console.log('WidgetConfig data == ', this.data)

    }
  }
</script>

<style lang="scss">
  .el-input.input-verified-error .el-input__inner {
    border: 1px solid red !important;
  }
</style>
