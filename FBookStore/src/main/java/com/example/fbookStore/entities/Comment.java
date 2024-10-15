package com.example.fbookStore.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
public class Comment {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int idComment;
    private String content;
    private int accountId;
}
