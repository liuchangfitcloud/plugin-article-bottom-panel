<template>
    <div v-if="setting.showBlock" class="justify-center items-center tip-card rounded" :class="setting.cardBorderAlign">
        <p class="font-bold text-lg px-6 py-4 title">{{ setting.info }}</p>

        <button v-if="setting.showBtn" class="btn mx-6 mb-4 p-2 rounded relative">
            <div v-if="setting.items.length > 0"
                :class="setting.items.length > 0 ? 'cursor-pointer ' + setting.tipsDirection : 'cursor-default'"
                class="tips rounded">
                <div class="flex flex-row justify-between p-4 tips-content">
                    <div v-for="im in setting.items" :key="im.name"
                        class="flex flex-col justify-center items-center text-center px-2">
                        <span class="text-sm">{{ im.name }}</span>
                        <img class="icon" :src="im.image" />
                        <span class="text-xs pt-1">{{ im.desc }}</span>
                    </div>
                </div>
            </div>
            <div class="flex justify-center items-center">
                <box-icon :name='setting.btnIcon' class="btn-icon" :color="setting.btnTextColor"></box-icon>
                <span class="ml-1 text-xs">{{ setting.btnName }}</span>
            </div>
        </button>
    </div>
</template>
<script setup lang="ts">
import 'boxicons'
import { ref } from 'vue'
import axios from 'axios'


type TipItem = {
    name: string,
    image: string,
    desc: string
}

type ConfigSetting = {
    showBlock: boolean,
    info: string,
    showBtn: boolean,
    btnIcon: string,
    btnName: string,
    bgColor: string,
    titleTextColor: string,
    cardBorderAlign: string,
    btnBgColor: string,
    btnTextColor: string,
    tipsDirection: string,
    tipsBgColor: string,
    tipsTextColor: string,
    borderColor: string,
    items: TipItem[]
}
const setting = ref<ConfigSetting>({
    showBlock: false,
    info: "如果觉得我的文章对您有用，请随意赞赏。您的支持将鼓励我继续创作!",
    showBtn: false,
    btnIcon: "gift",
    btnName: "支持赞赏",
    bgColor: "#eee",
    titleTextColor: "#000",
    btnTextColor: "#fff",
    btnBgColor: "#e99e60",
    tipsTextColor: "#111",
    tipsBgColor: "#fff",
    cardBorderAlign: "left",
    tipsDirection: 'mid',
    borderColor: "#ccc",
    items: []
})

const init = async () => {
    const { data } = await axios.get("/apis/post.sponsor.halo.run/v1alpha1/anonymous/info", {
        withCredentials: true
    })
    setting.value = data
}

init()
</script>
<style lang="css" scoped>
/* @import url(../style/tailwind.css); */

.tip-card {
    --border-color: v-bind(setting.borderColor);
    --bg-color: v-bind(setting.bgColor);
    --title-text-color: v-bind(setting.titleTextColor);
    --btn-text-color: v-bind(setting.btnTextColor);
    --tips-text-color: v-bind(setting.tipsTextColor);
    --tips-bg-color: v-bind(setting.tipsBgColor);
    --btn-bg-color: v-bind(setting.btnBgColor);
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
    z-index: 999;
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
    background: var(--tips-bg-color);
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