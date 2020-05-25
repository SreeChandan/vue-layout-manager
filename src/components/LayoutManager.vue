<script>
import { LayoutHandlerBase } from "./layout-handler-base";
export default {
  name: "LayoutManager",
  extends: LayoutHandlerBase
};
</script>

<style lang="scss">
.gridContainer {
  display: grid;

  height: 100%;
  width: 100%;

  grid-template-rows: var(--gridTemplateRows);
  grid-template-columns: var(--gridTemplateColumns);

  box-sizing: border-box;
  border-radius: inherit;
}
.gridElement {
  box-sizing: border-box;
}
</style>
