<template>
  <div class="index-container" :style="`grid-template-columns: repeat(${col_num}, 1fr);`">
    <Search v-model:search_val="search_val"></Search>
    <template v-for="item in processed_models">
      <Link
        :model="item"
        :style="{
          left: full_screen_model_id === item.id ? '100px' : pos[item.id].x + 'px',
          top: full_screen_model_id === item.id ? `${Number(scrolledY)+120}px` : pos[item.id].y + 'px',
          width: full_screen_model_id === item.id ? `calc(100vw - 200px)` : widths[item.id] + 'px',
          opacity: visible_models_id.indexOf(item.id) === -1 ? 0 : 1,
          'z-index': full_screen_model_id === item.id ? 99999999 : 0,
          height: full_screen_model_id === item.id ? `calc(100vh - 200px)` : undefined,
          position: full_screen_model_id === item.id ? 'absolute' : 'absolute',
          transition: full_screen_model_id === item.id ? 'all 0.5s cubic-bezier(0.16, 0.02, 0, 0.99)' : 'all 0.3s ease-in-out',
        }"
        ref="model_refs"
        :is_full_screen="full_screen_model_id === item.id"
        @click="openLink(item.link)"
        ></Link>
        <!-- @click="() => full_screen_model_id == item.id? full_screen_model_id = -1  : full_screen_model_id = item.id" -->
    </template> 
    <div class="empty" v-if="visible_models_id.length == 0">
      好像没有你想要的呢
    </div>
  </div>
</template>

<script lang="ts" setup>
import { VNodeRef, ref, watch } from 'vue';

import Link from '../components/Link.vue';
import links from '../links.json'
import { LinkType } from '../types';
import Search from "../components/Search.vue"

const openLink = (link: string) => {
  window.open(link)
}

const col_num = ref(0)

const processed_models = ref<(LinkType & { id: number })[]>([])
const visible_models_id = ref<Number[]>([])

const pos = ref<Record<number,{ x: number, y: number }>>({})
const widths = ref<Record<number, number>>({})

const gap = 20
const padding_left = 100
const padding_right = 100
const padding_top = 128

const full_screen_model_id = ref(-1)
const model_refs = ref<Record<number, VNodeRef>>({})

watch(full_screen_model_id, (val) => {
  if (val !== -1) {
    // 给 body 加上 overflow: hidden
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
})
// @ts-ignore
let observer: IntersectionObserver | null = null;

// @ts-ignore
function debounce(fn: any, delay=100) {
  // @ts-ignore
  let timer = null
  const _debounce = function() {
  // @ts-ignore
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn()
    }, delay)
  }

  return _debounce
}
for (const i in links) {
  // @ts-ignore
  processed_models.value.push({
    ...links[i],
  // @ts-ignore
    id: Number(i)
  })
  visible_models_id.value.push(Number(i))
}

const scrolledY = ref("0")

window.onscroll = () => {
  scrolledY.value = window.scrollY.toFixed()
}

// 根据窗口宽度计算列数
const calcColNum = () => {
  const width = window.innerWidth
  if (width < 768) {
      col_num.value = 1
  } else if (width < 992) {
      col_num.value = 2
  } else if (width < 1400) {
      col_num.value = 3
  } else {
      col_num.value = 4
  }
  console.log("col_num", col_num.value);

  // 给每个 model 计算位置
  const col_width = (width - padding_left - gap * (col_num.value - 1) - padding_right) / col_num.value
  const row_height = 300
  var real_i = 0
  for (const i in processed_models.value) {
    const row = Math.floor(Number(real_i) / col_num.value)
    const col = Number(real_i) % col_num.value
    if (visible_models_id.value.indexOf(processed_models.value[i].id) === -1) {
      // 移动到正中央
      pos.value[processed_models.value[i].id] = {
        x: window.innerWidth / 2,
        y: 120
      }
      widths.value[processed_models.value[i].id] = 0
      continue
    }
    pos.value[processed_models.value[i].id] = {
      x: padding_left + col * (col_width + gap),
      y: row * (row_height + gap) + padding_top
    }
    widths.value[processed_models.value[i].id] = col_width
    real_i ++;
  }

  return calcColNum
}
window.onresize = calcColNum()

const search_val = ref("")
const search = (val: string) => {
  console.log(search_val);
  
  search_val.value = val
  if (val === "") {
    visible_models_id.value = processed_models.value.map(item => item.id)
  } else {
    visible_models_id.value = processed_models.value.filter(item => item.title.indexOf(val) !== -1 || item.desc.indexOf(val) !== -1).map(item => item.id)
  }
  calcColNum()
}
// @ts-ignore
window.calcColNum = calcColNum
watch(search_val, search)
</script>

<style lang="less" scoped>
.index-container {
  /* grid */

  .empty {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }
}

</style>