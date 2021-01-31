<script>
const svgFiles = require.context("@/assets/svg", false, /\.svg/);
svgFiles.keys().forEach(filename => svgFiles(filename));

export default {
  functional: true,

  name: "SvgIcon",

  render(h, context) {
    return (
      <svg class="svg-icon" aria-hidden="true" {...{ ...context.data }}>
        <use {...{ attrs: { "xlink:href": `#${context.props.name}` } }} />
      </svg>
    );
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}
</style>
