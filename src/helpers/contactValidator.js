export function contactValidator(contact) {
  const re = /^[0-9]+$/
  if (!contact) return "Contact can't be empty."
  if (!re.test(contact)) return 'Ooops! We need a valid contact number.'
  return ''
}
