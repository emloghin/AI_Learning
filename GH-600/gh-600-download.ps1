# Downloads all GH-600 discussion pages listed in gh-600-links.txt
# Saves raw HTML to gh-600-pages\ and a combined study file gh-600-all.md
$ErrorActionPreference = 'Stop'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

$outDir = Join-Path $PSScriptRoot 'gh-600-pages'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$urls = Get-Content (Join-Path $PSScriptRoot 'gh-600-links.txt') | Where-Object { $_ -like 'https*' }
$mdParts = @('# GH-600 - All ExamTopics discussions', '')

$i = 0
foreach ($url in $urls) {
  $i++
  $name = ($url -split '/view/')[-1].TrimEnd('/')
  $file = Join-Path $outDir "$name.html"
  $mdParts += "## $name"
  $mdParts += ''
  $mdParts += "Source: $url"
  $mdParts += ''

  if (Test-Path $file) {
    Write-Host "[$i/$($urls.Count)] cached: $name"
  } else {
    $ok = $false
    for ($attempt = 1; $attempt -le 4 -and -not $ok; $attempt++) {
      try {
        $resp = Invoke-WebRequest -Uri $url -UserAgent $ua -TimeoutSec 30
        [IO.File]::WriteAllText($file, $resp.Content)
        $ok = $true
        Write-Host "[$i/$($urls.Count)] saved: $name"
      } catch {
        $code = $null
        if ($_.Exception.Response) { $code = [int]$_.Exception.Response.StatusCode }
        if ($code -eq 429 -or $code -eq 503) {
          Write-Host "[$i/$($urls.Count)] $code, waiting 30s (attempt $attempt)"
          Start-Sleep -Seconds 30
        } else {
          Write-Host "[$i/$($urls.Count)] error ${code}: $name (attempt $attempt)"
          Start-Sleep -Seconds 5
        }
      }
    }
    if (-not $ok) { Write-Host "[$i/$($urls.Count)] FAILED: $url" }
    Start-Sleep -Seconds 4
  }

  # Build combined markdown: question text + comments, tags stripped
  if (Test-Path $file) {
    $html = [IO.File]::ReadAllText($file)
    $title = ''
    if ($html -match '<title>([^<]+)</title>') { $title = $Matches[1] }
    $q = ''
    if ($html -match '(?s)Actual exam question(.*?)Show Suggested Answer') { $q = $Matches[1] }
    $c = ''
    if ($html -match '(?s)Comments(.*?)(Commenting|Platform)') { $c = $Matches[1] }
    $strip = { param($s) ($s -replace '<script.*?</script>', '' -replace '<[^>]+>', ' ' -replace '&nbsp;', ' ' -replace '&', '&' -replace '>', '>' -replace '<', '<' -replace '&#160;', ' ') -replace '\s+', ' ' }
    $mdParts += "**$title**"
    $mdParts += ''
    if ($q) { $mdParts += (& $strip $q).Trim(); $mdParts += '' }
    if ($c) { $mdParts += 'Comments:'; $mdParts += (& $strip $c).Trim(); $mdParts += '' }
    $mdParts += '---'
    $mdParts += ''
  }
}

[IO.File]::WriteAllLines((Join-Path $PSScriptRoot 'gh-600-all.md'), $mdParts)
Write-Host "DONE. HTML in gh-600-pages\, combined file gh-600-all.md"
