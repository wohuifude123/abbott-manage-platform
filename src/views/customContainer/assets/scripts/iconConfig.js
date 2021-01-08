export const basicComponents = [
  {
    type: 'input',
    name: '单行文本',
    icon: 'icon-input',
    options: {
      width: '80%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: '',
      disabled: false,
      isWfCondition: false
    }
  },
  {
    type: 'textarea',
    name: '多行文本',
    icon: 'icon-diy-com-textarea',
    options: {
      width: '80%',
      defaultValue: '',
      required: false,
      disabled: false,
      pattern: '',
      placeholder: '',
      isWfCondition: false
    }
  },
  {
    type: 'onlyReadText',
    name: '只读文本',
    icon: 'icon-ic',
    options: {
      width: '80%',
      textValue:''
    }
  },
  {
    type: 'number',
    name: '计数器',
    icon: 'icon-number',
    options: {
      width: '80%',
      required: false,
      defaultValue: 0,
      min: '',
      max: '',
      step: 1,
      disabled: false,
      controlsPosition: '',
      isWfCondition: false
    }
  },
  {
    type: 'amount',
    name: '大写金额',
    icon: 'icon-amount',
    options: {
      width: '80%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: '',
      disabled: false,
      isWfCondition: false
    }
  },
  {
    type: 'website',
    name: '网址',
    icon: 'icon-website',
    options: {
      width: '80%',
      defaultValue: '',
      required: false,
      dataType: 'string',
      pattern: '',
      placeholder: '',
      disabled: false,
      isWfCondition: false
    }
  },
  {
    type: 'radio',
    name: '单选框组',
    icon: 'icon-radio-active',
    options: {
      inline: false,
      defaultValue: '',
      showLabel: false,
      options: [
        {
          value: '选项1',
          label: '选项1'
        },
        {
          value: '选项2',
          label: '选项2'
        },
        {
          value: '选项3',
          label: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteUrl: '',
      disabled: false,
      isWfCondition: false
    }
  },
  {
    type: 'checkbox',
    name: '多选框组',
    icon: 'icon-check-box',
    options: {
      inline: false,
      defaultValue: [],
      showLabel: false,
      options: [
        {
          value: '选项1'
        },
        {
          value: '选项2'
        },
        {
          value: '选项3'
        }
      ],
      required: false,
      width: '',
      remote: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteUrl: '',
      disabled: false,
      isWfCondition: false
    }
  },
  {
    type: 'time',
    name: '时间选择器',
    icon: 'icon-time',
    options: {
      defaultValue: '21:19:56',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      isRange: false,
      arrowControl: true,
      format: 'HH:mm:ss',
      required: false,
      width: '',
      isWfCondition: false
    }
  },
  {
    type: 'date',
    name: '日期选择器',
    icon: 'icon-date',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'date',
      format: 'yyyy-MM-dd',
      timestamp: false,
      required: false,
      width: '80%',
      isWfCondition: false
    }
  },
  // {
  //   type: 'rate',
  //   name: '评分',
  //   icon: 'icon-icon-test',
  //   options: {
  //     defaultValue: null,
  //     max: 5,
  //     disabled: false,
  //     allowHalf: false,
  //     required: false
  //   }
  // },
  // {
  //   type: 'color',
  //   name: '颜色选择器',
  //   icon: 'icon-color',
  //   options: {
  //     defaultValue: '',
  //     disabled: false,
  //     showAlpha: false,
  //     required: false
  //   }
  // },
  {
    type: 'select',
    name: '下拉选择框',
    icon: 'icon-select',
    options: {
      defaultValue: [],
      multiple: false,
      disabled: false,
      clearable: false,
      placeholder: '',
      required: false,
      showLabel: false,
      width: '80%',
      options: [
        {
          label:1,
          value: '下拉框1'
        },
        {
          label:2,
          value: '下拉框2'
        },
        {
          label:3,
          value: '下拉框3'
        }
      ],
      remote: false,
      filterable: false,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label'
      },
      remoteUrl: '',
      isWfCondition: false
    }
  },
  {
    type: 'switch',
    name: '开关',
    icon: 'icon-switch',
    options: {
      defaultValue: false,
      required: false,
      disabled: false,
      isWfCondition: false
    }
  },
  {
    type: 'slider',
    name: '滑块',
    icon: 'icon-slider',
    options: {
      defaultValue: 0,
      disabled: false,
      required: false,
      min: 0,
      max: 100,
      step: 1,
      showInput: false,
      range: false,
      width: ''
    }
  },
  {
    type:'allSelect',
    name:'人员部门',
    icon:'icon-bumenkaoqin',
    options:{
      defaultValue:[], //默认值
      remoteOptions: [],
      placeholder:'请选择', //提示语
      lable:'选择人数', //编辑时的标题
      multiple: true, //单选多选
      disabled:false,
      width:'80%',
      required:false,
      props: {
        value: 'name',
        label: 'label'
      },
      isWfCondition: false
    }
  },
  {
    type:'noticeSelect',
    name:'通知对象',
    icon:'icon-tongzhiduixiang',
    options:{
      multiple: true,
      defaultValue:[],
      remoteOptions: [],
      lable:'预设通知对象',
      lableDate:[], //预设通知对象的值
      placeholder:'请选择',
      width:'80%',
      required:false,
      props: {
        value: 'name',
        label: 'label'
      },
      isWfCondition: false
    }
  },
  {
    type:'personSelect',
    name:'人员选择',
    icon:'icon-man',
    options:{
      orgValue:[],
      remoteOptions: [],
      placeholder:'请选择',
      selectType:0,
      lable:'选择人数',
      unit:'人',
      disabled:false,
      width:'80%',
      required:false,
      props: {
        value: 'name',
        label: 'label'
      },
      isWfCondition: false
    }
  },
  {
    type:'orgSelect',
    name:'部门选择',
    icon:'icon-bumenguanli',
    options:{
      orgValue:[],
      remoteOptions: [],
      placeholder:'请选择',
      selectType:0,
      lable:'选择部门',
      unit:'部门',
      disabled:false,
      width:'80%',
      required:false,
      props: {
        value: 'name',
        label: 'label'
      },
      isWfCondition: false
    }
  },
  {
    type: 'date',
    name: '日期时间',
    icon: 'icon-date',
    options: {
      defaultValue: '',
      readonly: false,
      disabled: false,
      editable: true,
      clearable: true,
      placeholder: '',
      startPlaceholder: '',
      endPlaceholder: '',
      type: 'datetime',
      format: 'yyyy-MM-dd HH:mm:ss',
      timestamp: false,
      required: false,
      width: '80%',
      isWfCondition: false
    }
  }
]

