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
  time: '16:00',                            // horário exibido
  targetDate: '2027-01-29T16:00:00',        // usado pela contagem regressiva (ISO)
  location: 'Local a definir — em breve',
  message: 'Assim, eles já não são dois, mas uma só carne. (Mateus 19:6)',

  // --- Confirmação por WhatsApp ---
  // Número com código do país e DDD, apenas dígitos. Ex: 5531999999999
  whatsappNumber: '5531982601791',
};

export default weddingConfig;
