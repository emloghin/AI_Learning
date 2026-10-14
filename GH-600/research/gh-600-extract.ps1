# Extracts questions + community votes from saved GH-600 discussion HTMLs
# into questions-extract.json (for site build) and questions-for-review.md (for answer generation)
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot

# --- Official answers from exam view page 1 (Q1-10) ---
$viewFile = Join-Path $root 'gh-600-view-page1.html'
if (-not (Test-Path $viewFile)) {
  Copy-Item 'C:\Users\ELoghin\.local\share\opencode\tool-output\tool_135114fa5001jholbcu7sQKbU4' $viewFile
}
$viewHtml = Get-Content $viewFile -Raw
$official = @{}
$cards = [regex]::Matches($viewHtml, '(?s)<div class="card exam-question-card" id="qqq(\d+)">(.*?)(?=<div class="card exam-question-card" id="qqq|\z)')
foreach ($c in $cards) {
  $qn = [int]$c.Groups[1].Value
  $body = $c.Groups[2].Value
  if ($body -match 'Correct Answer:</strong>\s*(?:<strong class="ml-1">)?(?:<img[^>]*src="(https://img\.examtopics\.com/gh-600/[^"]+)"|([A-E]))') {
    if ($Matches[1]) { $official[$qn] = @{ type = 'image'; value = ($Matches[1] -split '/')[-1] } }
    else { $official[$qn] = @{ type = 'letter'; value = $Matches[2] } }
  }
}
Write-Host "Official answers extracted: $($official.Count) (Q1-10)"

# --- Per-discussion extraction ---
function Get-QuestionHtml($html) {
  $m = [regex]::Match($html, '(?s)Question #:\s*\d+\s*</i>\s*Topic #:\s*\d+(.*?)(?:Show Suggested Answer)')
  if (-not $m.Success) { $m = [regex]::Match($html, '(?s)\[All GH-600 Questions\](.*?)Show Suggested Answer') }
  $frag = $m.Groups[1].Value
  $frag = $frag -replace 'https://img\.examtopics\.com/gh-600/', 'images/'
  $frag = $frag -replace '(?s)<div class="[^"]*vote[^"]*".*?</div>', ''
  $frag.Trim()
}
function Get-QuestionText($html) {
  $q = Get-QuestionHtml $html
  $t = $q -replace '<br\s*/?>', "`n" -replace '<[^>]+>', '' -replace '&nbsp;', ' ' -replace '&', '&' -replace '"', '"' -replace '&#39;', "'"
  ($t -replace '\n{3,}', "`n`n").Trim()
}
function Get-Votes($html) {
  $votes = @{}
  foreach ($m in [regex]::Matches($html, 'Selected Answer:\s*(?:<[^>]+>\s*){0,3}([A-E])\b')) {
    $l = $m.Groups[1].Value
    $votes[$l] = 1 + ($votes[$l] ?? 0)
  }
  $votes
}

$questions = @()
$global = 0
foreach ($f in Get-ChildItem (Join-Path $root 'gh-600-pages') -Filter *.html | Sort-Object Name) {
  $global++
  $html = Get-Content $f.FullName -Raw
  if ($f.BaseName -match 'topic-(\d+)-question-(\d+)') { $topic = [int]$Matches[1]; $qnum = [int]$Matches[2] }
  $votes = Get-Votes $html
  $majority = $null; $max = 0; $total = ($votes.Values | Measure-Object -Sum).Sum
  foreach ($k in $votes.Keys) { if ($votes[$k] -gt $max) { $max = $votes[$k]; $majority = $k } }
  $q = [ordered]@{
    n = $global; topic = $topic; qnum = $qnum
    slug = $f.BaseName
    html = (Get-QuestionHtml $html)
    text = (Get-QuestionText $html)
    official = $official[$global]
    votes = $votes; majority = $majority; voteTotal = $total
  }
  $questions += $q
}

$questions | ConvertTo-Json -Depth 5 | Set-Content (Join-Path $root 'questions-extract.json') -Encoding UTF8

# --- Compact review file (no comments) ---
$lines = @('# GH-600 questions for answer generation')
foreach ($q in $questions) {
  $off = if ($q.official) { "OFFICIAL=$($q.official.type):$($q.official.value)" } else { 'OFFICIAL=none' }
  $maj = if ($q.majority) { "COMMUNITY=$($q.majority) ($($q.votes[$q.majority])/$($q.voteTotal) votes: $(($q.votes.GetEnumerator() | ForEach-Object { "$($_.Key)=$($_.Value)" }) -join ','))" } else { 'COMMUNITY=none' }
  $lines += ''
  $lines += "=== Q$($q.n) [topic $($q.topic) q$($q.qnum)] $off $maj ==="
  $lines += $q.text
}
Set-Content (Join-Path $root 'questions-for-review.md') $lines -Encoding UTF8
Write-Host "Extracted $($questions.Count) questions"
Write-Host "Vote coverage: $(($questions | Where-Object majority).Count)/58 have community votes"
Write-Host "Official coverage: $(($questions | Where-Object official).Count)/58"
