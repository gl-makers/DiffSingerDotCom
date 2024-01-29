<template>
  <div class="search-container">
    <div class="search">
        <Search12Regular class="icon"></Search12Regular>
        <input type="text" class="inp" v-model="val">
        <div class="btn">
            <button>搜索</button>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Search12Regular from "@vicons/fluent/Search12Regular"

const emits = defineEmits(["update:search_val"])

const val = ref("")

watch(val, (newVal) => {
    emits('update:search_val', newVal)
})
</script>

<style lang="less" scoped>
.search-container {
    width: 100vw;
    height: 120px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-content: center;
    position: fixed;
    z-index: 0999999;
    .search {
        backdrop-filter: blur(9px);
        box-shadow: 0 0 10px 0 rgb(0 0 0 / 20%);
        width: 80%;
        max-width: 800px;
        background-color: rgb(215 215 215 / 56%);
        border-radius: 999px;
        height: 48px;
        display: flex;
        .icon {
            padding: 12px;
            width: 24px;
            height: 24px;
        }
        .inp {
            width: calc(100% - 32px - 78px);
            height: 100%;
            border: none;
            background-color: transparent;
            font-size: 20px;
            color: black;
            outline: none;
        }
        .btn {
            padding: 8px;
            button {
                width: 78px;
                height: 100%;
                border: none;
                background-color: rgba(0, 119, 167, 0.5);
                font-size: 14px;
                color: white;
                border-radius: 99999px;
                outline: none;
            }
        }
    }
}
</style>