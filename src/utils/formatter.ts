export function getInitials(name: string) {
  try {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  } catch (error) {
    console.error('An error occurred while extracting initials:', error);
    return null;
  }
}
