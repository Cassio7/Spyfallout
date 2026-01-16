import type { Location } from "@/lib/types";

export const LOCATIONS: Location[] = [
  {
    name: "ITIS A. Volta",
    jobs: [
      { name: "Prof.ssa Busti", isRepeatable: false },
      { name: "Prof.ssa Ciuchetti", isRepeatable: false },
      { name: "Prof. Loschi", isRepeatable: false },
      { name: "Prof. Fiorucci", isRepeatable: false },
      { name: "Prof. Bambini", isRepeatable: false },
      { name: "Bidello", isRepeatable: true },
      { name: "Preside", isRepeatable: false },
      { name: "Studente", isRepeatable: true },
    ],
  },
  {
    name: "DaDando/DD",
    jobs: [
      { name: "Te stesso/a", isRepeatable: true },
      { name: "Barista", isRepeatable: false },
      { name: "Cliente", isRepeatable: false },
    ],
  },
  {
    name: "Sagra Capanne",
    jobs: [
      { name: "Cuoco", isRepeatable: true },
      { name: "Vecchio in fila", isRepeatable: true },
      { name: "Musicista", isRepeatable: true },
      { name: "Cameriere", isRepeatable: true },
      { name: "Addetto pesca", isRepeatable: false },
      { name: "Fornitore pasta", isRepeatable: false },
    ],
  },
  {
    name: "Conad",
    jobs: [
      { name: "Cliente", isRepeatable: true },
      { name: "Cassiere", isRepeatable: true },
      { name: "Salumiere", isRepeatable: false },
      { name: "Scaffalista", isRepeatable: true },
      { name: "Responsabile reparto", isRepeatable: false },
      { name: "Macellaio", isRepeatable: false },
      { name: "Proprietario", isRepeatable: false },
      { name: "Mendicante bisognoso", isRepeatable: false },
    ],
  },
  {
    name: "McDonald's",
    jobs: [
      { name: "Cliente", isRepeatable: true },
      { name: "Manager", isRepeatable: false },
      { name: "Cameriere", isRepeatable: true },
      { name: "Addetto drive", isRepeatable: true },
      { name: "Driver consegne", isRepeatable: false },
      { name: "'Cuoco'", isRepeatable: true },
      { name: "Mendicante bisognoso", isRepeatable: false },
    ],
  },
  {
    name: "Piazzale Loreto",
    jobs: [
      { name: "Duce", isRepeatable: false },
      { name: "Partigiano", isRepeatable: true },
      { name: "Civile", isRepeatable: true },
      { name: "Giornalista", isRepeatable: true },
      { name: "Soldato tedesco", isRepeatable: true },
      { name: "Fascista", isRepeatable: true },
    ],
  },
  {
    name: "Wang",
    jobs: [
      { name: "Cliente", isRepeatable: true },
      { name: "Cliente asporto", isRepeatable: true },
      { name: "Cuoco (cinese)", isRepeatable: true },
      { name: "Cameriere (cinese)", isRepeatable: true },
      { name: "Pompiere", isRepeatable: true },
      { name: "Addetto gyoza (cinese)", isRepeatable: false },
    ],
  },
  {
    name: "Capodanno Napoli",
    jobs: [
      { name: "Ciro fuochista", isRepeatable: false },
      { name: "Dito medio Ciro", isRepeatable: false },
      { name: "Teresa madre Ciro", isRepeatable: false },
      { name: "Dottore reparto", isRepeatable: false },
      { name: "Infermiera", isRepeatable: true },
      { name: "Poliziotto", isRepeatable: true },
      { name: "Giornalista", isRepeatable: true },
    ],
  },
  {
    name: "Battuta di caccia",
    jobs: [
      { name: "Niky Basso", isRepeatable: false },
      { name: "Carabina", isRepeatable: false },
      { name: "Macellaio", isRepeatable: false },
      { name: "Veterinario", isRepeatable: false },
      { name: "Cinghiale", isRepeatable: true },
      { name: "Quaglia", isRepeatable: true },
      { name: "Guardia forestale", isRepeatable: true },
    ],
  },
  {
    name: "Bunker",
    jobs: [
      { name: "Bomba atomica", isRepeatable: false },
      { name: "Pilota sgancia bomba", isRepeatable: false },
      { name: "Responsabile", isRepeatable: false },
      { name: "Morto", isRepeatable: true },
      { name: "Sopravvissuto", isRepeatable: true },
    ],
  },
  {
    name: "Auschwitz",
    jobs: [
      { name: "Anna Frank", isRepeatable: false },
      { name: "Kapo", isRepeatable: false },
      { name: "Hitler", isRepeatable: false },
      { name: "Addetto doccia", isRepeatable: false },
      { name: "Capotreno", isRepeatable: false },
      { name: "Sopravvissuto", isRepeatable: true },
      { name: "Prigioniero", isRepeatable: true },
    ],
  },
];
