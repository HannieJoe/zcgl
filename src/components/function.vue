<template>
  <div class="functionDiv">
    <h3 class="title">功能配置</h3>
    <div class="toolbar">
      <Button type="primary" @click='scanning'>扫描</Button>
      <Button type="success" @click="addBox">添加机箱</Button>
      <div class="search">
        <Input>
        <Button slot="append" icon='ios-search'></Button>
        </Input>
      </div>
    </div>
    <Table :columns='functionColumns' :data='functionData' :highlight-row='true'>
    </Table>
    <Modal v-model="functionModalBox" title="机箱">
      <Form ref="functionForm" :model="functionForm" :rules="ruleValidate" :label-width='80'>
        <FormItem label='机箱ID' prop='box_id'>
          <Input type="text" v-model="functionForm.box_id"></Input>
        </FormItem>
        <FormItem label='设备类型' prop='type'>
          <Select v-model="functionForm.type" style="width:408px">
            <Option v-for="item in typeListBox" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label='设备名称' prop='dev_name'>
          <Input type="text" v-model="functionForm.dev_name"></Input>
        </FormItem>
        <FormItem label='IP' prop='ip'>
          <Input type="text" v-model="functionForm.ip"></Input>
        </FormItem>
        <FormItem label='描述' prop='description'>
          <Input type="text" v-model="functionForm.description"></Input>
        </FormItem>
        <FormItem label='经度' prop='lng'>
          <Input type="text" v-model="functionForm.lng"></Input>
        </FormItem>
        <FormItem label='纬度' prop='lat'>
          <Input type="text" v-model="functionForm.lat"></Input>
        </FormItem>
        <FormItem label='发货日期' prop='send_date'>
          <Input type="text" v-model="functionForm.send_date"></Input>
        </FormItem>
        <FormItem label='年限' prop='valid_time'>
          <Input type="text" v-model="functionForm.valid_time"></Input>
        </FormItem>
        <FormItem label='承建单位' prop='build_company'>
          <Input type="text" v-model="functionForm.build_company"></Input>
        </FormItem>
        <FormItem label='行政区域' prop='region_code'>
          <Input type="text" v-model="functionForm.region_code"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="functionModalBox=false">取消</Button>
        <Button type="primary" @click="functionModalOk('functionForm')">确定</Button>
      </div>
    </Modal>
    <Modal v-model="functionModalDev" title="设备">
      <Form ref="functionForm2" :model="functionForm" :rules="ruleValidate" :label-width='80'>
        <FormItem label='设备型号' prop='model'>
          <Input type="text" v-model="functionForm.model"></Input>
        </FormItem>
        <FormItem label='设备类型' prop='type'>
          <Select v-model="functionForm.type" style="width:408px">
            <Option v-for="item in typeListBoxDev" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label='通道' prop='machine_port'>
          <Input type="text" v-model="functionForm.machine_port"></Input>
        </FormItem>
        <FormItem label='设备名称' prop='dev_name'>
          <Input type="text" v-model="functionForm.dev_name"></Input>
        </FormItem>
        <FormItem label='设备端口' prop='port'>
          <Input type="text" v-model="functionForm.port"></Input>
        </FormItem>
        <FormItem label='IP' prop='ip'>
          <Input type="text" v-model="functionForm.ip"></Input>
        </FormItem>
        <FormItem label='设备厂商' prop='sdk'>
          <Input type="text" v-model="functionForm.sdk"></Input>
        </FormItem>
        <FormItem label='用户名' prop='user_name'>
          <Input type="text" v-model="functionForm.user_name"></Input>
        </FormItem>
        <FormItem label='密码' prop='pwd'>
          <Input type="text" v-model="functionForm.pwd"></Input>
        </FormItem>
        <FormItem label='描述' prop='description'>
          <Input type="text" v-model="functionForm.description"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="functionModalDev=false">取消</Button>
        <Button type="primary" @click="functionModalOk('functionForm')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import FunctiontableRow from "./components/functiontableRow";
