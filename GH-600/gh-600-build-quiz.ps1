# Builds the GH-600 quiz site from questions-extract.json + verified answer key.
# Reads GH-600 originals, writes ONLY to ../gh-600-quiz (originals untouched).
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$out = Join-Path (Split-Path $root -Parent) 'gh-600-quiz'
New-Item -ItemType Directory -Force -Path $out, "$out/images" | Out-Null
Copy-Item (Join-Path $root 'gh-600-images\*.png') "$out/images/" -Force
Copy-Item 'C:\GIT\GIT-Personal\AI_Learning\ai-models\site\style.css' "$out/style.css" -Force

. "$PSScriptRoot\gh-600-answers.ps1"
foreach ($f in 'gh-600-learn1.ps1','gh-600-learn2.ps1','gh-600-learn3.ps1','gh-600-learn4.ps1') { . (Join-Path $PSScriptRoot $f) }
. "$PSScriptRoot\gh-600-plain.ps1"

$data = Get-Content (Join-Path $root 'questions-extract.json') -Raw | ConvertFrom-Json
$qs = foreach ($q in $data) {
  $h = $q.html
  $h = [regex]::Replace($h, '(?s)^.*?<div class="question-body', '<div class="question-body')
  foreach ($pat in @('(?s)This is a case study\. Case studies are not timed separately\..*?time provided\.', '(?s)To answer the questions included in a case study,.*?return to the question\.', '(?s)At the end of this case study\..*?cannot return to this section\.', '(?s)To start the case study\s*(<br\s*/?>)?', '(?s)To display the first question in this case study,.*?return to the question\.', 'NOTE: Each correct selection is worth one point\.')) {
    $h = [regex]::Replace($h, $pat, '')
  }
  $h = [regex]::Replace($h, '(HOTSPOT|DRAG DROP)<br\s*/>\s*Case study<br\s*/>', '$1<br />')
  $h = [regex]::Replace($h, '<a[^>]*href="https?://www\.examtopics\.com[^>]*>', '')
  $h = [regex]::Replace($h, '</a>', '')
  $h = [regex]::Replace($h, '(<br\s*/?>\s*){3,}', '<br><br>')
  [ordered]@{ n = $q.n; topic = $q.topic; q = $q.qnum; html = $h.Trim(); ans = $A[[int]$q.n] }
}
foreach ($q in $qs) {
  if ($LEARN[[int]$q.n]) { $q.ans = $q.ans -replace '(<span class="whead">Learn more:)', ($LEARN[[int]$q.n] + '$1') }
}
foreach ($q in $qs) {
  if ($PLAIN[[int]$q.n]) { $q.ans = "<div class=`"plain`"><b>In plain words:</b> " + $PLAIN[[int]$q.n] + "</div>" + $q.ans }
}
$js = 'const QUESTIONS = ' + ($qs | ConvertTo-Json -Depth 4 -Compress) + ';'
Set-Content "$out/quiz.js" $js -Encoding UTF8
"Built $($qs.Count) questions, quiz.js $(([int](Get-Item "$out/quiz.js").Length/1KB)) KB, images $((Get-ChildItem "$out/images" -File).Count)"
