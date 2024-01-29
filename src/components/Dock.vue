<template>
  <div class="dock-container">
    <div class="hover-container">
        <div class="dock">
            <template v-for="item in dockItems">
                <div @click="changeSelectedDockItem(item.key)" :class="selectedDockItem == item.key?'dock-selected dock-item':'dock-item'">
                    <component :is="item.icon" />
                    <span> {{ item.text }} </span>
                </div>
            </template>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Home28Regular from "@vicons/fluent/Home28Regular"
import LogoGithub from "@vicons/ionicons4/LogoGithub"
import QqOutlined from "@vicons/antd/QqOutlined"
const selectedDockItem = ref('index')

const changeSelectedDockItem = (key: string) => {
    // selectedDockItem.value = key
    if (key == 'index') {
    } else if (key == 'Github') {
        window.open('https://github.com/openvpi')
    } else if (key == 'qq') {
        window.open("https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=By4ZsSG-9E00i-BfOnnD2VY2trNa6rH7&authKey=xeoKgfJsobQAnq6FCgcP%2BHy8lu4JNnjTNUqFO93f%2BS7cvBKVs2efz%2FQPSXq%2F%2BP5E&noverify=0&group_code=907879266")
    }
}

const dockItems = [
    {
        text: "首页",
        key: "index",
        icon: Home28Regular
    },
    {
        text: "Github",
        key: "Github",
        icon: LogoGithub
    },
    {
        text: "QQ",
        key: "qq",
        icon: QqOutlined
    }
]

</script>

<style lang="less" scoped>
.dock-container {
    position: fixed;
    /* 固定在页面左侧，垂直居中 */
    left: 0px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 888998888;
    .hover-container {
        --dock-item-height: 24px;
        padding: 32px 32px 32px 16px;
        
        .dock {
            background-color: rgba(251,251,251, 0.8);
            backdrop-filter: blur(99px);
            padding: 8px;
            overflow: hidden;
            border-radius: 16px;
            width: 38px;
            transition: all 0.2s, width 0.4s ease;
            
            /* 阴影 */
            box-shadow: 0 0 20px 14px rgba(0, 0, 0, 0.1);
            --dock-item-hover-background: rgba(209, 209, 209, 0.5);
            .dock-item {
                padding: 2px;
                display: flex;
                min-width: fit-content;
                flex: 0;
                border-radius: 10px;
                align-items: center;
                
                svg {
                    width: var(--dock-item-height);
                    height: var(--dock-item-height);
                    color: black;
                    transition: all 0.2s, color 0.1s ease;
                    border-radius: 999px;
                    padding: 6px;
                }

                span {
                    margin-left: 16px;
                    word-break: keep-all;
                    user-select: none;
                }
            }

            .dock-item + .dock-item {
                margin-top: 2px;
            }

            .dock-item.dock-selected {
                --dock-item-hover-background: rgba(0, 183, 255, 0.5);
                svg {
                    background-color: rgba(0, 183, 255, 0.5);
                }
            }
            
            .dock-item:hover {
                background-color: var(--dock-item-hover-background);
            }
            .dock-item:hover.dock-selected {
                svg {
                    box-shadow: 0 0 6px 3px rgba(0, 0, 0, 0.1);    
                    background-color: rgba(0, 117, 163, 0.568);
                }
            }
        }
    }
    .hover-container:hover {
        --dock-item-height: 30px;
        .dock {
            width: 130px;
        }
    }
}
</style>