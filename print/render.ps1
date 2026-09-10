# Renders a print card HTML file to PDF (US Letter) and PNG (2040x2640) with headless Chrome.
# Usage:  powershell -File print\render.ps1 fall-hunt-card-2026
param([string]$Name = "fall-hunt-card-2026")

$here    = Split-Path -Parent $MyInvocation.MyCommand.Path
$chrome  = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) { $chrome = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" }
$html    = Join-Path $here "$Name.html"
$url     = "file:///" + ($html -replace '\\', '/')
$profile = Join-Path $env:TEMP "sfh-print-render-profile"

$common = @("--headless=new", "--disable-gpu", "--hide-scrollbars", "--user-data-dir=$profile",
            "--virtual-time-budget=15000", "--run-all-compositor-stages-before-draw")

& $chrome @common "--no-pdf-header-footer" "--print-to-pdf=$(Join-Path $here "$Name.pdf")" $url | Out-Null
& $chrome @common "--window-size=816,1056" "--force-device-scale-factor=2.5" "--screenshot=$(Join-Path $here "$Name.png")" $url | Out-Null

Get-ChildItem (Join-Path $here "$Name.*") | Select-Object Name, Length
