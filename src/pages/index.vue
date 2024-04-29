<template>
  <div class="index-container" :style="`grid-template-columns: repeat(${col_num}, 1fr);`">
    <Search v-model:search_val="search_val"></Search>
    <template v-for="item in processed_models">
      <Link
        :model="item"
        :style="styles[item.id]"
        ref="model_refs"
        :is_full_screen="false"
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
import { VNodeRef, onMounted, ref, watch } from 'vue';

import Link from '../components/Link.vue';
import links from '../links.json'
import { LinkType } from '../types';
import Search from "../components/Search.vue"

const openLink = (link: string) => {
  window.open(link)
}

const col_num = ref(0)

const gap = 20
const padding_left = 100
const padding_right = 100
const padding_top = 128

const full_screen_model_id = ref(-1)
const model_refs = ref<Record<number, VNodeRef>>({})

const visible_models_id = ref<Record<number, boolean>>({})
const processed_models = ref<(LinkType & { id: number })[]>([])

const styles = ref<Record<number, any>>({})

watch(full_screen_model_id, (val) => {
  if (val !== -1) {
    // 给 body 加上 overflow: hidden
    document.body.style.overflow = "hidden"
  } else {
    document.body.style.overflow = "auto"
  }
})

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

function init() {
  for (const i in links) {
    // @ts-ignore
    processed_models.value.push({
      ...links[i],
    // @ts-ignore
      id: Number(i)
    })
    visible_models_id.value[Number(i)] = true
  }
}

const calcCardStyle = () => {
  console.log("visible_models_id",visible_models_id.value);
  const width = window.innerWidth
  const card_width = (width - padding_left - padding_right - (col_num.value - 1) * gap) / col_num.value
  const card_height = card_width * 9 / 16

  var cur_col = 0
  var cur_row = 0
  var animate_card_num = 0

  for (const i in processed_models.value) {
    if (!visible_models_id.value[i]) {
      if (animate_card_num > 3) {
        // 隐藏
        styles.value[processed_models.value[i].id] = {
          display: "none"
        }
      } else {
        // 隐藏并移动到中央
        styles.value[processed_models.value[i].id] = {
          opacity: 0,
          top: `56px`,
          left: `${window.innerWidth / 2 - card_width / 2}px`,
        }
        animate_card_num ++;
      }
      continue
    }
    const model = processed_models.value[i]
    const x = padding_left + cur_col * (card_width + gap)
    const y = padding_top + cur_row * (card_height + gap)
    styles.value[model.id] = {
      width: `${card_width}px`,
      height: `${card_height}px`,
      top: `${y}px`,
      left: `${x}px`,
      transition: "all 0.5s",
    }
    if (cur_col === col_num.value - 1) {
      cur_col = 0
      cur_row += 1
    } else {
      cur_col += 1
    }
  }
  console.log("calcCardStyle", styles);
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

  calcCardStyle(  )

  return calcColNum
}


window.onresize = calcColNum()

const search_val = ref("")
const search = (val: string) => {
  console.log(search_val.value);
  
  search_val.value = val
  visible_models_id.value = {}
  if (val === "") {
    processed_models.value.map(item => visible_models_id.value[item.id] = true)
  } else {
    processed_models.value.filter(item => item.title.toLowerCase().indexOf(val) !== -1 || item.desc.toLowerCase().indexOf(val) !== -1).map(item => visible_models_id.value[item.id] = true)
  }
  calcColNum()
  calcCardStyle()
}
watch(search_val, search)

onMounted(() => {
  init()
  calcColNum()
})
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