package com.antarez2.convite.controller;

import com.antarez2.convite.model.Convidado;
import com.antarez2.convite.model.StatusRsvp;
import com.antarez2.convite.service.RsvpService;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AdminController {

    private final RsvpService rsvpService;

    @GetMapping("/dashboard")
    public DashboardSummary getDashboard() {
        List<Convidado> convidados = rsvpService.listarTodosManual();
        
        long confirmadosCount = convidados.stream()
                .filter(c -> StatusRsvp.CONFIRMADO.equals(c.getStatus()))
                .count();

        long recusadosCount = convidados.stream()
                .filter(c -> StatusRsvp.RECUSADO.equals(c.getStatus()))
                .count();

        int totalPessoas = convidados.stream()
                .filter(c -> StatusRsvp.CONFIRMADO.equals(c.getStatus()))
                .mapToInt(c -> 1 + (c.getAcompanhantesConfirmados() != null ? c.getAcompanhantesConfirmados() : 0))
                .sum();

        return DashboardSummary.builder()
                .totalConvites(convidados.size())
                .confirmados((int) confirmadosCount)
                .recusados((int) recusadosCount)
                .totalPessoas(totalPessoas)
                .convidados(convidados)
                .build();
    }

    @PostMapping("/convidados")
    public Convidado criarConvidado(@RequestBody CreateGuestRequest request) {
        return rsvpService.criarConvidado(request.getNome(), request.getAcompanhantesPermitidos());
    }

    @Data
    public static class CreateGuestRequest {
        private String nome;
        private Integer acompanhantesPermitidos;
    }

    @Data
    @Builder
    public static class DashboardSummary {
        private Integer totalConvites;
        private Integer confirmados;
        private Integer recusados;
        private Integer totalPessoas;
        private List<Convidado> convidados;
    }
}
