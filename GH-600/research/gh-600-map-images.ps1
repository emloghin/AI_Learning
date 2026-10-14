# Maps questions to exhibit images + extracts community vote snippets
$ErrorActionPreference = 'Stop'
$root = $PSScriptRoot
$out = @()
foreach ($f in Get-ChildItem (Join-Path $root 'gh-600-pages') -Filter *.html | Sort-Object Name) {
  $h = Get-Content $f.FullName -Raw
  $t = 0; $q = 0
  if ($f.BaseName -match 'topic-(\d+)-question-(\d+)') { $t = [int]$Matches[1]; $q = [int]$Matches[2] }
  $id = ($f.BaseName -split '-')[0]
  $imgs = [regex]::Matches($h, 'https://img\.examtopics\.com/gh-600/([^"''<> ]+)') |
    ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique
  $out += "Q$id [t$t q$q] images: $($imgs -join ', ')"
  # community snippets: vote letter + following explanation text
  $plain = $h -replace '<br\s*/?>', "`n" -replace '<[^>]+>', ' ' -replace '&nbsp;', ' '
  foreach ($m in [regex]::Matches($plain, '(?s)(?:Correct answer|Selected Answer)\s*[:\s]*\s*([A-E])\b(.{0,400}?)(?=Selected Answer|Correct answer|Commenting|\z)')) {
    $txt = ($m.Groups[2].Value -replace '\s+', ' ').Trim()
    if ($txt.Length -gt 180) { $txt = $txt.Substring(0, 180) }
    $out += "   VOTE $($m.Groups[1].Value) > $txt"
  }
}
$out | Set-Content (Join-Path $root 'q-image-votes.txt') -Encoding UTF8
Write-Host "Done: $($out.Count) lines"
