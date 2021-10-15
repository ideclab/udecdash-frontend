<template>
  <svg
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="width"
    :height="height"
    :viewBox="viewBox"
  >
    <defs>
      <clipPath id="clip-path">
        <rect class="cls-1" x="526.59" y="-1147.38" width="1366" height="768" />
      </clipPath>
      <clipPath id="clip-path-2">
        <rect class="cls-1" x="526.59" y="-179.38" width="1366" height="768" />
      </clipPath>
        <clipPath id="clip-path">
            <rect class="cls-1" x="484.44" y="-1020.41" width="1366" height="768" />
        </clipPath>
        <clipPath id="clip-path-2">
            <rect class="cls-1" x="-1535.33" y="-1020.41" width="1366" height="768" />
        </clipPath>
        <clipPath id="clip-path-3">
            <rect class="cls-1" x="-1535.33" y="-52.41" width="1366" height="768" />
        </clipPath>
    </defs>
    <title :id="iconName" lang="en">{{ iconName }}</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    iconName: {
      type: String,
      default: ""
    },
    width: {
      type: [Number, String],
      default: 18
    },
    height: {
      type: [Number, String],
      default: 18
    },
    iconColor: {
      type: String,
      default: "currentColor"
    },
    viewBox:{
       type: String,
      default: '0 0 24 28.47'
    }
  }
};
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px; /* yes, I'm that particular about formatting */
}
.cls-1 {
  fill: none;
}

.cls-2 {
  isolation: isolate;
}

.cls-3 {
  clip-path: url(#clip-path);
}

.cls-4 {
  opacity: 0.95;
  mix-blend-mode: multiply;
}

.cls-5 {
  clip-path: url(#clip-path-2);
}

.cls-6 {
  fill: #e6e6e6;
  opacity: 0.43;
}

.cls-7 {
  fill: #706f6f;
}
</style>