export const advanceComponents = [
  {
    type: 'imgupload',
    name: '图片',
    icon: 'icon-tupian',
    options: {
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: '',
      tokenFunc: 'funcGetToken',
      token: '',
      domain: 'http://pfp81ptt6.bkt.clouddn.com/',
      disabled: false,
      length: 8,
      multiple: false,
      isQiniu: false,
      isDelete: true,
      min: 0,
      isEdit: false,
      required: false,
      action: process.env.VUE_APP_Uploadimg,
    }
  },
  {
    type:'entry',
    name:'入职组件',
    icon:'icon-fileupload',
    options:{
      width:'80%',
    }
  },
  {
    type: 'fileupload',
    name: '附件',
    icon: 'icon-fileupload',
    options: {
      defaultValue: [],
      size: {
        width: 100,
        height: 100,
      },
      width: '',
      disabled: false,
      length: 8,
      multiple: false,
      required: false,
      action: process.env.VUE_APP_Uploadimg,
    }
  },
  {
    type: 'editor',
    name: '编辑器',
    icon: 'icon-fuwenbenkuang',
    options: {
      defaultValue: '',
      width: ''
    }
  },
  {
    type: 'cascader',
    name: '级联选择器',
    icon: 'icon-jilianxuanze',
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      required: false,
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteUrl: ''
    }
  },
  {
    type: 'cityCascader',
    name: '城市级联',
    icon: 'icon-jilianxuanze',
    options: {
      defaultValue: [],
      width: '',
      placeholder: '',
      required: false,
      disabled: false,
      clearable: false,
      remote: true,
      remoteOptions: [],
      props: {
        value: 'value',
        label: 'label',
        children: 'children'
      },
      remoteUrl: process.env.VUE_APP_ELE_DESIGN_URL + 'sysDictController/queryDictTree?dictKey=cityCascader',
      isWfCondition: false

    }
  },
  {
    type: 'expression',
    name: '公式计算',
    icon: 'icon-fx',
    options: {
      defaultValue: '',
      width: '80%',
      content: '',
      unit: '',
      required: false,
      isWfCondition: false,
    }
  },
  {
    type: 'duration',
    name: '时长',
    icon: 'icon-duration',
    options: {
      title1: '开始时间',
      title2: '结束时间',
      defaultValue: '',
      disabled:false,
      unit: 'day',
      required: false,
      isWfCondition: false
    }
  },
  {
    type: 'table',
    name: '子表单',
    icon: 'icon-table',
    options: {
      defaultValue: [],
      width:'',
      border: false,
      size: '',
      show_summary: false
    }
  }
]

export const layoutComponents = [
  {
    type: 'div',
    name: 'div块',
    icon: 'icon-grid-',
    columns: [
      {
        list: []
      }
    ],
    options: {
      minHeight:'150',
      backgroundColor:'',
      top:'',
      right:'',
      bottom:'',
      left:'',
      marginTop:'',
      marginRight:'',
      marginBottom:'',
      marginLeft:''
    }
  },
  {
    type: 'form',
    name: '表单块',
    icon: 'icon-grid-',
    columns: [
      {
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top',
      height:'150'
    }
  },
  {
    type: 'childTable',
    name: '子表格',
    icon: 'icon-grid-',
    columns: [
      {
        list: []
      }
    ],
    options: {
      gutter: 0,
      justify: 'start',
      align: 'top',
      height:'150'
    }
  }
]