export default {
  data() {
    return {
      functionColumns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            let functionRowData = this.obj[params.row.box_id]
              ? this.obj[params.row.box_id].sub
              : [];
            return h(FunctiontableRow, {
              props: {
                functionRowData: functionRowData
              },
              on: {
                // 编辑
                editBoxDev: row => {
                  // this.isBox = false;
                  this.functionModalDev = true;
                  this.functionForm = Object.assign({}, row);
                },
                // 开启
                openBoxDev: row => {
                  let param =
                    row.ip + "&" + (parseInt(row.machine_port) + 16) + "=1";

                  this.$http("control.cgi?ip=" + param).then(res => {
                    if (res.Success) {
                      this.$Message.success(res.Message);
                    } else {
                      this.$Message.error(res.Message);
                    }
                  });
                },
                // 关闭
                closeBoxDev: row => {
                  let param =
                    row.ip + "&" + (parseInt(row.machine_port) + 16) + "=0";
                  this.$http("control.cgi?ip=" + param).then(res => {
                    if (res.Success) {
                      this.$Message.success(res.Message);
                    } else {
                      this.$Message.error(res.Message);
                    }
                  });
                },
                // 删除
                delBoxDev: row => {
                  this.$http("query.cgi?delete=" + row.dev_code).then(res => {
                    if (res.status) {
                      this.getFunctionData();
                      this.$Message.success(res.message);
                    } else {
                      this.$Message.error(res.message);
                    }
                  });
                }
              }
            });
          }
        },
        {
          type: "index",
          width: 50
        },
        {
          title: "机箱ID",
          key: "box_id"
        },
        {
          title: "设备名称",
          key: "dev_name"
        },
        {
          title: "IP",
          key: "ip"
        },
        {
          title: "描述",
          key: "description"
        },
        {
          title: "经度",
          key: "lng"
        },
        {
          title: "纬度",
          key: "lat"
        },
        {
          title: "发货日期",
          key: "send_date"
        },
        {
          title: "年限",
          key: "valid_time"
        },
        {
          title: "承建单位",
          key: "build_company"
        },
        {
          title: "行政区域",
          key: "region_code"
        },
        {
          title: "操作",
          key: "opt",
          width: 260,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.addBoxDev(params.row);
                    }
                  }
                },
                "添加"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.scanBoxDev(params.row);
                    }
                  }
                },
                "查询"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editModal(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.delBox(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      functionData: [],
      obj: {},
      functionModalBox: false,
      functionModalDev: false,
      typeListBox: [
        { value: "0", label: "机箱" },
        { value: "100", label: "虚拟机箱" }
      ],
      typeListBoxDev: [
        { value: "1", label: "相机(无类型)" },
        { value: "2", label: "相机(球机)" },
        { value: "3", label: "相机(半球)" },
        { value: "4", label: "相机(固定枪机)" },
        { value: "5", label: "相机(遥控枪机)" },
        { value: "6", label: "相机(卡口枪机)" },
        { value: "7", label: "相机(电警)" },
        { value: "8", label: "其他" }
      ],
      functionForm: {
        box_id: "",
        dev_code: "",
        type: "",
        machine_port: "",
        dev_name: "",
        brand: "",
        description: "",
        region_code: "",
        user_name: "",
        pwd: "",
        port: "",
        model: "",
        ip: "",
        lng: "",
        lat: "",
        send_date: "",
        valid_time: "",
        build_company: ""
      },
      functionFormCopy: {},
      // isBox: true, //是否是机箱:true 是,false 机箱下设备
      scanMask: false,
      ruleValidate: {
        box_id: [{ required: true, message: "机箱ID必填", trigger: "blur" }],
        type: [{ required: true, message: "设备类型必选", trigger: "change" }],
        machine_port: [
          { required: true, message: "通道必填", trigger: "blur" },
          { pattern: /^[1-9]\d*$/, message: "通道为非零实数", trigger: "blur" }
        ],

        ip: [
          {
            pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
            message: "ip格式不正确,请重新填写",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: { FunctiontableRow },
  methods: {
    // 获取功能配置表数据
    getFunctionData() {
      this.obj = {};
      this.$http("query.cgi?query").then(res => {
        if (res.status == "success") {
          for (let i = 0; i < res.data.length; i++) {
            this.obj[res.data[i].box_id] = {
              foo: [],
              sub: []
            };
          }
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].box_id == res.data[i].dev_code) {
              // 机箱
              this.obj[res.data[i].box_id].foo.push(res.data[i]);
            } else {
              // 相机
              this.obj[res.data[i].box_id].sub.push(res.data[i]);
            }
          }
          this.functionData = [];
          for (let key in this.obj) {
            this.functionData = this.functionData.concat(this.obj[key].foo);
          }
        } else {
          this.$Message.error("请求功能配置数据失败");
        }
      });
    },
    // 扫描
    scanning() {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "load-c",
                size: 18
              }
            }),
            h("div", "正在扫描,请稍后......")
          ]);
        }
      });
      this.$http("query.cgi?scan").then(res => {
        this.$Spin.hide();
        if (res.status) {
          this.getFunctionData();
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    // 添加机箱 设备
    addBox() {
      this.functionModalBox = true;
      // this.isBox = true;
      this.functionForm = Object.assign({}, this.functionFormCopy);
      this.functionForm.machine_port = "0";
    },
    //  添加子设备
    addBoxDev(row) {
      // this.isBox = false;
      /* if (this.$refs["functionForm2"]) {
        this.$refs["functionForm2"].resetFields();
      } */
      this.functionModalDev = true;
      this.functionForm = Object.assign({}, this.functionFormCopy);
      this.functionForm.box_id = row.box_id;
    },
    // 查看机箱下子设备
    scanBoxDev(row) {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "load-c",
                size: 18
              }
            }),
            h("div", "正在查询,请稍后......")
          ]);
        }
      });
      this.$http("query.cgi?refresh=" + row.box_id).then(res => {
        this.$Spin.hide();
        if ((res.status = "success")) {
          this.getFunctionData();
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    // 编辑按钮
    editModal(row) {
      // this.isBox = true;
      this.functionModalBox = true;
      this.functionForm = Object.assign({}, row);
    },
    functionModalOk(form) {
      let d = this.functionForm;
      let param =
        d.ip +
        "&" +
        d.box_id +
        "&" +
        d.machine_port +
        "&" +
        d.type +
        "&" +
        d.dev_name +
        "&" +
        d.brand +
        "&" +
        d.description +
        "&" +
        d.send_date +
        "&" +
        d.valid_time +
        "&" +
        d.build_company +
        "&" +
        d.region_code +
        "&" +
        d.user_name +
        "&" +
        d.pwd +
        "&" +
        d.port +
        "&" +
        d.model +
        "&" +
        d.lat +
        "&" +
        d.lng +
        "&";
      this.$refs[form].validate(valid => {
        if (valid) {
          this.functionModalBox = false;
          this.functionModalDev = false;
          this.$http("query.cgi?add=" + param).then(res => {
            if (res.status == "success") {
              this.$Message.success(res.message);
              this.getFunctionData();
            } else {
              this.$Message.error(res.message);
            }
          });
        }
      });
    },
    // 删除
    delBox(row) {
      this.$http("query.cgi?delete=" + row.dev_code).then(res => {
        if (res.status == "success") {
          this.getFunctionData();
          this.$Message.success(res.message);
        } else {
          this.$Message.error(res.message);
        }
      });
    },
    functionModalCancel(form) {
      this.functionModal = false;
      this.$refs[form].resetFields();
    }
  },
  created() {
    this.functionFormCopy = Object.assign({}, this.functionForm);
    this.getFunctionData();
  }
};
</script>
<style scoped>
.title {
  height: 50px;
  line-height: 50px;
}

.toolbar {
  margin-bottom: 10px;
}

.search {
  display: inline-block;
  width: 250px;
  float: right;
}
</style>
<style>
.functionDiv td.ivu-table-expanded-cell {
  padding: 0 0 0 50px;
}

div.scanningDiv {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(55, 55, 55, 0.6);
  z-index: 10000;
}
</style>
