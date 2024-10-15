package com.example.fbookStore.repository;

import com.example.fbookStore.entities.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    Voucher findByAccountIdAndStatus(Long accountId, String status);
}
