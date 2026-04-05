package com.antarez2.convite.service;

import com.antarez2.convite.model.Convidado;
import com.antarez2.convite.model.StatusRsvp;
import com.antarez2.convite.repository.ConvidadoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RsvpService {

    private final ConvidadoRepository convidadoRepository;

    public Optional<Convidado> findByToken(String token) {
        return convidadoRepository.findByTokenAcesso(token);
    }

    public Convidado confirmarRsvp(String token, StatusRsvp status, Integer acompanhantes, List<String> nomes, Boolean festa, Boolean alcool) {
        Convidado convidado = convidadoRepository.findByTokenAcesso(token)
                .orElseThrow(() -> new RuntimeException("Convidado não encontrado com o token fornecido."));

        convidado.setStatus(status);
        convidado.setAcompanhantesConfirmados(acompanhantes);
        convidado.setNomesConfirmados(nomes);
        convidado.setParticiparaDaFesta(festa);
        convidado.setConsomeAlcool(alcool);
        
        return convidadoRepository.save(convidado);
    }

    public List<Convidado> listarTodosManual() {
        return convidadoRepository.findAll();
    }

    public Convidado criarConvidado(String nome, Integer acompanhantesPermitidos) {
        Convidado novo = Convidado.builder()
                .nome(nome)
                .acompanhantesPermitidos(acompanhantesPermitidos)
                .status(StatusRsvp.PENDENTE)
                .tokenAcesso(java.util.UUID.randomUUID().toString().substring(0, 8)) // Token curto para facilitar URL
                .build();
        
        return convidadoRepository.save(novo);
    }
}
