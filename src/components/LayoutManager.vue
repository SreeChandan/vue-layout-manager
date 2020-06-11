<script>
import { LayoutHandlerBase } from "./layout-handler-base";
export default {
  name: "LayoutManager",
  extends: LayoutHandlerBase,
};
</script>

<style lang="scss" scoped>
.gridContainer {
  display: grid;

  height: 100%;
  width: 100%;
  min-height: inherit;
  min-width: inherit;

  grid-template-rows: var(--gridTemplateRows);
  grid-template-columns: var(--gridTemplateColumns);
  column-gap: var(--columnGaps);
  row-gap: var(--rowGaps);

  border-radius: inherit;
}
.gridContainer,
.gridElementSpacer,
.gridElement {
  box-sizing: border-box;
  position: relative;
}
.gridElement {
  order: var(--order);
  border-top-left-radius: var(--border-top-left-radius, inherit);
  border-top-right-radius: var(--border-top-right-radius, inherit);
  border-bottom-left-radius: var(--border-bottom-left-radius, inherit);
  border-bottom-right-radius: var(--border-bottom-right-radius, inherit);
}
.gridElementSpacer {
  pointer-events: none;
  order: var(--order);
}
ol,
ul {
  list-style-type: none;
}
ol,
ul,
li {
  margin: 0px;
  padding: 0px;
}
</style>
