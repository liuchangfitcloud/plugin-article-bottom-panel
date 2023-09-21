package run.halo.article.bottom.panel.starter.handle;

import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ConfigMap;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.infra.utils.JsonUtils;
import run.halo.app.theme.ReactivePostContentHandler;

/**
 * 文章内容追加数据
 *
 * @author ShrChang.Liu
 * @version v1.0
 * @date 2023/9/7 3:06 PM
 **/
@Component
@RequiredArgsConstructor
public class ArticleBottomPanelContentHanler implements ReactivePostContentHandler {

    private final ReactiveExtensionClient client;
    private final String SETTING_CONFIG_NAME = "plugin-article-bottom-panel-configmap";

    @Override
    public Mono<PostContentContext> handle(PostContentContext postContent) {
        return client.fetch(ConfigMap.class, SETTING_CONFIG_NAME)
                .map(ConfigMap::getData)
                .filter(data -> data.containsKey("basic"))
                .map(data -> {
                    String cd = data.get("basic");
                    return JsonUtils.jsonToObject(cd, Map.class);
                })
                .filter(map -> map.containsKey("show_block") && (Boolean) map.get("show_block"))
                .map(data -> {
                    String content = postContent.getContent();
                    String scriptEnd = "></charlie-article-panel>";
                    String scripStart = "<charlie-article-panel";
                    if (data.containsKey("info")) {
                        scripStart = scripStart + " info='" + data.get("info") + "'";
                    }
                    if (data.containsKey("show_btn")) {
                        scripStart = scripStart + " show-btn";
                    }
                    if (data.containsKey("btn_name")) {
                        scripStart = scripStart + " btn-name='" + data.get("btn_name") + "'";
                    }
                    if (data.containsKey("btn_icon")) {
                        scripStart = scripStart + " btn-icon='" + data.get("btn_icon") + "'";
                    }
                    if (data.containsKey("items")) {
                        List<Map> items = (List<Map>) data.get("items");
                        scripStart = scripStart + " items='" + JsonUtils.objectToJson(items) + "'";
                    }
                    // 获取初始化值
                    BasicStyle style = BasicStyle.builder().build();
                    if (data.containsKey("bg_color")) {
                        style.setBgColor(data.get("bg_color") + "");
                    }
                    if (data.containsKey("title_text_color")) {
                        style.setTitleTextColor(data.get("title_text_color") + "");
                    }
                    if (data.containsKey("card_border_align")) {
                        style.setCardBorderAlign(data.get("card_border_align") + "");
                    }
                    if (data.containsKey("btn_bg_color")) {
                        style.setBtnBgColor(data.get("btn_bg_color") + "");
                    }
                    if (data.containsKey("btn_text_color")) {
                        style.setBtnTextColor(data.get("btn_text_color") + "");
                    }
                    if (data.containsKey("tips_direction")) {
                        style.setTipsDirection(data.get("tips_direction") + "");
                    }
                    if (data.containsKey("tips_bg_color")) {
                        style.setTipsBgColor(data.get("tips_bg_color") + "");
                    }
                    if (data.containsKey("tips_text_color")) {
                        style.setTipsTextColor(data.get("tips_text_color") + "");
                    }
                    if (data.containsKey("border_color")) {
                        style.setBorderColor(data.get("border_color") + "");
                    }
                    // 设置自定义样式
                    scripStart = scripStart + " card-style='" + JsonUtils.objectToJson(style) + "'";
                    content = content + scripStart + scriptEnd;
                    postContent.setContent(content);
                    return postContent;
                }).thenReturn(postContent);
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    static class BasicStyle {
        @Builder.Default
        private String borderColor = "#ccc";
        @Builder.Default
        private String bgColor = "#eee";
        @Builder.Default
        private String titleTextColor = "#000";
        @Builder.Default
        private String btnTextColor = "#fff";
        @Builder.Default
        private String btnBgColor = "#e99e60";
        @Builder.Default
        private String tipsTextColor = "#111";
        @Builder.Default
        private String tipsBgColor = "#fff";
        @Builder.Default
        private String cardBorderAlign = "left";
        @Builder.Default
        private String tipsDirection = "mid";
    }

}
