/**
 * Santa Fe Hunt: automatic new-member welcome emails
 * ---------------------------------------------------
 * Standalone Apps Script project "SFH Welcome Emails" in the
 * santafehounds@gmail.com account (script.google.com). This file in the
 * repo is a copy for safekeeping.
 *
 * What it does (every hour):
 *   Looks at the "SFH Hunt Roster" tab of the 2026-2027 SFH Hunt Roster.
 *   A row gets the welcome email when its "Welcome sent" cell is blank and
 *   Paid? is ticked, OR when someone types "send" in "Welcome sent" (use
 *   that for partial payments). The cell is then stamped with the date so
 *   nobody gets it twice. Anything else in the cell (a date, "Skip") means
 *   leave them alone.
 *
 * Where the wording lives:
 *   A Gmail draft in santafehounds@gmail.com whose subject starts with
 *   "TEMPLATE:" (e.g. "TEMPLATE: Welcome to SFH '26-'27!"). Edit that draft
 *   to change the text, password, season, etc. {{NAME}} is replaced with
 *   the greeting name. The subject members see is everything after
 *   "TEMPLATE:".
 *
 * Juniors:
 *   For Junior / Young Hunter rows whose Spouse/Partner/Parent cell names a
 *   parent like "Christa Gorham (mom)", the greeting becomes
 *   "Dear Christa and Ella,".
 *
 * New season:
 *   Change ROSTER_ID below to the new roster's ID (the long code in its
 *   URL), make sure it has a "Welcome sent" column, and update the template
 *   draft.
 */

const CONFIG = {
  ROSTER_ID: '1HGH6EmpVvay6BjAtOqUjJ_CyBvolz2hqWG71cItxvyc',
  SHEET_NAME: 'SFH Hunt Roster',
  TEMPLATE_PREFIX: 'TEMPLATE:',
  NAME_PLACEHOLDER: '{{NAME}}',
  SENDER_NAME: 'Santa Fe Hounds',
  // true  = create Gmail drafts for you to review and send yourself
  // false = send automatically
  DRAFT_MODE: true,
  JUNIOR_LEVELS: ['J', 'YH', 'JC', 'PCC'],
  HEADERS: {
    first: 'First Name',
    email: 'Email',
    level: 'Membership Level',
    partner: 'Spouse/Partner/Parent',
    paid: 'Paid?',
    sent: 'Welcome sent',
  },
};

/** Hourly job. Also safe to run by hand from the editor. */
function checkRoster() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return;
  try {
    const ctx = loadRoster_();
    const done = [];
    ctx.rows.forEach(function (row, i) {
      if (!String(row[ctx.col.first]).trim() || !String(row[ctx.col.email]).trim()) return;
      const sent = String(row[ctx.col.sent]).trim().toLowerCase();
      const wanted = sent === 'send' || (sent === '' && row[ctx.col.paid] === true);
      if (!wanted) return;
      done.push(welcomeRow_(ctx, i));
    });
    Logger.log(done.length ? 'Welcomed: ' + done.join(', ') : 'Nobody new.');
    return done;
  } finally {
    lock.releaseLock();
  }
}

/** Run once from the editor to start the hourly check. */
function installHourlyTrigger() {
  removeTriggers();
  ScriptApp.newTrigger('checkRoster').timeBased().everyHours(1).create();
  Logger.log('Hourly welcome check is on.');
}

/** Run from the editor to stop the hourly check. */
function removeTriggers() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'checkRoster') ScriptApp.deleteTrigger(t);
  });
}

/** Run from the editor to see what it would do, without sending anything. */
function preview() {
  const ctx = loadRoster_();
  const t = getTemplate_();
  ctx.rows.forEach(function (row) {
    if (!String(row[ctx.col.first]).trim() || !String(row[ctx.col.email]).trim()) return;
    const sent = String(row[ctx.col.sent]).trim().toLowerCase();
    const wanted = sent === 'send' || (sent === '' && row[ctx.col.paid] === true);
    if (!wanted) return;
    Logger.log('Would welcome "' + greetingName_(row[ctx.col.first], row[ctx.col.level],
      row[ctx.col.partner]) + '" at ' + row[ctx.col.email] + ' with subject "' + t.subject + '"');
  });
  Logger.log('Preview done.');
}

