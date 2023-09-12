<template>
    <div class="justify-center items-center tip-card rounded" :class="customCss.cardBorderAlign">
        <p class="font-bold text-lg px-6 py-4 title">{{ info }}</p>

        <button v-if="showBtn" class="btn mx-6 mb-4 p-2 rounded relative">
            <div v-if="tipItems.length > 0"
                :class="tipItems.length > 0 ? 'cursor-pointer ' + customCss.tipsDirection : 'cursor-default'"
                class="tips rounded">
                <div class="flex flex-row justify-between p-4 tips-content">
                    <div v-for="im in tipItems" :key="im.name"
                        class="flex flex-col justify-center items-center text-center px-2">
                        <span class="text-sm">{{ im.name }}</span>
                        <img class="icon" :src="im.image" />
                        <span class="text-xs pt-1">{{ im.desc }}</span>
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center">
                <box-icon :name='btnIcon' class="btn-icon" color='#ffffff'></box-icon>
                <span class="ml-1 text-xs">{{ btnName }}</span>
            </div>
        </button>
    </div>
</template>
<script setup lang="ts">
import 'boxicons'
import { ref } from 'vue'

const props = withDefaults(defineProps<{
    info: string,
    btnName: string,
    showBtn: boolean,
    btnIcon: string,
    items: string,
    cardStyle: string
}>(), {
    info: '如果觉得我的文章对您有用，请随意赞赏。您的支持将鼓励我继续创作!',
    btnName: '赞赏支持',
    btnIcon: 'gift',
    showBtn: false,
    items: '[]',
    cardStyle: '{"borderColor": "#ccc","bgColor": "#eee","titleTextColor": "#000","btnTextColor": "#fff","btnBgColor": "#e99e60","tipsTextColor": "#111","tipsBgColor": "#fff","cardBorderAlign": "left","tipsDirection": "mid"}'
});


type TipItem = {
    name: string,
    image: string,
    desc: string
}

const tipItems = ref<TipItem[]>([])
tipItems.value = JSON.parse(props.items) as TipItem[]

type CardStyle = {
    borderColor: string,
    bgColor: string,
    titleTextColor: string,
    btnTextColor: string,
    btnBgColor: string,
    tipsTextColor: string,
    tipsBgColor: string,
    cardBorderAlign: string,
    tipsDirection: string,
}
const customCss = ref<CardStyle>({
    borderColor: "#ccc",
    bgColor: "#eee",
    titleTextColor: "#000",
    btnTextColor: "#fff",
    btnBgColor: "#e99e60",
    tipsTextColor: "#111",
    tipsBgColor: "#fff",
    cardBorderAlign: "left",
    tipsDirection: 'mid'
})
customCss.value = JSON.parse(props.cardStyle) as CardStyle
</script>
<style tailwind lang="less">
@tailwind base;
@tailwind components;
@tailwind utilities;

.tip-card {
    --border-color: v-bind(customCss.borderColor);
    --bg-color: v-bind(customCss.bgColor);
    --title-text-color: v-bind(customCss.titleTextColor);
    --btn-text-color: v-bind(customCss.btnTextColor);
    --tips-text-color: v-bind(customCss.tipsTextColor);
    --tips-bg-color: v-bind(customCss.tipsBgColor);
    --btn-bg-color: v-bind(customCss.btnBgColor);
    position: relative;
    background-color: var(--bg-color);
}

.tip-card::before {
    content: "";
    height: 100%;
    width: 0.25rem;
    position: absolute;
    background-color: var(--btn-bg-color)
}

.tip-card.left::before {
    left: 0;
}

.tip-card.right::before {
    right: 0;
}

.title {
    color: var(--title-text-color);
}

.tips {
    position: absolute;
    display: none;
    z-index: 10;
    background-color: var(--tips-bg-color);
    border: 1px solid var(--border-color);
    filter: drop-shadow(1px 1px 1px var(--border-color));
    transition: all .3s;
    color: var(--tips-text-color);
}

.tips.left {
    right: calc(100% + 0.5rem);
    bottom: calc(100% - 2rem);
}

.tips.right {
    left: calc(100% + 0.5rem);
    bottom: calc(100% - 2rem);
}

.tips.mid {
    left: 50%;
    transform: translateX(-50%);
    bottom: calc(100% + 10px);
}

.tips .icon {
    width: 10rem;
    max-width: inherit;
    height: 10rem;
    margin-top: 0.25rem;
}

.tips-content {
    position: relative;
}

.tips-content::before {
    content: "";
    position: absolute;
    width: 0.5rem;
    height: 0.5rem;
    background: #fff;
    border-radius: 1px;
}

.tips.mid>.tips-content::before {
    left: 50%;
    transform: rotate(45deg);
    bottom: -0.25rem;
    border-bottom: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
}

.tips.left>.tips-content::before {
    right: -0.25rem;
    bottom: 0.5rem;
    transform: rotate(45deg);
    border-top: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
}

.tips.right>.tips-content::before {
    left: -0.25rem;
    bottom: 0.5rem;
    transform: rotate(45deg);
    border-bottom: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
}

.btn {
    height: auto;
    background-color: var(--btn-bg-color);
    color: var(--btn-text-color)
}

.btn:hover .tips {
    display: flex;
}

.btn-icon {
    width: 14px;
}
</style>