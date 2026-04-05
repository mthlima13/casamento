package com.antarez2.convite.controller;

import com.antarez2.convite.model.Convidado;
import com.antarez2.convite.model.StatusRsvp;
import com.antarez2.convite.service.RsvpService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/publico")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PublicoController {

    private final RsvpService rsvpService;

    @PutMapping("/rsvp/{token}")
    public Convidado realizarRsvp(@PathVariable String token, @RequestBody RsvpRequest request) {
        return rsvpService.confirmarRsvp(token, request.getStatus(), request.getAcompanhantes());
    }

    @Data
    public static class RsvpRequest {
        private StatusRsvp status;
        private Integer acompanhantes;
    }
}
