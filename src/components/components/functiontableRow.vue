<template>
    <Table :columns='functionRowColumns' :data='functionRowData'>
    </Table>
</template>
<script>
export default {
  props: {
    functionRowData: Array
  },
  data() {
    return {
      functionRowColumns: [
        {
          type: "index",
          width: 50
        },
        {
          title: "设备型号",
          key: "model"
        },
        {
          title: "设备名称",
          key: "dev_name"
        },
        {
          title: "通道",
          key: "machine_port"
        },
        {
          title: "设备端口",
          key: "port"
        },
        {
          title: "IP",
          key: "ip"
        },

        {
          title: "设备厂商",
          key: "sdk"
        },
        {
          title: "用户名",
          key: "user_name"
        },
        {
          title: "密码",
          key: "pwd"
        },
        {
          title: "描述",
          key: "description"
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
                      this.openDev(params.row);
                    }
                  }
                },
                "开启"
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
                      this.closeDev(params.row);
                    }
                  }
                },
                "关闭"
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
                      this.editCamearModal(params.row);
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
                      this.delDev(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    // 开启
    openDev(row) {
      this.$emit("openBoxDev", row);
    },
    // 编辑
    editCamearModal(row) {
      // 子组件向父组件传递数据
      this.$emit("editBoxDev", row);
    },
    closeDev(row) {
      this.$emit("closeBoxDev", row);
    },
    delDev(row) {
      this.$emit("delBoxDev", row);
    },
    compare(o1, o2) {
      let v1 = o1.machine_port;
      let v2 = o2.machine_port;
      if (v1 <= v2) {
        return -1;
      } else {
        return 1;
      }
    }
  },
  created() {
    //   按通道大小排序
    this.functionRowData.sort(this.compare);
  }
};
</script>

