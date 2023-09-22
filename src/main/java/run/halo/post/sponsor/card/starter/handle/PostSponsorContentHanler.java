package run.halo.post.sponsor.card.starter.handle;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
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
@Order(Ordered.LOWEST_PRECEDENCE-1)
@RequiredArgsConstructor
public class PostSponsorContentHanler implements ReactivePostContentHandler {

    private final ReactiveExtensionClient client;
    private final String SETTING_CONFIG_NAME = "plugin-post-sponsor-card-configmap";
    private static final String config_group_name = "basic";

    @Override
    public Mono<PostContentContext> handle(PostContentContext postContent) {
        return client.fetch(ConfigMap.class, SETTING_CONFIG_NAME)
            .map(ConfigMap::getData)
            .filter(data -> data.containsKey(config_group_name))
            .map(data -> {
                String cd = data.get(config_group_name);
                return JsonUtils.jsonToObject(cd, Map.class);
            })
            .filter(map -> map.containsKey("showBlock") && (Boolean) map.get("showBlock"))
            .map(data -> {
                String content = postContent.getContent();
                StringBuffer body = new StringBuffer();
                body.append(
                    "<script src=\"/plugins/PluginPostSponsorCard/assets/static/post-sponsor-card"
                        + ".iife.js\"></script>");
                body.append("<div id=\"post-sponsor\"></div");
                postContent.setContent(content + body.toString());
                return postContent;
            }).thenReturn(postContent);
    }
}
