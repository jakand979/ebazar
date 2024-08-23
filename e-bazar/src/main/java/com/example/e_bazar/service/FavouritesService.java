package com.example.e_bazar.service;

import com.example.e_bazar.model.Favourite;
import com.example.e_bazar.model.FavouriteId;
import com.example.e_bazar.repository.FavouritesRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouritesService {
    private final FavouritesRepository favouritesRepository;

    public FavouritesService(FavouritesRepository favouritesRepository) {
        this.favouritesRepository = favouritesRepository;
    }

    public Favourite createFavourite(Favourite favourite) {
        return favouritesRepository.save(favourite);
    }

    @Transactional
    public void deleteFavourite(Long userId, Long productId) {
        FavouriteId id = new FavouriteId(userId, productId);
        favouritesRepository.deleteById(id);
    }

    public List<Favourite> getFavouritesByUserId(Long userId) {
        return favouritesRepository.findAllByIdUserId(userId);
    }
}
