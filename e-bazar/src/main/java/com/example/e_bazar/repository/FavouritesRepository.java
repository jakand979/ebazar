package com.example.e_bazar.repository;

import com.example.e_bazar.model.Favourite;
import com.example.e_bazar.model.FavouriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouritesRepository extends JpaRepository<Favourite, Long> {
    List<Favourite> findAllByIdUserId(Long userId);
    void deleteById(FavouriteId id);
}
