package com.example.e_bazar.controller;

import com.example.e_bazar.model.Favourite;
import com.example.e_bazar.model.FavouriteId;
import com.example.e_bazar.service.FavouritesService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favourites")
@CrossOrigin(origins = "http://localhost:3000", exposedHeaders = {"Access-Control-Allow-Origin"})
public class FavouritesController {
    private final FavouritesService favouritesService;

    public FavouritesController(FavouritesService favouritesService) {
        this.favouritesService = favouritesService;
    }

    @PostMapping("/create")
    public Favourite createFavourite(@RequestParam Long userId, @RequestParam Long productId) {
        Favourite favourite = new Favourite(new FavouriteId(userId, productId));
        return favouritesService.createFavourite(favourite);
    }

    @DeleteMapping("/delete")
    public void deleteFavourite(@RequestParam Long userId, @RequestParam Long productId) {
        favouritesService.deleteFavourite(userId, productId);
    }

    @GetMapping("/{userId}")
    public List<Favourite> getFavouritesByUserId(@PathVariable Long userId) {
        return favouritesService.getFavouritesByUserId(userId);
    }
}
