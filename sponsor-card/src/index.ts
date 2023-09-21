import { createApp } from "vue";
import SponsorCard from './components/SponsorCard.vue'
import "./style/index.css";

const initCard = () => {
    const element = document.querySelector("#post-sponsor");
    if (element) {
        if (element.shadowRoot) {
            return;
        }
        const shadowElement = element.attachShadow({ mode: "open" });
        const styleEl = document.createElement("link");
        styleEl.setAttribute("rel", "stylesheet");
        styleEl.setAttribute(
        "href",
        "/plugins/PluginPostSponsorCard/assets/static/style.css"
        );
        shadowElement.appendChild(styleEl);
        const formContainerElement = document.createElement("div");
        shadowElement.appendChild(formContainerElement);
        const app = createApp(SponsorCard);
        app.mount(formContainerElement);
    }
};

document.addEventListener(
  "DOMContentLoaded",
  () => {
    initCard();
  },
  { once: true }
);

document.addEventListener("pjax:success", () => {
  initCard();
});
