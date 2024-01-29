<template>
  <div
    class="modelcard-container"
    ref="container"
  >
    <div class="top-bg">{{ props.model.title }}</div>
    <div class="bottom-bg" :style="{
      'background-image': 'url(' + (props.model.img? props.model.img: 'placeholder.png') + ')'
    }">
      <div class="desc">
        {{ props.model.desc }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  model: {
      type: Object,
      required: true
  },
  is_full_screen: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="less" scoped>
.modelcard-container {
  background-color: antiquewhite;
  height: 300px;
  position: absolute;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 20px 0 rgb(0 0 0 / 40%);
  }
  .top-bg {
    background-color: rgb(221,244,255);
    height: 30px;
    font-size: 24px;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    padding: 10px;
  }
  .bottom-bg {
    background-color: antiquewhite;
    height: 270px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    .desc {
      background-color: rgba(250, 235, 215, 0.253);
      height: auto;
      padding: 10px;
      width: 100%;
      position: absolute;
      backdrop-filter: blur(10px);
    }
  }
}
</style>