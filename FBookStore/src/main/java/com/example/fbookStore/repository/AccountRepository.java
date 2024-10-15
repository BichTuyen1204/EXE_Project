package com.example.fbookStore.repository;

import com.example.fbookStore.entities.Account;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface AccountRepository extends CrudRepository<Account, Long> {

    @Modifying
    @Transactional
    @Query("select v from Account v where v.name = :name")
    List<Account> findByName(@Param(value="name") String name);
 //   List<Account> findByPartOfSpeech(String partOfSpeech);

//    @Modifying
//    @Transactional
//    @Query("select v from Account v where v.name = :name")
//    Account findAccountToLogin(@Param(value="name") String name);


   
    Optional<Account> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("update Account v " +
           "set v.email = :email, v.name = :name, v.phoneNumber = :phoneNumber " +
           "where v.id = :id")
    void updateAccount(
            @Param(value="id") Long id,
            @Param(value="email") String email,
            @Param(value="name") String name,
            @Param(value="phoneNumber") String phoneNumber
    );

    @Modifying
    @Transactional
    @Query("update Account v " +
            "set v.password = :password " +
            "where v.id = :id")
    void updateAccountPassword(
            @Param(value="id") Long id,
            @Param(value="password") String password
    );

    @Query("SELECT a.id FROM Account a WHERE a.email = :email")
    String findIdByEmail(String email);

}
