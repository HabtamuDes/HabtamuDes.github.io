import type { Language } from "@/lib/localization";

export const notesContent: Record<Language, {
  todoTitle: string;
  remaining: (count: number) => string;
  placeholder: string;
  add: string;
  quickNotes: string;
  quickNotesText: string;
  defaultNotes: string;
  initialTodos: string[];
}> = {
  en: {
    todoTitle: "Todo List",
    remaining: (count) => `${count} item(s) remaining`,
    placeholder: "Add a task",
    add: "Add",
    quickNotes: "Quick Notes",
    quickNotesText: "Editable scratchpad for ideas, reminders, and planning.",
    defaultNotes: "Ideas:\n- Add real project screenshots\n- Attach resume download\n- Expand embedded systems showcase",
    initialTodos: ["Review featured projects", "Open the contact window", "Try one of the desktop games"],
  },
  am: {
    todoTitle: "የተግባር ዝርዝር",
    remaining: (count) => `${count} ተግባር ቀርቷል`,
    placeholder: "ተግባር ጨምር",
    add: "ጨምር",
    quickNotes: "ፈጣን ማስታወሻዎች",
    quickNotesText: "ለሀሳቦች፣ ማስታወሻዎች እና እቅድ የሚጠቅም የሚቀየር ማስታወሻ ቦታ።",
    defaultNotes: "ሀሳቦች:\n- እውነተኛ የፕሮጀክት ስክሪንሾቶች ጨምር\n- CV ማውረጃ አገናኝ አክል\n- የembedded systems ማሳያ አስፋፋ",
    initialTodos: ["ዋና ፕሮጀክቶችን ተመልከት", "የcontact መስኮት ክፈት", "ከdesktop ጨዋታዎች አንዱን ሞክር"],
  },
  fr: {
    todoTitle: "Liste de tâches",
    remaining: (count) => `${count} élément(s) restant(s)`,
    placeholder: "Ajouter une tâche",
    add: "Ajouter",
    quickNotes: "Notes rapides",
    quickNotesText: "Bloc-notes modifiable pour idées, rappels et planification.",
    defaultNotes: "Idées:\n- Ajouter de vraies captures de projets\n- Joindre le téléchargement du CV\n- Développer la vitrine embarquée",
    initialTodos: ["Consulter les projets mis en avant", "Ouvrir la fenêtre de contact", "Essayer un des jeux du bureau"],
  },
  de: {
    todoTitle: "Aufgabenliste",
    remaining: (count) => `${count} Aufgabe(n) offen`,
    placeholder: "Aufgabe hinzufügen",
    add: "Hinzufügen",
    quickNotes: "Schnelle Notizen",
    quickNotesText: "Bearbeitbares Notizfeld für Ideen, Erinnerungen und Planung.",
    defaultNotes: "Ideen:\n- Echte Projekt-Screenshots ergänzen\n- Lebenslauf-Download verlinken\n- Embedded-Showcase weiter ausbauen",
    initialTodos: ["Ausgewählte Projekte ansehen", "Kontaktfenster öffnen", "Eines der Desktop-Spiele ausprobieren"],
  },
};

export const snakeContent: Record<Language, {
  title: string;
  subtitle: string;
  score: string;
  highScore: string;
  pause: string;
  start: string;
  restart: string;
  up: string;
  down: string;
  left: string;
  right: string;
  gameOver: string;
}> = {
  en: { title: "Snake", subtitle: "Use arrow keys to play. Space pauses or resumes.", score: "Score", highScore: "High Score", pause: "Pause", start: "Start", restart: "Restart", up: "Up", down: "Down", left: "Left", right: "Right", gameOver: "Game over. Restart to play again." },
  am: { title: "ስኔክ", subtitle: "ለመጫወት የአቅጣጫ ቁልፎችን ይጠቀሙ። Space ለማቆም ወይም ለመቀጠል ነው።", score: "ነጥብ", highScore: "ከፍተኛ ነጥብ", pause: "አቁም", start: "ጀምር", restart: "እንደገና ጀምር", up: "ላይ", down: "ታች", left: "ግራ", right: "ቀኝ", gameOver: "ጨዋታው ተጠናቋል። እንደገና ለመጫወት restart ይጫኑ።" },
  fr: { title: "Snake", subtitle: "Utilisez les flèches pour jouer. Espace met en pause ou reprend.", score: "Score", highScore: "Meilleur score", pause: "Pause", start: "Démarrer", restart: "Recommencer", up: "Haut", down: "Bas", left: "Gauche", right: "Droite", gameOver: "Partie terminée. Recommencez pour rejouer." },
  de: { title: "Snake", subtitle: "Zum Spielen die Pfeiltasten verwenden. Leertaste pausiert oder setzt fort.", score: "Punktzahl", highScore: "Bestwert", pause: "Pause", start: "Start", restart: "Neu starten", up: "Hoch", down: "Runter", left: "Links", right: "Rechts", gameOver: "Spiel vorbei. Starte neu, um erneut zu spielen." },
};

export const ticTacToeContent: Record<Language, {
  title: string;
  subtitle: string;
  winner: (player: string) => string;
  draw: string;
  turn: (player: string) => string;
  info: string;
  newGame: string;
}> = {
  en: { title: "Tic-Tac-Toe", subtitle: "A simple desktop game to make the portfolio more interactive.", winner: (player) => `Winner: ${player}`, draw: "Draw", turn: (player) => `Turn: ${player}`, info: "Play locally in the browser. This window is draggable, resizable, minimizable, and maximizable like the others.", newGame: "New Game" },
  am: { title: "ቲክ-ታክ-ቶ", subtitle: "ፖርትፎሊዮውን የበለጠ ተግባራዊ ለማድረግ ቀላል የdesktop ጨዋታ።", winner: (player) => `አሸናፊ: ${player}`, draw: "እኩል", turn: (player) => `ተራ: ${player}`, info: "በአሳሽ ውስጥ በአካባቢ ይጫወቱ። ይህ መስኮት እንደሌሎች ሊንቀሳቀስ፣ ሊቀንስ፣ ሊበልጥ ይችላል።", newGame: "አዲስ ጨዋታ" },
  fr: { title: "Morpion", subtitle: "Un petit jeu de bureau pour rendre le portfolio plus interactif.", winner: (player) => `Gagnant : ${player}`, draw: "Égalité", turn: (player) => `Tour : ${player}`, info: "Jouez localement dans le navigateur. Cette fenêtre peut être déplacée, redimensionnée, réduite et agrandie.", newGame: "Nouvelle partie" },
  de: { title: "Tic-Tac-Toe", subtitle: "Ein einfaches Desktop-Spiel, das das Portfolio interaktiver macht.", winner: (player) => `Gewinner: ${player}`, draw: "Unentschieden", turn: (player) => `Zug: ${player}`, info: "Spiele lokal im Browser. Dieses Fenster ist wie die anderen verschiebbar, skalierbar, minimierbar und maximierbar.", newGame: "Neues Spiel" },
};
