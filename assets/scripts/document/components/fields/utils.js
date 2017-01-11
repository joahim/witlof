export function id_of_path (path) {
  return path.unshift('document').join('__')
}
