// ============================================================
//  CONFIGURAÇÃO DO CONVITE — EDITE APENAS ESTE ARQUIVO
//  Todos os dados do casal ficam aqui. Ao pegar um novo
//  cliente, troque os valores abaixo e a foto em src/assets.
// ============================================================

export const weddingConfig = {
  // --- Noivos ---
  names: ['Henrique', 'Amanda'],

  // --- Evento ---
  date: 'Sexta-feira, 29 de Janeiro, 2027', // texto exibido no convite
  time: '16:30',                            // horário exibido
  targetDate: '2027-01-29T16:30:00',        // usado pela contagem regressiva (ISO)
  location: 'Arboredo Espaço e Lazer — Paraopeba/MG',
  // Link do Google Maps aberto pelo botão "Ver no Mapa"
  mapsUrl: 'https://maps.app.goo.gl/gXd89zwcoWDLxAWy9',
  message: 'Assim, eles já não são dois, mas uma só carne. (Mateus 19:6)',

  // --- Abertura (envelope) ---
  inviteTitle: 'Você está sendo convidado(a)',

  // --- Confirmação por WhatsApp ---
  // Número com código do país e DDD, apenas dígitos. Ex: 5531999999999
  whatsappNumber: '5531982601791',
};

export default weddingConfig;
