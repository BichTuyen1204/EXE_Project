package com.example.fbookStore.service;


import com.example.fbookStore.config.JwtTokenProvider;
import com.example.fbookStore.entities.Account;
import com.example.fbookStore.entities.Comment;
import com.example.fbookStore.entities.Product;
import com.example.fbookStore.entities.Voucher;
import com.example.fbookStore.repository.AccountRepository;
import com.example.fbookStore.repository.CommentRepository;
import com.example.fbookStore.repository.VoucherRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;

@Service
public class AccountService {
    @Autowired
    AccountRepository accountRepository;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    ShoppingCartService shoppingCartService;

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    VoucherRepository voucherRepository;

    public String authenticate(String bearerToken) {
        String token = bearerToken;
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
                if (token != null && jwtTokenProvider.validateToken(token)) {
                    return token;
                } else {
                    return null;
                }
        } else {
            return null;
        }
    }

    public String getUsernameFromToken(String bearerToken) {
        String token = authenticate(bearerToken);
        if (!token.isEmpty()) {
            String username = jwtTokenProvider.getUsernameFromJWT(token);
            return username;
        } else {
            return null;
        }

    }

    public String login(String email, String password) {
        Optional<Account> account = accountRepository.findByEmail(email);
        if (accountRepository.findByEmail(email).isPresent()) {
            if (passwordEncoder().matches(password, account.get().getPassword())) {
                return jwtTokenProvider.generateToken(account.get());
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    public Account getAccountByEmail(String email) {
        Optional<Account> optionalProduct = accountRepository.findByEmail(email);
        return optionalProduct.orElse(null);
    }

    public List<Account> getAllAccount() {
        List<Account> accounts = (List<Account>) accountRepository.findAll();
        return accounts;
    }

    public Account getAccountById(Long id) {
        Optional<Account> optionalAccount = accountRepository.findById(id);
        return optionalAccount.orElse(null);
    }

    public boolean addNewComment(Comment comemt) {
        if (comemt.getContent().isEmpty()) {
            return false;
        } else {

            commentRepository.save(comemt);
            return true;
        }

    }

    public boolean resetPassword (String email, String password) {
        Optional<Account> account = accountRepository.findByEmail(email);
        if (account.isPresent()) {
            account.get().setPassword(passwordEncoder().encode(password));
            accountRepository.save(account.get());
            return true;
        } else {
            return false;
        }
    }

    public boolean updatePassword(String email, String password, String oldPassword) {
        Optional<Account> accountOptional = accountRepository.findByEmail(email);

        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();

            // Kiểm tra xem mật khẩu cũ có khớp với mật khẩu trong cơ sở dữ liệu không
            if (!passwordEncoder().matches(oldPassword, account.getPassword())) {
                return false;
            }

            // Kiểm tra xem mật khẩu mới có khác mật khẩu cũ không
            if (passwordEncoder().matches(password, account.getPassword())) {
                return false;
            }

            // Cập nhật mật khẩu mới
            account.setPassword(passwordEncoder().encode(password));
            accountRepository.save(account);
            return true;
        }
        return false;
    }



    public boolean addNewAccount(Account account) {
        if (StringUtils.isBlank(account.getName())
                || StringUtils.isBlank(account.getEmail())
                || StringUtils.isBlank(account.getPassword())
                || StringUtils.isBlank(account.getPhoneNumber())
        ) {
            return false;
        } else {
            if (accountRepository.findByEmail(account.getEmail()).isPresent()) {
                return false;
            } else {
                if (account.getRole().isEmpty()) {
                    account.setPassword(passwordEncoder().encode(account.getPassword()));
                    account.setRole("user");
                    accountRepository.save(account);
                    Account acc = accountRepository.findByEmail(account.getEmail()).get();
                    shoppingCartService.addNewCart(acc);
                    return true;
                } else {
                    account.setPassword(passwordEncoder().encode(account.getPassword()));
                    accountRepository.save(account);
                    return true;
                }

            }
        }
    }

    public String UpdateAccount(Account account) {
        accountRepository.updateAccount(
                account.getId(),
                account.getEmail(),
                account.getName(),
                account.getPhoneNumber()
        );
        return "Update a account Successfully";
    }

    public String deleteAAccount(Long id) {

        Optional<Account> account = accountRepository.findById(id);
        if (account.isEmpty()) {
            return "Problem when deleting a account with id: " + id;
        } else {
            accountRepository.deleteById(id);
            return "Deleted successfully a account with id: " + id;
        }

    }

    public Optional<Account> findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public void createAccountWithFirstOrderVoucher(Account account) {
        accountRepository.save(account);
        Voucher voucher = new Voucher();
        voucher.setCode(UUID.randomUUID().toString());
        voucher.setDiscountValue(BigDecimal.valueOf(10000));
        voucher.setStatus("valid");
        voucher.setAccount(account);

        voucherRepository.save(voucher);
    }

    public BigDecimal applyVoucher(Long accountId, BigDecimal totalOrderPrice) {
        Voucher voucher = voucherRepository.findByAccountIdAndStatus(accountId, "valid");
        if (voucher != null) {
            totalOrderPrice = totalOrderPrice.subtract(voucher.getDiscountValue());
            voucher.setStatus("used");
            voucherRepository.save(voucher);
        }
        return totalOrderPrice;
    }
}