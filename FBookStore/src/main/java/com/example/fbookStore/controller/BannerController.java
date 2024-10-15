package com.example.fbookStore.controller;

import com.example.fbookStore.entities.Account;
import com.example.fbookStore.entities.Banner;
import com.example.fbookStore.service.BannerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/banner")
@ComponentScan
public class BannerController {


    @Autowired
    BannerService bannerService;

    @PostMapping({"/addNew"})
    public ResponseEntity<?> addNewBanner(@RequestParam("file") MultipartFile file,
                                        @RequestParam("type") String type) throws IOException {

        try {
            if (bannerService.saveFile(file)) {
                String imageName = file.getOriginalFilename();
                bannerService.addBanner(type, imageName);
                return ResponseEntity.status(HttpStatus.OK).body("Create banner has been successful");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing property of banner");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when saving banner: " + e.getMessage());
        }
    }

    @GetMapping({"/getAll"})
    public List<Banner> getAllBanner() {
        return bannerService.getAllBanner();
    }

    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity<?> deleteBanner(@PathVariable("id") Long id) {

        try {
            if (Objects.isNull(id)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing id");
            }
            String message = bannerService.deleteBanner(id);
            return ResponseEntity.status(HttpStatus.OK).body(message);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when saving a account: " + e.getMessage());
        }


}

    @GetMapping("/getBanner/{type}")
    public ResponseEntity<Banner> getBannerByType(@PathVariable String type) {
        Banner banner = bannerService.getBannerByType(type);

        if (banner != null && !Objects.equals(banner.getType(), "big-banner") && !Objects.equals(banner.getType(), "slide")) {
            return new ResponseEntity<>(banner, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
