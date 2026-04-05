## Convite de Casamento Digital Interativo

### Pitch

Site elegante e interativo para casais convidarem amigos e familiares, gerenciando RSVP, opções de presentes e recados, com um dashboard completo para os noivos.

### Modelo

```javascript
casal { _id, nomes, dataCasamento, fotoCasal, mensagemBoasVindas, tema:{cores, estilo} }
evento { _id, casalId, data, local:{nome, endereco, lat, lng}, dressCode, observacoes }
convidado { _id, casalId, nome, email, telefone, acompanhantesPermitidos, statusRsvp, restricoesAlimentares, mensagem, tokenAcesso }
presente { _id, casalId, titulo, descricao, valor, foto, linkLoja, status, convidadoReservaId }
recado { _id, casalId, autor, mensagem, fotoOpcional, data, aprovado }
galeria { _id, casalId, tipo, url, legenda, ordem }
```

---

## Funcionalidades Principais

### 1. Dashboard e Gestão do Casamento (Visão dos Noivos)

**O que o usuário faz:**

- Cadastra as informações principais do casamento, como local, data e dress code
- Adiciona fotos para a galeria e personaliza o visual (tema, identidade visual)
- Gerencia a lista de convidados e define a quantidade de acompanhantes
- Cadastra cotas de lua de mel ou presentes em dinheiro/produtos
- Acompanha o painel geral para ver RSVP confirmado, presentes garantidos e aprova mensagens deixadas no mural

**Valor para o usuário:**
Controle total sobre o evento em um só lugar. Automatiza a gestão de convidados e a arrecadação de presentes, reduzindo a dor de cabeça com organização.

### 2. Confirmação de Presença (RSVP Interativo)

**O que o usuário faz:**

- Acessa o link único e seguro do convite digital
- Visualiza os detalhes do evento com mapa interativo e cronograma
- Confirma ou recusa sua presença, incluindo o cadastro de acompanhantes permitidos
- Informa restrições alimentares (ex: vegetarianismo, alergias) para facilitar o buffet

**Valor para o usuário:**
Uma experiência sem atritos e encantadora para confirmar presença. Evita as antigas trocas de mensagem manuais com os noivos e garante facilidade logística.

### 3. Lista de Presentes Inteligente

**O que o usuário faz:**

- Visualiza a lista de presentes/cotas com fotos e valores
- Filtra por faixa de preço
- Seleciona um presente e realiza a contribuição ou reserva (para compra em lojas externas)
- O sistema atualiza o status em tempo real, evitando que duas pessoas deem o mesmo presente físico

**Valor para o usuário:**
Praticidade financeira e logística. Os convidados evitam duplicidade e os noivos recebem os valores de maneira organizada ou os presentes que realmente precisam.

### 4. Mural de Recados e Galeria

**O que o usuário faz:**

- Navega por um carrossel / timeline de fotos contando a história do casal
- Deixa uma mensagem carinhosa e uma foto no "Mural de Recados"
- Noivos recebem a notificação e aprovam o que vai aparecer no mural público

**Valor para o usuário:**
Cria um fator emocional e de comunidade antes mesmo da festa acontecer. Transforma o convite em um espaço de afeto digital.

---

## Fluxo de Dados (Visão de Produto)

### Cadastro e Configuração Inicial (Noivos)

```
[FRONT] → Noivos preenchem onboarding (nomes, datas, fotos, convidados)
       → Envia dados para o back-end
[BACK]  → Valida as informações e gera tokens únicos para cada convidado
       → Salva os dados do casal e lista de convidados
[DB]    → Armazena documentos 'casal', 'evento' e múltiplos 'convidado'
[BACK]  → Retorna sucesso com link do painel administrativo
[FRONT] → Exibe dashboard zerado aguardando engajamento dos convidados
```

### Confirmação de Presença (RSVP)

```
[FRONT] → Convidado acessa link com token (ex: /convite/abc-123)
       → Envia token para o back-end
[BACK]  → Busca perfil do convidado e detalhes do casamento atrelado
       → Retorna informações completas do convite
[FRONT] → Convidado visualiza convite e preenche RSVP (confirmar, 2 acompanhantes)
       → Envia confirmação
[BACK]  → Valida limite de acompanhantes
       → Atualiza statusRsvp do convidado
[DB]    → Atualiza documento 'convidado'
[BACK]  → Adiciona notificação para o dashboard dos noivos
[FRONT] → Exibe tela de agradecimento ("Te esperamos lá!")
```

### Reserva de Presente

```
[FRONT] → Convidado clica em "Dar Presente" (ex: Cota Lua de Mel de R$ 200)
       → Envia requisição com ID do presente e ID do convidado (via token)
[BACK]  → Checa concorrência (se presente já não está reservado)
       → Atualiza status do presente para 'reservado' ou 'comprado'
[DB]    → Atualiza documento 'presente' vinculando ao convidado
[BACK]  → Dispara email de agradecimento
[FRONT] → Exibe confirmação com dados de pix / link da loja
```

---

## Jornada do Usuário (História Completa)

### Preparação do Evento

1. **Cadastro do Evento:** João e Maria entram no sistema e configuram seu casamento. Eles escolhem a cor terracota, colocam fotos do pré-wedding e adicionam a lista completa dos convidados via Excel.
2. **Distribuição:** O sistema gera os links únicos, e João envia por WhatsApp o convite virtual para a Tia Ana com seu token embutido.

### A Experiência do Convidado

3. **Recepção:** Tia Ana clica no link, vê uma animação de entrada com música de fundo e os detalhes do evento.
4. **Confirmação:** Ela vai até a área de RSVP. O sistema já sabe que é a "Tia Ana" e que ela tem direito a 3 convites. Ela confirma para ela e o marido, informa que é intolerante à lactose e envia.
5. **Presente:** Logo em seguida, acessa a aba de presentes, escolhe a cota "Passeio de Barco na Lua de Mel" e realiza o Pix diretamente no site. O presente automaticamente some da lista para outros.
6. **Mural:** Por fim, Tia Ana deixa um recado carinhoso desejando felicidades aos noivos.

### Gestão dos Noivos

7. **Acompanhamento no Dashboard:** Maria entra no dashboard. Ela nota que o RSVP total subiu para 150 pessoas, sendo 5 intolerantes à lactose. Ela aprova o recado da Tia Ana e verifica o saldo arrecadado com os presentes na conta deles.

---

## Endpoints

- `POST /casais` (criação do painel dos noivos)
- `POST /eventos`
- `GET /convites/:token` (carrega os dados públicos do convite para o convidado)
- `PUT /rsvp/:token` (confirma/rejeita presença e adiciona restrições)
- `POST /presentes/reservar` (lógica com tratamento de concorrência)
- `GET /dashboard/:casalId` (agregação de estatísticas para os noivos)

---

## Desafios

- **Reserva em Tempo Real:** Tratamento de concorrência quando dois convidados tentam reservar ou comprar o mesmo presente físico no mesmo exato momento.
- **Segurança de Acesso:** Garantir que o convidado X não consiga usar e visualizar o token do convidado Y (evitando farsas no RSVP).
- **Performance de Mídia:** Otimização pesada de imagens e vídeos do mural/carrossel para garantir que convidados no 4G não sofram com travamentos e para carregar a landing page instantaneamente.

---

## Stretch Goals

- Geração de QR Code individual e um app/página para a recepcionista fazer "check-in" na porta do evento.
- "Save the Date" disparado meses antes (por email ou SMS configurado) para toda a lista integrada.
- Moderação por IA que já aprova automaticamente mensagens do mural que não contenham palavrões e identifica fotos com os rostos dos noivos.
