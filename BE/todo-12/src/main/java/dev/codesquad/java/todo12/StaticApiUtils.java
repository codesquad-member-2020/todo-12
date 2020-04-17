package dev.codesquad.java.todo12;

public class StaticApiUtils {
    // history
    public static final String ADD = "added";
    public static final String REMOVE = "removed";
    public static final String UPDATE = "updated";
    public static final String MOVE = "moved";

    // api
    public static final String OK = "OK";
    public static final String NO_CARD = "해당 카드 없음";
    public static final String NO_CATEGORY = "해당 카테고리 없음";
    public static final String WRONG_CATEGORY_KEY = "존재하지 않는 카테고리 키";
    public static final String EMPTY_CATEGORY = "카테고리 없음";

    // access
    public static final String NO_USER = "해당 userID 없음";
    public static final String WRONG_PASSWORD = "비밀번호 불일치";
    public static final int EXPIRATION_TIME = 1000 * 60 * 60 * 10;
    public static final String TOKEN_IDENTIFIER_NAME = "group";
    public static final String TOKEN_IDENTIFIER_VALUE = "codesquad-todo12";
    public static final String AUTHORIZATION = "Authorization";
    public static final String NULL_TOKEN_USER = "visitor";
}
