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
  border-radius: var(--border-radius, unset);
}
.gridElementSpacer {
  pointer-events: none;
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
