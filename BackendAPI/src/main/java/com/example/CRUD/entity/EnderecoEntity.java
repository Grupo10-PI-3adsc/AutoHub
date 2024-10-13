package com.example.CRUD.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "endereco")
public class EnderecoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    private String cep;
    private String logradouro;
    private String complemento;
    private String bairro;
    private String localidade;
    private String uf;
    private String ibge;
    private String gia;
    private String ddd;
    private String siafi;
    private Boolean isActive;
//    @Column(insertable=false, updatable=false)
    private Integer fkUser;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "cliente", referencedColumnName = "Id")
    private UserEntity user; // Associação com ClienteEntity

}