// ---------- helpers ----------

function loadRoster_() {
  const sheet = SpreadsheetApp.openById(CONFIG.ROSTER_ID).getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) throw new Error('Could not find the "' + CONFIG.SHEET_NAME + '" tab.');
  const values = sheet.getDataRange().getValues();
  const header = values[0].map(function (h) { return String(h).trim(); });
  const col = {};
  Object.keys(CONFIG.HEADERS).forEach(function (key) {
    const idx = header.indexOf(CONFIG.HEADERS[key]);
    if (idx === -1) throw new Error('Roster is missing the "' + CONFIG.HEADERS[key] + '" column.');
    col[key] = idx;
  });
  return { sheet: sheet, rows: values.slice(1), col: col };
}

/** Sends (or drafts) the welcome for data row i and stamps the sheet. */
function welcomeRow_(ctx, i) {
  const row = ctx.rows[i];
  const greeting = greetingName_(row[ctx.col.first], row[ctx.col.level], row[ctx.col.partner]);
  const to = String(row[ctx.col.email]).split(/[,;\s]+/).filter(String).join(',');
  const t = getTemplate_();

  const html = t.html.split(CONFIG.NAME_PLACEHOLDER).join(greeting);
  const plain = t.plain.split(CONFIG.NAME_PLACEHOLDER).join(greeting);
  const opts = { htmlBody: html, name: CONFIG.SENDER_NAME };

  if (CONFIG.DRAFT_MODE) {
    GmailApp.createDraft(to, t.subject, plain, opts);
  } else {
    GmailApp.sendEmail(to, t.subject, plain, opts);
  }

  const stamp = (CONFIG.DRAFT_MODE ? 'Drafted ' : 'Sent ') +
    Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'M/d/yyyy');
  ctx.sheet.getRange(i + 2, ctx.col.sent + 1).setValue(stamp);
  row[ctx.col.sent] = stamp;
  return greeting;
}

/** "Ella" -> "Christa and Ella" for juniors whose parent is listed as "(mom)" etc. */
function greetingName_(first, level, partner) {
  first = String(first).trim();
  const lvl = String(level).trim().toUpperCase();
  if (CONFIG.JUNIOR_LEVELS.indexOf(lvl) === -1) return first;
  const m = String(partner).match(/([^,(]+?)\s*\((mom|dad|mother|father|parent|guardian)\)/i);
  if (!m) return first;
  const parentFirst = m[1].trim().split(/\s+/)[0];
  return parentFirst ? parentFirst + ' and ' + first : first;
}

function getTemplate_() {
  const draft = GmailApp.getDrafts().filter(function (d) {
    return d.getMessage().getSubject().indexOf(CONFIG.TEMPLATE_PREFIX) === 0;
  })[0];
  if (!draft) {
    throw new Error('No Gmail draft with a subject starting "' + CONFIG.TEMPLATE_PREFIX +
      '" was found in santafehounds@gmail.com. The welcome email was not sent.');
  }
  const msg = draft.getMessage();
  return {
    subject: msg.getSubject().slice(CONFIG.TEMPLATE_PREFIX.length).trim(),
    html: unwrapLinks_(msg.getBody()),
    plain: unwrapLinks_(msg.getPlainBody()),
  };
}

/**
 * Gmail hands back draft links wrapped in expiring google.com/url?q=...
 * redirects. Turn them back into the real addresses.
 */
function unwrapLinks_(text) {
  return text.replace(/https?:\/\/www\.google\.com\/url\?q=([^&"<>\s]+)(?:&amp;|&)?[^"<>\s]*/g,
    function (all, target) {
      try { return decodeURIComponent(target); } catch (e) { return target; }
    });
}
