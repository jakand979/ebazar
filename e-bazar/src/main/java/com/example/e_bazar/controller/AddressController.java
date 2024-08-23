package com.example.e_bazar.controller;

import com.example.e_bazar.model.Address;
import com.example.e_bazar.service.AddressService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/addresses")
@CrossOrigin(origins = "http://localhost:3000", exposedHeaders = {"Access-Control-Allow-Origin"})
public class AddressController {
    private final AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PutMapping("/update/{userId}")
    public Address updateAddress(@PathVariable Long userId, @RequestBody Address newAddress) {
        Address address = addressService.getAddressByUserId(userId);
        if (address == null) {
            return addressService.createAddress(newAddress);
        }
        address.setStreet(newAddress.getStreet());
        address.setHouseNumber(newAddress.getHouseNumber());
        address.setFlatNumber(newAddress.getFlatNumber());
        address.setPostalCode(newAddress.getPostalCode());
        address.setCity(newAddress.getCity());
        return addressService.updateAddress(address);
    }

    @GetMapping("/getaddress/{userId}")
    public Address getAddressByUserId(@PathVariable Long userId) {
        return addressService.getAddressByUserId(userId);
    }
}
