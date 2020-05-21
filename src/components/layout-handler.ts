import Vue from 'vue';
import { cloneDeep } from 'lodash';

async function typedData() {
  return {};
}

interface gridElement {
  name: string;
  position: number;
}

function hasOwnProperties(obj: Record<string, unknown>, props: string[]) {
  let res = true;
  props.forEach(prop => {
    res = Object.prototype.hasOwnProperty.call(obj, prop);
  });
  return res;
}

export const LayoutHandler = Vue.extend({
  //
  name: 'LayoutHandler',
  props: {
    gridElements: {
      type: Array,
      required: true,
      validator: (prop: Record<string, unknown>[]): boolean =>
        prop.every(gridElement => hasOwnProperties(gridElement, ['name', 'position'])),
    },
    axis: {
      type: String,
      required: true,
      validator: (prop: string): boolean => ['x', 'y'].includes(prop),
    },
  },
  data() {
    return Object.assign(typedData(), {
      //
    });
  },
  computed: {
    rawOrdersSorted(): gridElement[] {
      let r: gridElement[] = [];
      const gridElements = this.gridElements as gridElement[];
      r = cloneDeep(gridElements);
      /**
       * [1,5,2] => [1,2,5]
       * [-1,-5,-2] => [-5,-2,-1]
       * [1,5,2,-1,-2,-5] => [1,2,5,-5,-2,-1]
       */
      return r
        .filter(value => value.position > 0)
        .sort((a, b) => a.position - b.position)
        .concat(...r.filter(value => value.position < 0).sort((a, b) => a.position - b.position));
    },
  },
});
