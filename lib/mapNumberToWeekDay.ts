const mapNumberToWeekDay = (n: number) => {
  switch (n) {
    case 1:
      return "Segunda";
    case 2:
      return "Terça";
    case 3:
      return "Quarta";
    case 4:
      return "Quinta";
    case 5:
      return "Sexta";
    case 6:
      return "Sábado";
    case 7:
      return "Domingo";
    default:
      return "N/D";
  }
};

export default mapNumberToWeekDay;
