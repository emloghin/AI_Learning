# Downloads all exhibit images referenced by the saved GH-600 HTML pages
# into gh-600-images\, then rebuilds gh-600-all.md with local image links
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
$root = $PSScriptRoot

$imgDir = Join-Path $root 'gh-600-images'
New-Item -ItemType Directory -Force -Path $imgDir | Out-Null

# 1. Collect unique image URLs from all saved pages
$urls = Get-ChildItem (Join-Path $root 'gh-600-pages') -Filter *.html | ForEach-Object {
  [regex]::Matches((Get-Content $_.FullName -Raw), 'https://img\.examtopics\.com/gh-600/[^"''<> ]+') |
    ForEach-Object { $_.Value }
} | Sort-Object -Unique
Write-Host "Found $($urls.Count) unique images"

# 2. Download missing ones
$i = 0
foreach ($u in $urls) {
  $i++
  $file = Join-Path $imgDir ($u -split '/')[-1]
  if (Test-Path $file) { Write-Host "[$i/$($urls.Count)] cached: $(Split-Path $file -Leaf)"; continue }
  $ok = $false
  for ($a = 1; $a -le 4 -and -not $ok; $a++) {
    try {
      Invoke-WebRequest -Uri $u -UserAgent $ua -TimeoutSec 30 -OutFile $file
      $ok = $true
      Write-Host "[$i/$($urls.Count)] saved: $(Split-Path $file -Leaf)"
    } catch {
      $code = $null
      if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
      Write-Host "[$i/$($urls.Count)] error ${code}: $(Split-Path $file -Leaf) (attempt $a)"
      Start-Sleep -Seconds (if ($code -in 429, 503) { 30 } else { 5 })
    }
  }
  Start-Sleep -Seconds 2
}

# 3. Rebuild gh-600-all.md with local image references
$strip = {
  param($s)
  ($s -replace '<img[^>]*src="https://img\.examtopics\.com/gh-600/([^"/]+)"[^>]*>', '![](gh-600-images/$1)' `
       -replace '<img[^>]*src="([^"]+)"[^>]*>', '' `
       -replace '<script.*?</script>', '' `
       -replace '<[^>]+>', ' ' `
       -replace '&nbsp;', ' ' -replace '&', '&' -replace '>', '>' -replace '<', '<' -replace '&#160;', ' ') `
    -replace '\s+', ' '
}

$mdParts = @('# GH-600 - All ExamTopics discussions', '')
foreach ($h in Get-ChildItem (Join-Path $root 'gh-600-pages') -Filter *.html | Sort-Object Name) {
  $html = Get-Content $h.FullName -Raw
  $name = $h.BaseName
  $title = ''
  if ($html -match '<title>([^<]+)</title>') { $title = $Matches[1] }
  $q = ''
  if ($html -match '(?s)Actual exam question(.*?)Show Suggested Answer') { $q = $Matches[1] }
  $c = ''
  if ($html -match '(?s)Comments(.*?)(Commenting|Platform)') { $c = $Matches[1] }
  $mdParts += "## $name"
  $mdParts += ''
  $mdParts += "Source: https://www.examtopics.com/discussions/microsoft/view/$name/"
  $mdParts += ''
  $mdParts += "**$title**"
  $mdParts += ''
  if ($q) { $mdParts += (& $strip $q).Trim(); $mdParts += '' }
  if ($c) { $mdParts += 'Comments:'; $mdParts += (& $strip $c).Trim(); $mdParts += '' }
  $mdParts += '---'
  $mdParts += ''
}
[IO.File]::WriteAllLines((Join-Path $root 'gh-600-all.md'), $mdParts)
Write-Host "DONE. Images in gh-600-images\, rebuilt gh-600-all.md"
