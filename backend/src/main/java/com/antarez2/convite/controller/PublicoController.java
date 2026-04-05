package com.antarez2.convite.controller;

import com.antarez2.convite.model.Convidado;
import com.antarez2.convite.model.StatusRsvp;
import com.antarez2.convite.service.RsvpService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/publico")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PublicoController {

    private final RsvpService rsvpService;

    @GetMapping("/convites/{token}")
    public Map<String, Object> getConviteInfo(@PathVariable String token) {
        Convidado convidado = rsvpService.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Convidado não encontrado."));
        
        // Mock das informações do evento enquanto Casal/Evento não são persistidos individualmente
        return Map.of(
            "nomes", List.of("Matheus", "Isabela"),
            "dataEvento", "2026-06-12T19:00:00",
            "mensagemBoasVindas", "Com grande alegria, convidamos você para celebrar conosco o nosso casamento!",
            "local", Map.of(
                "nome", "Vip Festas",
                "endereco", "Rua 7, Caetanópolis - MG"
            ),
            "convidado", convidado
        );
    }

    @PutMapping("/rsvp/{token}")
    public Convidado realizarRsvp(@PathVariable String token, @RequestBody RsvpRequest request) {
        return rsvpService.confirmarRsvp(token, request.getStatus(), request.getAcompanhantes(), 
                request.getNomesConfirmados(), request.getParticiparaDaFesta(), request.getConsomeAlcool());
    }

    @Data
    public static class RsvpRequest {
        private StatusRsvp status;
        private Integer acompanhantes;
        private List<String> nomesConfirmados;
        private Boolean participaraDaFesta;
        private Boolean consomeAlcool;
    }
}
