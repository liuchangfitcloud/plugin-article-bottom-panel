package run.halo.post.sponsor.card.starter.endpoint;

import lombok.RequiredArgsConstructor;
import org.springdoc.webflux.core.fn.SpringdocRouteBuilder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RequestPredicates;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.endpoint.CustomEndpoint;
import run.halo.app.extension.ConfigMap;
import run.halo.app.extension.GroupVersion;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.infra.utils.JsonUtils;
import run.halo.post.sponsor.card.starter.entity.PostSponsorAttribute;

/**
 * 匿名类
 *
 * @author ShrChang.Liu
 * @version v1.0
 * @date 2023/9/21 4:45 PM
 **/
@Component
@RequiredArgsConstructor
public class AnonymousPostSponsorEndpoint implements CustomEndpoint {

    private final String tag = "post.sponsor.halo.run/v1alpha1/post/sponsor";
    private final static String apiGroupVersion = "post.sponsor.halo.run/v1alpha1";
    private final ReactiveExtensionClient client;
    private static final String config_map_name = "plugin-post-sponsor-card-configmap";
    private static final String config_group_name = "basic";

    @Override
    public GroupVersion groupVersion() {
        return GroupVersion.parseAPIVersion(apiGroupVersion);
    }


    @Override
    public RouterFunction<ServerResponse> endpoint() {
        return SpringdocRouteBuilder.route()
            .nest(RequestPredicates.path("/anonymous"), this::nested,
                builder -> builder.operationId("PostSponsorCardPlugin")
                    .description("post sponsor card plugin anonymous endpoints").tag(tag)
            )
            .build();
    }

    RouterFunction<ServerResponse> nested() {
        return SpringdocRouteBuilder.route()
            .GET("/info", this::getInfo, builder -> builder.operationId("get config info")
                .description("获取配置的信息")
                .tag(tag))
            .build();
    }

    Mono<ServerResponse> getInfo(ServerRequest serverRequest) {
        return client.fetch(ConfigMap.class, config_map_name)
            .filter(cm -> !cm.getData().isEmpty() && cm.getData().containsKey(config_group_name))
            .map(ConfigMap::getData)
            .map(map -> map.get(config_group_name))
            .flatMap(json -> {
                PostSponsorAttribute postSponsorAttribute =
                    JsonUtils.jsonToObject(json, PostSponsorAttribute.class);
                return ServerResponse.ok().bodyValue(JsonUtils.objectToJson(postSponsorAttribute));
            })
            .switchIfEmpty(ServerResponse.badRequest().bodyValue("error"));
    }
}
