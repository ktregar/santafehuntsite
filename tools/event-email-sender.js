// Santa Fe Hunt — Event Info Email Sender
// Paste this entire file into Tools > Script editor in your Google Sheet.
// A "Hunt Club" menu will appear when you open the sheet.
//
// ── CONFIGURE THESE TWO LINES FOR EACH SHEET ──────────────────────────────
var NAME_COLUMN  = 1;  // Column A=1, B=2, C=3, D=4, E=5, F=6 ...
var EMAIL_COLUMN = 2;  // Column A=1, B=2, C=3, D=4, E=5, F=6 ...
// ──────────────────────────────────────────────────────────────────────────
//
// Row 1 is always treated as a header row and skipped.
// A "Sent?" column is added automatically next to the email column the first
// time you run the script. Rows already marked "✓ Sent" are skipped on
// future runs, so you can safely re-open the dialog without double-sending.

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Hunt Club")
    .addItem("Send Info Email…", "showEmailDialog")
    .addSeparator()
    .addItem("Send test email to myself…", "showTestEmailDialog")
    .addItem("Set my test email address…", "setTestEmailAddress")
    .addToUi();
}

function setTestEmailAddress() {
  var props = PropertiesService.getUserProperties();
  var current = props.getProperty("testEmailAddress") || "";
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt(
    "Set test email address",
    "Enter the email address to use for test sends:" + (current ? "\n(Current: " + current + ")" : ""),
    ui.ButtonSet.OK_CANCEL
  );
  if (result.getSelectedButton() === ui.Button.OK) {
    var entered = result.getResponseText().trim();
    if (entered) {
      props.setProperty("testEmailAddress", entered);
      ui.alert("Test email address saved: " + entered);
    }
  }
}

function showTestEmailDialog() {
  var props = PropertiesService.getUserProperties();
  var testEmail = props.getProperty("testEmailAddress") || "";
  if (!testEmail) {
    SpreadsheetApp.getUi().alert(
      "No test email set yet.\n\nGo to Hunt Club → Set my test email address… first."
    );
    return;
  }
  var html = HtmlService.createHtmlOutput(
    EMAIL_DIALOG_HTML.replace("__IS_TEST__", "true").replace("__TEST_EMAIL__", testEmail)
  )
    .setWidth(600)
    .setHeight(540)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(html, "Send Test Email (to " + testEmail + " only)");
}

// Called by the test dialog — sends only to the saved test address.
function sendTestEmail(subject, body) {
  var props = PropertiesService.getUserProperties();
  var testEmail = props.getProperty("testEmailAddress") || "";
  if (!testEmail) return "No test email address set. Use Hunt Club → Set my test email address…";

  var personalBody = body.replace(/\{\{name\}\}/g, "Test Name");
  var htmlBody = personalBody
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");

  try {
    GmailApp.sendEmail(testEmail, "[TEST] " + subject, personalBody, { htmlBody: htmlBody });
    return "Test email sent to " + testEmail + "!\n\nCheck your inbox to preview it, then come back and use \"Send Info Email…\" to send to everyone.";
  } catch (e) {
    return "Error: " + e.message;
  }
}

function showEmailDialog() {
  var html = HtmlService.createHtmlOutput(EMAIL_DIALOG_HTML)
    .setWidth(600)
    .setHeight(520)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(html, "Send Event Info Email");
}

// Called by the dialog when the user clicks Send.
function sendEventEmails(subject, body) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data   = sheet.getDataRange().getValues();

  // Ensure a "Sent?" header exists in column C.
  var sentCol = EMAIL_COLUMN + 1;
  if (data[0][sentCol - 1] !== "Sent?") {
    sheet.getRange(1, sentCol).setValue("Sent?");
    data[0][sentCol - 1] = "Sent?";
  }

  var sent = 0, skipped = 0, errors = [];

  for (var i = 1; i < data.length; i++) {
    var name  = String(data[i][NAME_COLUMN - 1]  || "").trim();
    var email = String(data[i][EMAIL_COLUMN - 1] || "").trim();
    var alreadySent = String(data[i][EMAIL_COLUMN] || "").trim();

    // Skip blank rows.
    if (!name && !email) continue;

    // Skip rows already sent.
    if (alreadySent === "✓ Sent") { skipped++; continue; }

    // Basic email sanity check.
    if (!email || !email.includes("@")) {
      errors.push("Row " + (i + 1) + ": \"" + name + "\" — missing or invalid email.");
      continue;
    }

    // Replace {{name}} placeholder with the participant's name.
    // Falls back to "there" if the name cell is empty.
    var greeting = name || "there";
    var personalBody = body.replace(/\{\{name\}\}/g, greeting);

    // Build HTML version: **text** → <strong>text</strong>, newlines → <br>.
    var htmlBody = personalBody
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");

    try {
      GmailApp.sendEmail(email, subject, personalBody, { htmlBody: htmlBody });
      sheet.getRange(i + 1, sentCol).setValue("✓ Sent");
      sent++;
    } catch (e) {
      errors.push("Row " + (i + 1) + ": \"" + name + "\" (" + email + ") — " + e.message);
    }
  }

  // Build a summary to return to the dialog.
  var summary = "Done! " + sent + " email" + (sent !== 1 ? "s" : "") + " sent.";
  if (skipped > 0) summary += " " + skipped + " already-sent row" + (skipped !== 1 ? "s" : "") + " skipped.";
  if (errors.length > 0) summary += "\n\nProblems:\n" + errors.join("\n");
  return summary;
}

