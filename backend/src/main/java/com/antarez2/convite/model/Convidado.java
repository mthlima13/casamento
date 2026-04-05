package com.antarez2.convite.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "convidados")
public class Convidado {
    @Id
    private String id;
    private String casalId;
    
    private String nome;
    private String email;
    private String telefone;
    
    private Integer acompanhantesPermitidos;
    private StatusRsvp status; // PENDENTE, CONFIRMADO, RECUSADO
    private Integer acompanhantesConfirmados;
    private String restricoesAlimentares;
    private String mensagemNoivos;
    
    @Indexed(unique = true)
    private String tokenAcesso;
}
