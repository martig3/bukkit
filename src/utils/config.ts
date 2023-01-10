export type config = {
  baseUrl: string,
  domain: string,
  clientId: string,
}
export function config() {
  return {
    baseURL: import.meta.env.VITE_BASE_URL!,
    domain: import.meta.env.VITE_DOMAIN!,
    clientId: import.meta.env.VITE_CLIENT_ID!,
  }
}
