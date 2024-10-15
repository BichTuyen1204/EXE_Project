package com.example.fbookStore.controller;

import com.example.fbookStore.config.JwtTokenProvider;
import com.example.fbookStore.dto.AccountDTO;
import com.example.fbookStore.entities.Account;
import com.example.fbookStore.entities.Comment;
import com.example.fbookStore.entities.Product;
import com.example.fbookStore.repository.AccountRepository;
import com.example.fbookStore.repository.CommentRepository;
import com.example.fbookStore.service.AccountService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/account")
@ComponentScan
public class AccountController {
    @Autowired
    AccountService accountService;
    @Autowired
    private AccountRepository accountRepository;

    @GetMapping("/all")
    @ResponseBody
    public List<Account> getAllAccount() {
        return accountService.getAllAccount();
    }

    @GetMapping("/getAccount/{email}")
    public ResponseEntity<Account> getProductById(@PathVariable String email) {
        Account account = accountService.getAccountByEmail(email);
        if (account != null) {
            return new ResponseEntity<>(account, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity addNewAccount(@RequestBody Account account) {
        try {
            if (accountService.addNewAccount(account)) {
                account.setFirstPurchase(true);
                accountRepository.save(account);
                return ResponseEntity.status(HttpStatus.OK).body("Create account has been successful");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing property of account");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when saving a account: " + e.getMessage());
        }
    }

    @PostMapping("/addComment")
    @ResponseBody
    public ResponseEntity addNewComment(@RequestBody Comment comment) {
        try {
            if (accountService.addNewComment(comment)) {
                return ResponseEntity.status(HttpStatus.OK).body("Add new comment has been successful");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Add new comment has been error");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Add new comment has been error: " + e.getMessage());
        }

    }

    @PutMapping({"/update"})
    public ResponseEntity<?> updateAccount(@RequestBody Account account) {
        String message = accountService.UpdateAccount(account);
        return ResponseEntity.status(HttpStatus.OK).body(message);
    }


    @PostMapping("/resetPassword")
    @ResponseBody
    public ResponseEntity resetPassword(@RequestParam("email") String email,
                                        @RequestParam("password") String password) {
        try {
            if (accountService.resetPassword(email, password)) {
                return ResponseEntity.status(HttpStatus.OK).body("Update password has been successful");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update password has been error");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update password has been error: " + e.getMessage());
        }

    }

    @PostMapping("/updatePassword")
    @ResponseBody
    public ResponseEntity<?> updatePassword(@RequestParam("email") String email,
                                            @RequestParam("password") String password,
                                            @RequestParam("oldpassword") String oldpassword) {
        try {
            if (accountService.updatePassword(email, password, oldpassword)) {
                return ResponseEntity.status(HttpStatus.OK).body("Update password has been successful");
            } else {
                // Kiểm tra xem mật khẩu mới có trùng với mật khẩu cũ không
                if (password.equals(oldpassword)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update password error !! New password cannot be the same as old password!");
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Update password error !! Your old password is not correct !");
                }
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Update password has been error: " + e.getMessage());
        }
    }


    @DeleteMapping({"/delete/{id}"})
    public ResponseEntity deleteAAccount(@PathVariable("id") Long id) {

        try {
            if (Objects.isNull(id)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Missing id");
            }
            String message = accountService.deleteAAccount(id);
            return ResponseEntity.status(HttpStatus.OK).body(message);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when saving a account: " + e.getMessage());
        }

    }


    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity Login(@RequestBody AccountDTO loginRequest) {
        try {
            if (StringUtils.isBlank(loginRequest.getEmail()) || StringUtils.isBlank(loginRequest.getPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect email or password");
            }
            String jwt = accountService.login(loginRequest.getEmail(), loginRequest.getPassword());
            if ( jwt != null) {
                return ResponseEntity.status(HttpStatus.OK).body(jwt);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Incorrect email or password");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Incorrect email or password " + e.getMessage());
        }
    }

    @PostMapping("/authenticate")
    @ResponseBody
    public ResponseEntity Authorization(@RequestHeader(value = "Authorization", required = false) String jwtToken) {

        try {
            if (accountService.getUsernameFromToken(jwtToken).isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Token is not invalid");
            } else {
                String username = accountService.getUsernameFromToken(jwtToken);
//                System.out.println("username: " + username);
                return ResponseEntity.status(HttpStatus.OK).body(username);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error when get a username: " + e.getMessage());
        }
    }



}
