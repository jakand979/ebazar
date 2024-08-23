package com.example.e_bazar.service;

import com.example.e_bazar.model.Address;
import com.example.e_bazar.repository.AddressRepository;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
    private final AddressRepository addressRepository;

    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }

    public Address getAddressByUserId(Long userId) {
        return addressRepository.findByUserId(userId);
    }

    public Address updateAddress(Address address) {
        return addressRepository.save(address);
    }
}
