<template>
  <div id="app">
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <LayoutManager
      id="mind-map-module-interface"
      :gridElements="gridElements"
      axis="y"
    >
      <template v-slot:[gridElements[0].name]>
        <div class="header-bar">
          <img
            alt="Vue logo"
            src="./assets/logo.png"
            :style="{ height: '20px' }"
          />
        </div>
      </template>
      <template v-slot:[gridElements[1].name]>
        <div class="status-bar" />
      </template>
      <template v-slot:[gridElements[2].name]>
        <div class="mid-UI-section">
          <div />
        </div>
      </template>
    </LayoutManager>
  </div>
</template>

<script lang="ts">
//import HelloWorld from "./components/HelloWorld.vue";
//import { LayoutManager } from "../dist/vue-layout-manager.umd";
import LayoutManager from "@/components/LayoutManager.vue";

export default {
  name: "app",
  components: {
    //HelloWorld
    LayoutManager,
  },
  data(): Record<string, unknown> {
    return {
      gridElements: [
        {
          name: "HeaderBar",
          position: 1,
        },
        {
          name: "StatusBar",
          position: -1,
        },
        {
          name: "midContent",
          position: 3,
        },
      ],
    };
  },
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
  margin: 0px;
  box-sizing: border-box;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.header-bar {
  height: 20px;
  border: 1px solid red;
}
.mid-UI-section {
  height: 40px;
  border: 1px solid red;
}
.status-bar {
  height: 20px;
  border: 1px solid red;
}
</style>
