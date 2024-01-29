<template>
  <div class="tag-container" :style="{
    backgroundColor: color,
  }">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const props = defineProps({
    type: {
        type: String
    }
})
const Type2Color: Record<string,string> = {
    "sovits": "#FFC0CB",
    "diffusionsvc": "rgb(244,184,188)",
    "fishspeech": "rgb(238,203,128)",
    "ddsp": "rgb(120,146,180)",
    "gptsovits": "rgb(217,131,128)",
    "bertvits": "rgb(64,169,168)",
    "package": "rgb(120,138,96)"
}

const color = ref(props.type? Type2Color[props.type]: "#ccc")
</script>

<style lang="less" scoped>
.tag-container {
    height: 24px;
    width: fit-content;
    padding: 2px 6px;
    border-radius: 9px;
    margin: 4px;
}
</style>