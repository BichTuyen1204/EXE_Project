package com.example.fbookStore.entities;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaginationResult<T> {
    private List<T> dataForPage;
    private int totalItems;
    private int totalPages;

    public PaginationResult(List<T> dataForPage, int totalItems, int totalPages) {
        this.dataForPage = dataForPage;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
    }
}
