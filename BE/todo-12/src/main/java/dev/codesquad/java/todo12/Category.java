package dev.codesquad.java.todo12;

import org.springframework.data.annotation.Id;

public class Category {
    @Id
    private Long id;
    private String name;
}
