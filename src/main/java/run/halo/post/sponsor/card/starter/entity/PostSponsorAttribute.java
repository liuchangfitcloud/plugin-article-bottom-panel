package run.halo.post.sponsor.card.starter.entity;

import java.util.List;
import lombok.Data;

/**
 * 返回属性
 *
 * @author ShrChang.Liu
 * @version v1.0
 * @date 2023/9/21 4:32 PM
 **/
@Data
public class PostSponsorAttribute {
    private boolean showBlock;
    private String info;
    private boolean showBtn;
    private String btnIcon;
    private String btnName;
    private List<Items> items;
    private String bgColor;
    private String titleTextColor;
    private String cardBorderAlign;
    private String btnBgColor;
    private String btnTextColor;
    private String tipsDirection;
    private String tipsBgColor;
    private String tipsTextColor;
    private String borderColor;

    @Data
    public static class Items {
        private String name;
        private String image;
        private String desc;
    }
}
