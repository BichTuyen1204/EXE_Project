package com.example.fbookStore.repository;

import com.example.fbookStore.entities.Banner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    Optional<Banner>findByType(String type);
}
