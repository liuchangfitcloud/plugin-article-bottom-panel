import { defineCustomElement } from 'vue'
import ArticlePanelComponent from './components/ArticlePanel.ce.vue'

const ArticlePanel = defineCustomElement(ArticlePanelComponent)

customElements.define('charlie-article-panel', ArticlePanel)