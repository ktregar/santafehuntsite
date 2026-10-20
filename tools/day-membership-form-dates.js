// Santa Fe Hunt — Day Membership (capping) form: hunt dates
// Paste this entire file into the 2026-2027 Day Membership form's script editor
// (open the form > ⋮ menu > Script editor), save, then run setUpForm once.
//
// What it does:
//   1. Replaces the "Date for Day Membership" choices with this season's hunt
//      days, each labeled with weekday, date, place and (in autumn) start time.
//   2. Hides dates that have already passed.
//   3. Installs a nightly trigger that re-runs step 2, so yesterday's hunt
//      drops off the list on its own all season.
//
// Pricing and the Payable connection are NOT touched — do those by hand.
//
// ── SEASON DATES (from the 26-27 fixture card, draft V2) ─────────────────────
// Each row: [ "YYYY-MM-DD", "Place", "note (optional)" ]
// Opening Hunt (Nov 14) is left off because it has its own registration form.
var HUNT_DAYS = [
  ["2026-10-20", "Costo", "Autumn hunting, 8:00 a.m."],
  ["2026-10-24", "Costo", "Autumn hunting, 9:00 a.m."],
  ["2026-10-27", "Costo", "Autumn hunting, 8:00 a.m."],
  ["2026-10-31", "Garner Ranch", "Autumn hunting, 9:00 a.m."],
  ["2026-11-03", "Costo", "Autumn hunting, 8:00 a.m."],
  ["2026-11-07", "Costo", "Autumn hunting, 9:00 a.m."],
  ["2026-11-10", "Costo", "Autumn hunting, 8:00 a.m."],
  ["2026-11-17", "Costo", ""],
  ["2026-11-21", "Costo", ""],
  ["2026-11-24", "Costo", ""],
  ["2026-11-28", "Garner Ranch", "Thanksgiving Hunt"],
  ["2026-12-01", "Costo", ""],
  ["2026-12-05", "Costo", ""],
  ["2026-12-08", "Garner Ranch", ""],
  ["2026-12-12", "Costo", ""],
  ["2026-12-15", "Costo", ""],
  ["2026-12-19", "Costo", ""],
  ["2026-12-26", "Garner Ranch", "Boxing Day"],
  ["2027-01-02", "Costo", ""],
  ["2027-01-04", "Costo", ""],
  ["2027-01-09", "Garner Ranch", ""],
  ["2027-01-18", "Costo", "MLK Day"],
  ["2027-01-23", "Garner Ranch", ""],
  ["2027-01-26", "Costo", ""],
  ["2027-01-30", "Costo", ""],
  ["2027-02-02", "Costo", "Groundhog Day"],
  ["2027-02-09", "Costo", ""],
  ["2027-02-13", "Garner Ranch", "Valentine's Day"],
  ["2027-02-15", "Costo", "Presidents' Day"],
  ["2027-02-23", "Costo", ""],
  ["2027-02-27", "Garner Ranch", ""],
  ["2027-03-02", "Costo", ""],
  ["2027-03-09", "Costo", ""],
  ["2027-03-13", "Garner Ranch", "St. Patrick's Day Hunt"],
  ["2027-03-16", "Costo", ""],
  ["2027-03-20", "Costo", ""],
  ["2027-03-23", "Costo", ""],
  ["2027-03-27", "Garner Ranch", ""],
  ["2027-04-06", "Costo", ""],
  ["2027-04-10", "Garner Ranch", "Closing Hunt"]
];
var DATE_QUESTION_TITLE = "Date for Day Membership";
var FORM_DESCRIPTION =
  "Please fill out this form to cap (ride as a guest) with the Santa Fe Hunt. " +
  "Choose one hunt day per registration. Autumn hunting runs until Opening Hunt " +
  "on November 14: Tuesdays at 8:00 a.m. and Saturdays at 9:00 a.m. " +
  "Please also let our Huntsman, Steve, know you're coming: santafehuntsman@gmail.com.";
// ─────────────────────────────────────────────────────────────────────────────

var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

function label_(row) {
  var p = row[0].split("-");
  var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  var text = DAYS[d.getDay()] + ", " + MONTHS[d.getMonth()] + " " + d.getDate() + " · " + row[1];
  if (row[2]) text += " · " + row[2];
  return text;
}

function upcoming_() {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  return HUNT_DAYS.filter(function (row) {
    var p = row[0].split("-");
    return new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])) >= today;
  }).map(label_);
}

function dateQuestion_(form) {
  var items = form.getItems();
  for (var i = 0; i < items.length; i++) {
    if (items[i].getTitle() === DATE_QUESTION_TITLE) return items[i];
  }
  throw new Error('Could not find a question titled "' + DATE_QUESTION_TITLE + '".');
}

function setChoices_(form, labels) {
  var item = dateQuestion_(form);
  var type = item.getType();
  if (type === FormApp.ItemType.MULTIPLE_CHOICE) {
    item.asMultipleChoiceItem().setChoiceValues(labels);
  } else if (type === FormApp.ItemType.LIST) {
    item.asListItem().setChoiceValues(labels);
  } else if (type === FormApp.ItemType.CHECKBOX) {
    item.asCheckboxItem().setChoiceValues(labels);
  } else {
    throw new Error("The date question isn't a choice question.");
  }
}

// Run this once.
function setUpForm() {
  var form = FormApp.getActiveForm();
  form.setDescription(FORM_DESCRIPTION);
  setChoices_(form, upcoming_());
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === "removePastDates") ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger("removePastDates").timeBased().everyDays(1).atHour(1).create();
}

// Runs nightly on its own after setUpForm. Safe to run by hand too.
function removePastDates() {
  var form = FormApp.getActiveForm();
  var labels = upcoming_();
  if (labels.length === 0) {
    form.setAcceptingResponses(false);
    return;
  }
  setChoices_(form, labels);
}
