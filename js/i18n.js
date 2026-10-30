// Skia Shading Solutions: English / Greek switch.
//
// How it works: the HTML is written in English. Below is a dictionary of
// "English text -> Greek text". When the visitor picks Greek, we find every
// piece of text (and alt / placeholder / aria-label) on the page that matches
// an English key and swap it. Picking English puts the originals back.
//
// To change a Greek sentence, edit its value below. The key (left side) must
// match the English text in index.html exactly (extra spaces / line breaks
// in the HTML don't matter).

(() => {
  const EL = {
    // ----- Page title + sharing text (<head>) -----
    "Skia Shading Solutions | Awnings and blinds in Nicosia":
      "Skia Shading Solutions | Τέντες και στόρια στη Λευκωσία",
    "Folding arm, capotina and vertical awnings, blinds, plus awning repairs and new fabrics, measured and installed across Nicosia, Cyprus.":
      "Τέντες με πτυσσόμενους βραχίονες, καποτίνες και κάθετες τέντες, στόρια, καθώς και επισκευές τεντών και νέα υφάσματα, με μέτρηση και τοποθέτηση σε όλη τη Λευκωσία, Κύπρο.",
    "Awnings and blinds, measured and installed across Nicosia.":
      "Τέντες και στόρια, με μέτρηση και τοποθέτηση σε όλη τη Λευκωσία.",

    // ----- Header -----
    "Skip to content": "Μετάβαση στο περιεχόμενο",
    "Skia Shading Solutions, back to top":
      "Skia Shading Solutions, επιστροφή στην κορυφή",
    Menu: "Μενού",
    Main: "Κύρια πλοήγηση",
    Language: "Γλώσσα",
    Products: "Προϊόντα",
    "How it works": "Πώς λειτουργεί",
    "Where we work": "Πού εργαζόμαστε",
    "Get a quote": "Ζητήστε προσφορά",
    "Call 99 000 000": "Καλέστε 99 000 000",

    // ----- Hero -----
    "Make your terrace usable in July.":
      "Απολαύστε τη βεράντα σας και τον Ιούλιο.",
    "Awnings and blinds for homes, cafés and shops across Nicosia. We measure, supply and install, so the hottest part of your day becomes the part you spend outside.":
      "Τέντες και στόρια για σπίτια, καφέ και καταστήματα σε όλη τη Λευκωσία. Μετράμε, προμηθεύουμε και τοποθετούμε, ώστε το πιο ζεστό κομμάτι της ημέρας σας να γίνει εκείνο που περνάτε έξω.",
    "Get a free quote": "Ζητήστε δωρεάν προσφορά",
    "Message us on WhatsApp": "Στείλτε μας μήνυμα στο WhatsApp",
    "A family eating lunch on a sea-view terrace under a teal folding arm awning":
      "Οικογένεια τρώει μεσημεριανό σε βεράντα με θέα τη θάλασσα, κάτω από πετρόλ τέντα με πτυσσόμενους βραχίονες",

    // ----- Products -----
    "Where do you need shade?": "Πού χρειάζεστε σκιά;",
    "Pick the spot. We'll show you what usually works there.":
      "Διαλέξτε το σημείο. Θα σας δείξουμε τι συνήθως λειτουργεί εκεί.",
    "Choose where you need shade": "Επιλέξτε πού χρειάζεστε σκιά",
    "Over a terrace or balcony": "Πάνω από βεράντα ή μπαλκόνι",
    "Folding arm awning": "Τέντα με πτυσσόμενους βραχίονες",
    "Over a door or window": "Πάνω από πόρτα ή παράθυρο",
    "Capotina awning": "Τέντα καποτίνα",
    "Over a patio or shop front": "Πάνω από αυλή ή βιτρίνα καταστήματος",
    "Awning with support arms and roller tube":
      "Τέντα με βραχίονες στήριξης και σωλήνα ρολού",
    "Around a balcony or pergola": "Γύρω από μπαλκόνι ή πέργκολα",
    "Vertical awning": "Κάθετη τέντα",
    "Inside, at the windows": "Μέσα, στα παράθυρα",
    Blinds: "Στόρια",
    "Works well for": "Ιδανικό για",
    "Ask about this awning": "Ρωτήστε για αυτή την τέντα",
    "Ask about blinds": "Ρωτήστε για τα στόρια",

    "Folding arm awning shading a family on a terrace sofa":
      "Τέντα με πτυσσόμενους βραχίονες σκιάζει οικογένεια σε καναπέ βεράντας",
    "A fabric canopy on folding arms that opens out from the wall and rolls back into a compact cassette when you don't need it. The classic choice for open terraces and café fronts.":
      "Υφασμάτινο στέγαστρο σε πτυσσόμενους βραχίονες που ανοίγει από τον τοίχο και μαζεύεται σε μια συμπαγή κασετίνα όταν δεν το χρειάζεστε. Η κλασική επιλογή για ανοιχτές βεράντες και προσόψεις καφέ.",
    "South- and west-facing terraces":
      "Βεράντες με νότιο και δυτικό προσανατολισμό",
    "Balconies with no roof above": "Μπαλκόνια χωρίς στέγη από πάνω",
    "Café and restaurant seating": "Καθιστικά καφέ και εστιατορίων",

    "Green and white striped capotina awning over a window with green shutters":
      "Πράσινη και λευκή ριγέ τέντα καποτίνα πάνω από παράθυρο με πράσινα παντζούρια",
    "A hooded fabric canopy that sits over a door or window. It keeps the sun off the entrance or the glass, and gives the front of a home or shop a finished look.":
      "Υφασμάτινο στέγαστρο σε σχήμα κουκούλας πάνω από πόρτα ή παράθυρο. Κρατά τον ήλιο μακριά από την είσοδο ή το τζάμι και δίνει ολοκληρωμένη όψη στην πρόσοψη ενός σπιτιού ή καταστήματος.",
    "Front doors and entrances": "Εξώπορτες και είσοδοι",
    "Windows that face the sun": "Παράθυρα που βλέπουν στον ήλιο",
    "Shop fronts": "Προσόψεις καταστημάτων",

    "The fabric winds onto a roller tube, and support arms hold the awning out from the wall when it is open. A simple, practical shade for patios, entrances and shop fronts.":
      "Το ύφασμα τυλίγεται σε σωλήνα ρολού και οι βραχίονες στήριξης κρατούν την τέντα μακριά από τον τοίχο όταν είναι ανοιχτή. Μια απλή, πρακτική λύση σκίασης για αυλές, εισόδους και προσόψεις καταστημάτων.",
    "Patios and entrances": "Αυλές και είσοδοι",
    "Walls and windows that get strong sun":
      "Τοίχοι και παράθυρα με έντονο ήλιο",

    "White vertical awning lowered across the open side of a terrace by the sea":
      "Λευκή κάθετη τέντα κατεβασμένη στην ανοιχτή πλευρά μιας βεράντας δίπλα στη θάλασσα",
    "Dark vertical awnings enclosing a terrace with planters":
      "Σκούρες κάθετες τέντες που κλείνουν μια βεράντα με γλάστρες",
    "A screen that drops straight down from above and runs in side channels, so it stays in place. It closes the open sides of a veranda or pergola and turns it into a shaded outdoor room.":
      "Πανί που κατεβαίνει κατακόρυφα από πάνω και κινείται σε πλαϊνούς οδηγούς, ώστε να μένει στη θέση του. Κλείνει τις ανοιχτές πλευρές μιας βεράντας ή πέργκολας και την κάνει σκιερό εξωτερικό δωμάτιο.",
    "Open sides of verandas and pergolas":
      "Ανοιχτές πλευρές βεραντών και πέργκολων",
    "Large glass doors that heat up":
      "Μεγάλες γυάλινες πόρτες που ζεσταίνονται",
    "Keeping sun off the glass before it gets in":
      "Να μην χτυπά ο ήλιος το τζάμι πριν μπει μέσα",

    "Sheer roller blinds lowered across tall living room windows":
      "Διαφανή στόρια ρολό κατεβασμένα σε ψηλά παράθυρα σαλονιού",
    "Black day-and-night zebra blind on a window":
      "Μαύρο στόρι ζέβρα day-and-night σε παράθυρο",
    "Roller blinds and day-and-night (zebra) blinds, made to your window size. Choose a screen fabric that softens the light and keeps the view, or blackout for bedrooms.":
      "Στόρια ρολό και day-and-night (ζέβρα), φτιαγμένα στις διαστάσεις του παραθύρου σας. Επιλέξτε ύφασμα screen που απαλύνει το φως και κρατά τη θέα, ή blackout για τα υπνοδωμάτια.",
    "Living rooms with big windows": "Σαλόνια με μεγάλα παράθυρα",
    "Bedrooms that need to stay dark":
      "Υπνοδωμάτια που πρέπει να μένουν σκοτεινά",
    "Offices with screen glare": "Γραφεία με αντανάκλαση στις οθόνες",

    // Repairs strip + form option
    "Already have an awning?": "Έχετε ήδη τέντα;",
    "We repair awnings and replace awning fabrics, so a faded or torn awning can get a second life.":
      "Επισκευάζουμε τέντες και αντικαθιστούμε τα υφάσματά τους, ώστε μια ξεθωριασμένη ή σκισμένη τέντα να αποκτήσει δεύτερη ζωή.",
    "Ask about a repair": "Ρωτήστε για επισκευή",
    "Repair or new fabric": "Επισκευή ή νέο ύφασμα",

    // ----- Process -----
    "From first message to finished install":
      "Από το πρώτο μήνυμα μέχρι την ολοκληρωμένη τοποθέτηση",
    "Tell us what you need": "Πείτε μας τι χρειάζεστε",
    "Send a WhatsApp, call, or fill in the form. A couple of photos of the space help a lot.":
      "Στείλτε μήνυμα στο WhatsApp, τηλεφωνήστε ή συμπληρώστε τη φόρμα. Μερικές φωτογραφίες του χώρου βοηθούν πολύ.",
    "We come to measure": "Έρχομαστε να μετρήσουμε",
    "We visit, measure, check the wall, and bring fabric samples so you see the colours in your own light.":
      "Επισκεπτόμαστε τον χώρο, μετράμε, ελέγχουμε τον τοίχο και φέρνουμε δείγματα υφάσματος ώστε να δείτε τα χρώματα στο δικό σας φως.",
    "You get a written quote": "Παίρνετε γραπτή προσφορά",
    "One clear price for the product, fabric and fitting. Take your time to decide.":
      "Μία σαφής τιμή για το προϊόν, το ύφασμα και την τοποθέτηση. Πάρτε τον χρόνο σας να αποφασίσετε.",
    "We install": "Τοποθετούμε",
    "We fit it, show you how it works, and leave the place clean.":
      "Το τοποθετούμε, σας δείχνουμε πώς λειτουργεί και αφήνουμε τον χώρο καθαρό.",

    // ----- Area -----
    "A smiling family sitting together under an open awning":
      "Χαμογελαστή οικογένεια κάθεται μαζί κάτω από ανοιχτή τέντα",
    "Based in Nicosia": "Με έδρα τη Λευκωσία",
    "We work across Nicosia and the nearby areas, including Strovolos, Lakatamia, Latsia, Aglantzia, Engomi and Agios Dometios. Further out? Ask, and we'll tell you straight away if we can come.":
      "Εργαζόμαστε σε όλη τη Λευκωσία και στις γύρω περιοχές, μεταξύ άλλων στον Στρόβολο, στη Λακατάμια, στα Λατσιά, στην Αγλαντζιά, στην Έγκωμη και στον Άγιο Δομέτιο. Πιο μακριά; Ρωτήστε μας και θα σας πούμε αμέσως αν μπορούμε να έρθουμε.",
    // This follows the Greek word «Σκιά» (kept in the HTML as its own <span>)
    "is Greek for shade. That's the whole job: giving you more of it, exactly where you sit.":
      "είναι το όνομά μας και η δουλειά μας: περισσότερη σκιά, ακριβώς εκεί που κάθεστε.",

    // ----- Quote form -----
    "Tell us a little about the space. Sending the form opens WhatsApp with your message ready, so nothing gets lost in an inbox.":
      "Πείτε μας λίγα λόγια για τον χώρο. Η αποστολή της φόρμας ανοίγει το WhatsApp με έτοιμο το μήνυμά σας, ώστε τίποτα να μη χαθεί σε κάποιο email.",
    Phone: "Τηλέφωνο",
    "Message us": "Στείλτε μας μήνυμα",
    "Your name": "Το όνομά σας",
    "Add your name so we know who to reply to.":
      "Προσθέστε το όνομά σας για να ξέρουμε σε ποιον να απαντήσουμε.",
    Area: "Περιοχή",
    "(optional)": "(προαιρετικό)",
    "For example, Strovolos": "Για παράδειγμα, Στρόβολος",
    "What are you interested in?": "Τι σας ενδιαφέρει;",
    "Not sure yet": "Δεν έχω αποφασίσει ακόμα",
    "About the space": "Για τον χώρο",
    "Rough size, which way it faces, anything else we should know":
      "Κατά προσέγγιση μέγεθος, προσανατολισμός, οτιδήποτε άλλο πρέπει να γνωρίζουμε",
    "Send on WhatsApp": "Αποστολή μέσω WhatsApp",

    // ----- Footer -----
    "Awnings and blinds, measured and installed in Nicosia, Cyprus.":
      "Τέντες και στόρια, με μέτρηση και τοποθέτηση στη Λευκωσία, Κύπρο.",

    // ----- WhatsApp message (built in main.js) -----
    "Hi Skia, I'd like a quote.": "Γεια σας Skia, θα ήθελα μια προσφορά.",
    "Name:": "Όνομα:",
    "Area:": "Περιοχή:",
    "Interested in:": "Ενδιαφέρομαι για:",
    "About the space:": "Για τον χώρο:",
  };

  const STORAGE_KEY = "skia-lang";
  const norm = (s) => s.replace(/\s+/g, " ").trim();
  let lang = "en";

  // t('English text') -> Greek when Greek is selected (used by the WhatsApp message)
  const t = (key) => (lang === "el" && EL[key]) || key;
  window.skiaI18n = {
    t,
    get lang() {
      return lang;
    },
  };

  // ---------- Collect everything that has a Greek version (once) ----------
  const textItems = []; // { node, original, key }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest("script, style")) continue;
    const key = norm(node.nodeValue);
    if (key && EL[key]) textItems.push({ node, original: node.nodeValue, key });
  }

  const attrItems = []; // { el, attr, original, key }
  document
    .querySelectorAll("[alt], [placeholder], [aria-label], meta[content]")
    .forEach((el) => {
      ["alt", "placeholder", "aria-label", "content"].forEach((attr) => {
        if (attr === "content" && el.tagName !== "META") return;
        const value = el.getAttribute(attr);
        const key = value && norm(value);
        if (key && EL[key]) attrItems.push({ el, attr, original: value, key });
      });
    });

  const originalTitle = document.title;

  // ---------- Switch language ----------
  function setLang(next) {
    lang = next;
    const greek = lang === "el";
    document.documentElement.lang = lang;

    textItems.forEach(({ node, original, key }) => {
      // keep the spaces around the text so words don't touch the next element
      const lead = original.match(/^\s*/)[0];
      const trail = original.match(/\s*$/)[0];
      node.nodeValue = greek ? lead + EL[key] + trail : original;
    });
    attrItems.forEach(({ el, attr, original, key }) => {
      el.setAttribute(attr, greek ? EL[key] : original);
    });
    document.title = (greek && EL[norm(originalTitle)]) || originalTitle;

    document.querySelectorAll(".lang-switch button").forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
    });

    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      /* private mode: fine */
    }
  }

  document.querySelectorAll(".lang-switch button").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });

  // First visit: use the browser's language. After that: remember their choice.
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    /* ignore */
  }
  const browserIsGreek = (navigator.language || "")
    .toLowerCase()
    .startsWith("el");
  const start = saved || (browserIsGreek ? "el" : "en");
  if (start === "el") setLang("el");
  else
    document
      .querySelector('.lang-switch button[data-lang="en"]')
      .setAttribute("aria-pressed", "true");
})();