// ---------------------------------------------------------------------------
// Dialog HTML — inline so the whole script is one file.
// ---------------------------------------------------------------------------
var EMAIL_DIALOG_HTML = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: Arial, sans-serif; font-size: 13px; padding: 16px; color: #222; }
  label { display: block; font-weight: bold; margin-top: 12px; margin-bottom: 4px; }
  input[type=text], textarea {
    width: 100%; box-sizing: border-box;
    border: 1px solid #ccc; border-radius: 3px;
    padding: 6px 8px; font-size: 13px; font-family: Arial, sans-serif;
  }
  textarea { height: 220px; resize: vertical; }
  .hint { font-size: 11px; color: #666; margin-top: 3px; }
  .test-banner { background: #fff8e1; border: 1px solid #f9a825; border-radius: 3px;
                 padding: 7px 10px; margin-bottom: 10px; font-size: 12px; display: none; }
  .buttons { margin-top: 16px; display: flex; gap: 8px; align-items: center; }
  button { padding: 7px 18px; border: none; border-radius: 3px; cursor: pointer; font-size: 13px; }
  #sendBtn { background: #1a3a5c; color: #fff; }
  #sendBtn:disabled { background: #999; cursor: default; }
  #cancelBtn { background: #eee; color: #333; }
  #status { margin-top: 14px; white-space: pre-wrap; font-size: 12px; color: #333;
            background: #f4f4f4; border-radius: 3px; padding: 8px; display: none; }
</style>
</head>
<body>

<div class="test-banner" id="testBanner"></div>

<label for="subject">Subject line</label>
<input type="text" id="subject" placeholder="e.g. Hunter Pace — Saturday details & directions" />

<label for="body">Email body</label>
<p class="hint">Use <strong>{{name}}</strong> for each person's name. Wrap text in <strong>**double asterisks**</strong> to make it bold.</p>
<textarea id="body" placeholder="Hi {{name}},

Here are the details for Saturday's Hunter Pace...

**Directions:** ...
**Arrival time:** ...
**Lunch:** ...

See you out there,
Kristen"></textarea>

<div class="buttons">
  <button id="sendBtn" onclick="send()">Send emails</button>
  <button id="cancelBtn" onclick="google.script.host.close()">Cancel</button>
  <span id="spinner" style="display:none; color:#666;">Sending…</span>
</div>

<div id="status"></div>

<script>
var isTest = __IS_TEST__;
var testEmail = "__TEST_EMAIL__";

if (isTest) {
  var banner = document.getElementById('testBanner');
  banner.style.display = 'block';
  banner.textContent = 'TEST MODE — this will send only to ' + testEmail + '. Your name placeholder will show as "Test Name".';
  document.getElementById('sendBtn').textContent = 'Send test email';
}

function send() {
  var subject = document.getElementById('subject').value.trim();
  var body    = document.getElementById('body').value.trim();
  if (!subject) { alert('Please enter a subject line.'); return; }
  if (!body)    { alert('Please enter the email body.'); return; }

  document.getElementById('sendBtn').disabled = true;
  document.getElementById('spinner').style.display = 'inline';

  var fn = isTest ? google.script.run.sendTestEmail : google.script.run.sendEventEmails;
  google.script.run
    .withSuccessHandler(function(msg) {
      document.getElementById('spinner').style.display = 'none';
      var s = document.getElementById('status');
      s.style.display = 'block';
      s.textContent = msg;
    })
    .withFailureHandler(function(err) {
      document.getElementById('spinner').style.display = 'none';
      document.getElementById('sendBtn').disabled = false;
      var s = document.getElementById('status');
      s.style.display = 'block';
      s.textContent = 'Error: ' + err.message;
    })
    [isTest ? 'sendTestEmail' : 'sendEventEmails'](subject, body);
}
</script>
</body>
</html>
`;
