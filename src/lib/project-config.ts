// src/lib/project-config.ts
// Single-source-of-truth per dati commerciali del progetto.
// Modificare questo file = ri-personalizzare l'intera landing per un altro progetto.

export const PROJECT_CONFIG = {
  // Identità progetto
  projectName: 'Cenate Sopra',
  projectLocation: 'Cenate Sopra (BG)',
  projectAddress: 'Via Varadelli · Cenate Sopra (BG)',
  builderName: 'Edilvertova SRL',
  builderTagline: 'dal 1969',
  builderFullLegal: 'Edilvertova SRL · Via IV Novembre 6, 24025 Gazzaniga (BG) · P.IVA / CF 00811260165 · CCIAA Bergamo',

  // Agenzia commercializzazione (placeholder finché non confermata)
  agentName: 'Giulia',
  agentPhone: '+393465746387',
  agentPhoneHref: 'tel:+393465746387',
  agentPhoneDisplay: '+39 346 574 6387',
  agentEmail: 'bg2e3@tecnorete.it',
  agentWhatsAppNumber: '393465746387',
  agentHours: 'Lun–Ven · 9:00–19:30',
  agencyAddress: 'Via Ospedale 1',
  agencyCity: '24069 Trescore Balneario (BG)',

  // Asset
  logoPath: '/images/logo/logo_cenate_sopra.png',
  logoAlt: 'Cenate Sopra',
  builderLogoPath: '/images/logo/logo_edilvertova.png',
  agencyLogoPath: '/images/logo/logo_agenzia.png',

  // Brochure PDF (inviato post-form-submit via email, NON link diretto)
  brochurePath: '/brochure-cenate-sopra.pdf',

  // Supabase tables (project-dedicated, pattern <project>_<table>)
  // Future landings: create cenate_*-style tables and update these 3 fields.
  leadsTable: 'cenate_leads',
  callbackTable: 'cenate_callback_requests',
  brochureTable: 'cenate_brochure_downloads',

  // Supabase data tagging (usato dai componenti che inviano lead)
  leadSource: 'landing_cenate_sopra',

  // URL geo
  mapsUrl: 'https://maps.google.com/?q=Cenate+Sopra+Bergamo',
} as const

export type ProjectConfig = typeof PROJECT_CONFIG
