package com.antarez2.convite.repository;

import com.antarez2.convite.model.Convidado;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConvidadoRepository extends MongoRepository<Convidado, String> {
    Optional<Convidado> findByTokenAcesso(String tokenAcesso);
    List<Convidado> findByCasalId(String casalId);
}
