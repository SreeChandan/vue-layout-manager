import LayoutManager from "./components/LayoutManager.vue";
import Vue from "vue";
import { VueConstructor } from "vue";
export { LayoutManager };
const plugin = {
  install: (VueInstance: VueConstructor, options?: { customName: string }) => {
    VueInstance.component(
      options?.customName ? options.customName : "LayoutManager",
      LayoutManager
    );
  },
};
export default plugin;
