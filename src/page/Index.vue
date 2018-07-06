<template>
  <div>
    <Tabs value="localNetConfig">
      <TabPane label="本机网络配置" name="localNetConfig">
        <component-local-net></component-local-net>
      </TabPane>
      <TabPane label="服务配置" name="serverConfig">
        <component-server></component-server>
      </TabPane>
      <TabPane label="功能配置" name="functionConfig">
        <component-function></component-function>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
// 导入组件
import ComponentLocalNet from '../components/localNet';
import ComponentServer from '../components/server';
import ComponentFunction from '../components/function';
export default {
  data() {
    return {};
  },
  components: { ComponentLocalNet, ComponentServer, ComponentFunction },
  methods: {

  },
  created() {
    // this.getLocalNetData();
  }
};
</script>

<style>

</style>
