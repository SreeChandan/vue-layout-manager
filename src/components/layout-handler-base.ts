import Vue from "vue";
import { VNode } from "vue";
import cloneDeep from "lodash/cloneDeep";

function typedData() {
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
    gap: { type: String, default: "0px" },
    gridElementStyle: Object,
    gridSpacersStyle: Object,
  },
  data(): Record<string, unknown> {
    const partialData = typedData();
    return Object.assign({}, partialData, {
      //
    });
  },
  computed: {
    rawOrdersSorted(): GridElement[] | undefined {
      let r: GridElement[] = [];
      if (cloneDeep) {
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
      } else return undefined;
    },
    fillers(): GridElement[] | undefined {
      if (this.rawOrdersSorted) {
        const res: GridElement[] = [];
        this.rawOrdersSorted.forEach((value, index) => {
          /**
           * -1 => true
           * @type {Boolean}
           */
          const condition1 =
            value.position < 0 && this.rawOrdersSorted!.length === 1;

          /**
           * 1 => true
           * @type {Boolean}
           */
          const condition3 =
            value.position > 0 && this.rawOrdersSorted!.length === 1;

          /**
           * 1 , 3 => true | 1 , 2 => false | -3, -1 => true
           * @type {Boolean}
           */
          const condition2 =
            index < this.rawOrdersSorted!.length - 1 &&
            Math.abs(
              this.rawOrdersSorted![index + 1].position - value.position
            ) > 1;

          //console.table({ condition1, condition2, condition3 });
          //
          if (condition1) res.push({ name: value.name, position: index - 1 });
          else if (condition3 || condition2 || condition3) {
            res.push({ name: value.name, position: index });
          }
        });
        return res;
      } else return undefined;
    },
    finalOrders(): GridElement[] | undefined {
      if (this.fillers && this.gridElements && this.rawOrdersSorted) {
        /**
         * @type {Array}
         */
        const res: GridElement[] = [];
        this.rawOrdersSorted.forEach((value) => {
          res.push(value);
        });
        //console.log("-------------------------------------");
        //console.table(res);
        this.fillers.forEach((value, index) => {
          //console.log(value);
          const val = value.position;
          if (this.gridElements.length === 1) {
            if (val < 0) res.unshift({ name: "filler", position: 1 });
            else res.push({ name: "filler", position: -1 });
          } else {
            // -3, -1 : filler 0 => -3, -2 , -1
            //console.table(res);
            //console.table({ val, index });
            if (val === -1) {
              res.unshift({ name: "filler", position: 1 });
            } else {
              const fillerVal = res[val + index].position + 1;
              res.splice(val + index + 1, 0, {
                name: "filler",
                position: fillerVal,
              });
            }
            //console.table(res);
          }
          //console.table(res);
        });
        //console.table(res);
        res.forEach((value, index) => {
          const val = value.position;
          if (val < 0)
            if (index !== 0)
              res[index] = {
                name: value.name,
                position: res[index - 1].position + 1,
              };
            else res[index] = { name: value.name, position: 1 };
        });
        //console.table(res);
        //console.log("-------------------------------------");
        return res;
      } else return [];
    },
    fillersFinal(): GridElement[] | undefined {
      return this.fillers?.map((value, index) => {
        return { name: value.name, position: value.position + index };
      });
    },
    gridElementsOrders(): Record<string, GridElement["position"]> {
      const res: Record<string, GridElement["position"]> = {};
      this.fillers?.forEach((value) => {
        this.finalOrders?.forEach((value2) => {
          res[value2.name] = value2.position;
        });
      });
      return res;
    },
    gridTemplate(): string {
      if (this.finalOrders && this.gridElements) {
        if (this.finalOrders.length === 0) return "auto";

        //let res = this.gridElements.map(() => "auto");
        const res: string[] = [];
        this.finalOrders.forEach(() => {
          res.push("auto");
        });
        //console.log("-------------------------------------");
        //console.table(res);
        (this.gridElements as GridElement[]).forEach((value) => {
          let pos = value.position;
          pos = pos > 0 ? pos - 1 : res.length + pos;
          if (this.fillers && this.fillers.some((v) => v.position === pos)) {
            res[pos + 1] = "auto";
            res[pos + 2] = "max-content";
          }
          res[pos] = "max-content";
        });
        //console.table(res);
        let resF = "";
        res.forEach(
          (value2, index) =>
            (resF += value2 + (index + 1 < res.length ? " " : ""))
        );
        //console.log("-------------------------------------");
        return resF;
      }
      return "unset";
    },
  },
  // doing: creating the template
  render: function (createElement): VNode {
    return createElement(
      "ul",
      {
        class: "gridContainer",
        style: {
          "--gridTemplateRows": this.axis === "y" ? this.gridTemplate : "none",
          "--gridTemplateColumns":
            this.axis === "x" ? this.gridTemplate : "none",
          "--rowGaps": this.axis === "y" ? this.gap : "0px",
          "--columnGaps": this.axis === "x" ? this.gap : "0px",
        },
      },
      [
        ...(this.finalOrders
          ? this.gridElements.map((value, index) => {
              const val = value as GridElement;
              return createElement(
                "li",
                {
                  class: "gridElement",
                  key: index,
                  style: Object.assign(
                    {},
                    this.gridElementStyle ? this.gridElementStyle : {},
                    {
                      order: this.gridElementsOrders[val.name],
                      "--border-radius": "unset",
                    }
                  ),
                },
                [this.$slots[val.name]]
                //Object.values(this.$slots)
              );
            })
          : []),
        ...(this.fillersFinal
          ? this.fillersFinal.map((filler, index) => {
              return createElement("li", {
                class: "gridElementSpacer",
                key: "filler" + index,
                style: Object.assign(
                  {},
                  this.gridSpacersStyle ? this.gridSpacersStyle : {},
                  {
                    order: this.finalOrders
                      ? this.finalOrders[filler.position + 1].position
                      : 0,
                  }
                ),
              });
            })
          : []),
      ]
    );
  },
  mounted() {
    //cloneDeepimporter();
  },
});
