// Fotos y videos de obra viven en R2 (bucket rgelectric-media), no en el repo.
// Assets estáticos de Cloudflare no responden Range requests, así que un video
// servido desde ahí no se puede adelantar; desde R2 sí.
export const MEDIA_BASE = "https://media.rgelectric.bitsdeve.com";

export const mediaUrl = (path) => `${MEDIA_BASE}/${path}`;
