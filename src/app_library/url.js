export const toFriendlyUrl = function(url) {
  return url
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .replace(/&/g, '-e-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-*/, '')
    .replace(/-*$/, '')
}
