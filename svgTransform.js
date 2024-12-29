import path from "path"

export default {
  process(sourcePath) {
    return {
      code: `module.exports = ${JSON.stringify(path.basename(sourcePath))};`,
    }
  },
  getCacheKey() {
    return "svgTransform"
  },
}
