const formatDate = (date) => {
  if (!date) {
    return '';
  }
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'short', formatMatcher: 'best fit' }).format(new Date(date));
};

export default formatDate;
