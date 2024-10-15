package com.example.fbookStore.service;

import com.example.fbookStore.entities.Account;
import com.example.fbookStore.entities.Banner;
import com.example.fbookStore.entities.Product;
import com.example.fbookStore.repository.BannerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class BannerService {
    @Autowired
    BannerRepository bannerRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public boolean saveFile(MultipartFile file) throws IOException, URISyntaxException {
        if (file.isEmpty()) {
            throw new IOException("Failed to store empty file.");

        } else {
            String filename = StringUtils.cleanPath(file.getOriginalFilename());
            Path storageLocation;
            try {
                URI uri = new URI(uploadDir);
                storageLocation = Paths.get(uri);
            } catch (Exception e) {
                // Fallback for non-URI paths, useful for direct filesystem paths
                storageLocation = Paths.get(uploadDir);
            }
            if (!Files.exists(storageLocation)) {
                Files.createDirectories(storageLocation);
            }

            Path destination = storageLocation.resolve(filename);

            file.transferTo(destination.toFile());
            return true;
        }
    }

    public Banner addBanner(String type, String image){
        Banner banner = new Banner();
        banner.setType(type);
        banner.setImage(image);
        return bannerRepository.save(banner);
    }

    public List<Banner> getAllBanner() {return bannerRepository.findAll();}

    public String deleteBanner(Long idBanner) {
        Optional<Banner> banner = bannerRepository.findById(idBanner);
        if (banner.isEmpty()) {
            return "Cannot find the account with id: " + idBanner;
        } else {
            bannerRepository.deleteById(idBanner);
            return "Deleted successfully a account with id: " + idBanner;
        }
    }
    public Banner getBannerByType (String type) {
        Optional<Banner> optionalBanner = bannerRepository.findByType(type);
        return optionalBanner.orElse(null);
    }
}
