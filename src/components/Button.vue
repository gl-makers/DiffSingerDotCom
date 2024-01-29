<template>
  <div class="btn-container">
    <div>
        <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
</script>

<style lang="less" scoped>
.btn-container {
    height: 40px;
    width: fit-content;
    padding: 2px 10px;
    border-radius: 9px;
    margin: 4px;
    background: linear-gradient(115deg, #c678dd 0%, #7973cf 100%);
    color: white;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
}
</style>