import Vue from "vue";
import { VNode } from "vue";
import { cloneDeep } from "lodash";
// import './layout-handler.css';

async function typedData() {
  return {};
}

interface GridElement {
  name: string;
  position: number;
}

function hasOwnProperties(obj: Record<string, unknown>, props: string[]) {
  let res = true;
  props.forEach((prop) => {
    res = Object.prototype.hasOwnProperty.call(obj, prop);
  });
  return res;
}

export const LayoutHandlerBase = Vue.extend({
  //
  name: "LayoutHandlerBase",
  props: {
    gridElements: {
      type: Array,
      required: true,
      validator: (prop: Record<string, unknown>[]): boolean =>
        prop.every((gridElement) =>
          hasOwnProperties(gridElement, ["name", "position"])
        ),
    },
    axis: {
      type: String,
      required: true,
      validator: (prop: string): boolean => ["x", "y"].includes(prop),
    },
  },
  data() {
    return Object.assign(typedData(), {
      //
    });
  },
  computed: {
    rawOrdersSorted(): GridElement[] {
      let r: GridElement[] = [];
      const gridElements = this.gridElements as GridElement[];
      r = cloneDeep(gridElements);
      /**
       * [1,5,2] => [1,2,5]
       * [-1,-5,-2] => [-5,-2,-1]
       * [1,5,2,-1,-2,-5] => [1,2,5,-5,-2,-1]
       */
      return r
        .filter((value) => value.position > 0)
        .sort((a, b) => a.position - b.position)
        .concat(
          ...r
            .filter((value) => value.position < 0)
            .sort((a, b) => a.position - b.position)
        );
    },
    fillers(): Array<Record<string, number>> {
      return [];
    },
    orders(): Array<Record<string, number>> {
      return [];
    },
    fillersFinal(): Array<Record<string, number>> {
      return [];
    },
    gridElementsOrders(): Record<string, unknown> {
      return {};
    },
    gridTemplate(): string {
      return "unset";
    },
  },
  // doing: creating the template
  render: function(createElement): VNode {
    return createElement(
      "section",
      {
        class: "gridContainer",
        style: {
          "--gridTemplateRows": this.axis === "y" ? this.gridTemplate : "none",
          "--gridTemplateColumns":
            this.axis === "x" ? this.gridTemplate : "none",
        },
      },
      [
        ...this.gridElements.map((value, index) => {
          const val = value as GridElement;
          return createElement(
            "div",
            {
              class: "gridElement",
              key: index,
              style: {
                order: this.gridElementsOrders[val.name],
              },
            },
            [createElement("slot", { slot: val.name })]
            //Object.values(this.$slots)
          );
        }),
        ...this.fillersFinal.map((filler, index) => {
          return createElement("div", {
            class: "gridElementEmpty",
            key: "filler" + index,
            style: {
              order: Object.values(
                this.orders[Object.values(filler)[0] + 1]
              )[0],
            },
          });
        }),
      ]
    );
  },
});
// Vue.component('LayoutHandler', LayoutHandler);
