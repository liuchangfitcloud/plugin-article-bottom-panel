package run.halo.article.bottom.panel.starter.processor;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.model.IModel;
import org.thymeleaf.model.IModelFactory;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ConfigMap;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.infra.utils.JsonUtils;
import run.halo.app.theme.dialect.TemplateHeadProcessor;

/**
 * 添加对应的 js 到头部
 *
 * @author ShrChang.Liu
 * @version v1.0
 * @date 2023/9/7 2:51 PM
 **/
@Component
@RequiredArgsConstructor
public class ArticleHeadProcessor implements TemplateHeadProcessor {

    private final ReactiveExtensionClient client;
    private final String SETTING_CONFIG_NAME = "plugin-article-bottom-panel-configmap";

    private static final String TEMPLATE_ID = "_templateId";

    @Override
    public Mono<Void> process(ITemplateContext context, IModel model,
            IElementModelStructureHandler structureHandler) {
        final IModelFactory modelFactory = context.getModelFactory();
        return Mono.just(context)
                .filter(this::isPostTemplate)
                .flatMap(ct -> {
                    return client.fetch(ConfigMap.class, SETTING_CONFIG_NAME).map(ConfigMap::getData)
                            .filter(data -> data.containsKey("basic"))
                            .map(data -> {
                                String cd = data.get("basic");
                                return JsonUtils.jsonToObject(cd, Map.class);
                            })
                            .filter(map -> map.containsKey("show_block") && (Boolean) map.get("show_block"))
                            .map(map -> {
                                String script = """
                                        <script src="/plugins/PluginArticleBottomPanel/assets/static/charlie-article-pane.js"></script>""";
                                model.add(modelFactory.createText(script));
                                return script;
                            }).then();
                });
    }

    private boolean isPostTemplate(ITemplateContext context) {
        return DefaultTemplateEnum.POST.getValue()
                .equals(context.getVariable(TEMPLATE_ID));
    }

    public enum DefaultTemplateEnum {
        POST("post"),
        SINGLE_PAGE("page");

        private final String value;

        DefaultTemplateEnum(String value) {
            this.value = value;
        }

        public String getValue() {
            return value;
        }
    }
}
