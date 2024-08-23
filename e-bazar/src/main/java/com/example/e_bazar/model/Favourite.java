package com.example.e_bazar.model;

import jakarta.persistence.*;

@Entity
@Table(name = "favourites")
public class Favourite {

    @EmbeddedId
    private FavouriteId id;

    public Favourite() {
    }

    public Favourite(FavouriteId id) {
        this.id = id;
    }

    public FavouriteId getId() {
        return id;
    }

    public void setId(FavouriteId id) {
        this.id = id;
    }

    public Long getUserId() {
        return id.getUserId();
    }

    public void setUserId(Long userId) {
        id.setUserId(userId);
    }

    public Long getProductId() {
        return id.getProductId();
    }

    public void setProductId(Long productId) {
        id.setProductId(productId);
    }
}
